import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Wind, CloudRain, Waves, Sliders, Flower } from 'lucide-react';
import WhyWire from './WhyWire';

type SoundType = 'drone' | 'rain' | 'river' | 'calm';

const Mindfulness: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [timeLeft, setTimeLeft] = useState(60); 
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [volume, setVolume] = useState(0.4);
  const [currentSound, setCurrentSound] = useState<SoundType>('drone');
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<any[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const cycleTimeRef = useRef<number>(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isActive) {
      interval = setInterval(() => {
        if (timeLeft > 0) setTimeLeft(t => t - 1);
        else {
            setIsActive(false);
            return;
        }
        cycleTimeRef.current = (cycleTimeRef.current + 1) % 12;
        if (cycleTimeRef.current < 4) setPhase('Inhale');
        else if (cycleTimeRef.current < 8) setPhase('Hold');
        else setPhase('Exhale');
      }, 1000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isActive, timeLeft]);

  const startSound = () => {
    if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.001; 
    masterGain.connect(ctx.destination);
    gainNodeRef.current = masterGain;

    const cleanupNodes: any[] = [];

    if (currentSound === 'drone') {
        const freq = 174; 
        const osc1 = ctx.createOscillator(); osc1.frequency.value = freq;
        const osc2 = ctx.createOscillator(); osc2.frequency.value = freq - 2; 
        const g1 = ctx.createGain(); g1.gain.value = 0.3;
        osc1.connect(g1).connect(masterGain);
        osc2.connect(g1).connect(masterGain);
        osc1.start(); osc2.start();
        cleanupNodes.push(osc1, osc2);
    } else if (currentSound === 'rain') {
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass'; filter.frequency.value = 1000;
        noise.connect(filter).connect(masterGain);
        noise.start();
        cleanupNodes.push(noise);
    }

    nodesRef.current = cleanupNodes;
  };

  const stopSound = () => {
     nodesRef.current.forEach(node => { try { node.stop(); node.disconnect(); } catch(e) {} });
     nodesRef.current = [];
     if (gainNodeRef.current) {
        gainNodeRef.current.disconnect();
        gainNodeRef.current = null;
     }
  };

  useEffect(() => {
      if (!isActive || !gainNodeRef.current || !audioCtxRef.current) return;
      const ctx = audioCtxRef.current;
      const gain = gainNodeRef.current.gain;
      const now = ctx.currentTime;
      gain.cancelScheduledValues(now);
      const target = phase === 'Inhale' ? volume : phase === 'Hold' ? volume : volume * 0.2;
      gain.setTargetAtTime(target, now, 1.5); 
  }, [phase, isActive, volume]);

  useEffect(() => {
      if (isActive && soundEnabled) startSound();
      else stopSound();
      return () => stopSound();
  }, [isActive, soundEnabled, currentSound]);

  return (
    <div className="max-w-xl mx-auto p-8 space-y-12 flex flex-col items-center animate-fade-in">
      <div className="text-center space-y-3">
        <div className="inline-flex p-3 bg-teal-50 dark:bg-teal-900/30 rounded-2xl mb-2">
            <Flower className="w-8 h-8 text-teal-600 dark:text-teal-400" />
        </div>
        <h2 className="text-4xl font-black tracking-tighter">Vagus Nerve Reset</h2>
        <p className="text-gray-500 font-medium">Box breathing to lower cortisol and stop the 'freeze' response.</p>
      </div>

      <div className="relative w-80 h-80 flex items-center justify-center">
         <div className={`absolute inset-0 bg-teal-400/20 rounded-full blur-[60px] transition-all duration-[4000ms]
            ${phase === 'Inhale' ? 'scale-150 opacity-60' : phase === 'Hold' ? 'scale-150 opacity-40' : 'scale-100 opacity-20'}
         `}></div>
         <div className={`relative w-64 h-64 border-4 border-white/20 backdrop-blur-3xl rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-[4000ms] ease-in-out z-10
             ${phase === 'Inhale' ? 'scale-110 border-teal-500/50' : phase === 'Hold' ? 'scale-110 border-teal-400/30' : 'scale-90 border-transparent'}
         `}>
             <span className="text-xs font-black uppercase tracking-[0.3em] mb-2 opacity-40">{isActive ? phase : 'Ready'}</span>
             <span className="text-6xl font-black font-mono tracking-tighter">{timeLeft}s</span>
         </div>
      </div>

      <div className="flex gap-8 items-center bg-white/40 dark:bg-white/5 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/20">
        <button onClick={() => setTimeLeft(60)} className="p-4 text-gray-400 hover:text-teal-600 transition-colors">
            <RotateCcw className="w-6 h-6" />
        </button>
        <button onClick={() => setIsActive(!isActive)} className="p-8 bg-teal-600 text-white rounded-full shadow-2xl shadow-teal-600/40 hover:scale-105 transition-transform">
            {isActive ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-1" />}
        </button>
        <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-4 rounded-full transition ${soundEnabled ? 'text-teal-600' : 'text-gray-400'}`}>
            {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
        </button>
      </div>

      <WhyWire text="Breathing with a longer exhale than inhale directly stimulates the Vagus nerve, telling your brain the danger has passed." />
    </div>
  );
};

export default Mindfulness;