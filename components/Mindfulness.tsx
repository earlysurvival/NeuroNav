import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Wind, CloudRain, Waves, Sliders } from 'lucide-react';
import WhyWire from './WhyWire';

type SoundType = 'drone' | 'rain' | 'river' | 'calm';

const Mindfulness: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [timeLeft, setTimeLeft] = useState(60); 
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [currentSound, setCurrentSound] = useState<SoundType>('drone');
  
  // Audio Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<any[]>([]); // Store playing nodes
  const gainNodeRef = useRef<GainNode | null>(null);
  const cycleTimeRef = useRef<number>(0);

  // Breathing Cycle & Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      if (cycleTimeRef.current === 0) setPhase('Inhale');
      interval = setInterval(() => {
        if (timeLeft > 0) setTimeLeft(t => t - 1);
        else {
            setIsActive(false);
            cycleTimeRef.current = 0;
            return;
        }
        cycleTimeRef.current = (cycleTimeRef.current + 1) % 12;
        if (cycleTimeRef.current < 4) setPhase('Inhale');
        else if (cycleTimeRef.current < 8) setPhase('Hold');
        else setPhase('Exhale');
      }, 1000);
    } else {
        cycleTimeRef.current = 0;
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Audio Engine Helpers
  const createNoiseBuffer = (ctx: AudioContext) => {
    const bufferSize = ctx.sampleRate * 2; // 2 seconds buffer
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return buffer;
  };

  const createPinkNoise = (ctx: AudioContext) => {
     const bufferSize = ctx.sampleRate * 2;
     const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
     const output = buffer.getChannelData(0);
     let b0, b1, b2, b3, b4, b5, b6;
     b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
     for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.11; // (roughly) compensate for gain
        b6 = white * 0.115926;
     }
     return buffer;
  };

  const startSound = () => {
    if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    // Master Gain
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.01; // Ramp up later
    masterGain.connect(ctx.destination);
    gainNodeRef.current = masterGain;

    const cleanupNodes: any[] = [];

    if (currentSound === 'drone') {
        const freq = 174; 
        const osc1 = ctx.createOscillator(); osc1.frequency.value = freq;
        const osc2 = ctx.createOscillator(); osc2.frequency.value = freq - 2; 
        const osc3 = ctx.createOscillator(); osc3.type = 'triangle'; osc3.frequency.value = freq / 2;

        const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 200;
        const g1 = ctx.createGain(); g1.gain.value = 0.5;
        const g2 = ctx.createGain(); g2.gain.value = 0.5;
        const g3 = ctx.createGain(); g3.gain.value = 0.15;

        osc1.connect(g1).connect(masterGain);
        osc2.connect(g2).connect(masterGain);
        osc3.connect(filter).connect(g3).connect(masterGain);
        
        osc1.start(); osc2.start(); osc3.start();
        cleanupNodes.push(osc1, osc2, osc3);
    } 
    else if (currentSound === 'rain') {
        const buffer = createPinkNoise(ctx);
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;
        const filter = ctx.createBiquadFilter(); // High pass to remove muddy rumble
        filter.type = 'highpass';
        filter.frequency.value = 200;
        
        noise.connect(filter).connect(masterGain);
        noise.start();
        cleanupNodes.push(noise);
    }
    else if (currentSound === 'river') {
        const buffer = createNoiseBuffer(ctx); // White noise
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;
        
        // Brown noise approximation using LowPass
        const filter1 = ctx.createBiquadFilter();
        filter1.type = 'lowpass';
        filter1.frequency.value = 400;
        
        const filter2 = ctx.createBiquadFilter();
        filter2.type = 'lowpass';
        filter2.frequency.value = 300; // Double filter for steeper slope

        noise.connect(filter1).connect(filter2).connect(masterGain);
        noise.start();
        cleanupNodes.push(noise);
    }
    else if (currentSound === 'calm') {
        // Ambient Pads
        const osc1 = ctx.createOscillator(); osc1.type = 'sine'; osc1.frequency.value = 220; // A3
        const osc2 = ctx.createOscillator(); osc2.type = 'sine'; osc2.frequency.value = 329.63; // E4
        const lfo = ctx.createOscillator(); lfo.frequency.value = 0.1; // Slow modulation
        const lfoGain = ctx.createGain(); lfoGain.gain.value = 50;

        lfo.connect(lfoGain).connect(osc1.detune);
        osc1.connect(masterGain);
        osc2.connect(masterGain);
        osc1.start(); osc2.start(); lfo.start();
        cleanupNodes.push(osc1, osc2, lfo);
    }

    nodesRef.current = cleanupNodes;
  };

  const stopSound = () => {
     nodesRef.current.forEach(node => {
         try { node.stop(); node.disconnect(); } catch(e) {}
     });
     nodesRef.current = [];
     if (gainNodeRef.current) {
        try {
            gainNodeRef.current.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current!.currentTime + 0.5);
            setTimeout(() => { gainNodeRef.current?.disconnect(); gainNodeRef.current = null; }, 500);
        } catch (e) { gainNodeRef.current = null; }
     }
  };

  // Breath Volume Envelope & Master Volume Control
  useEffect(() => {
      if (!soundEnabled || !isActive || !gainNodeRef.current || !audioCtxRef.current) return;
      const ctx = audioCtxRef.current;
      const gain = gainNodeRef.current.gain;
      const now = ctx.currentTime;
      gain.cancelScheduledValues(now);
      
      const maxVol = volume; // Use slider volume
      const minVol = volume * 0.1;

      if (phase === 'Inhale') gain.setTargetAtTime(maxVol, now, 1.5); 
      else if (phase === 'Hold') gain.setTargetAtTime(maxVol, now, 0.5);
      else if (phase === 'Exhale') gain.setTargetAtTime(minVol, now, 1.5); 
  }, [phase, soundEnabled, isActive, volume]); // Re-run if volume changes

  // Sound Switcher Logic
  useEffect(() => {
     if (isActive && soundEnabled) {
         stopSound(); // Restart sound engine on type change
         startSound();
     }
  }, [currentSound]);

  // Main Play/Stop
  useEffect(() => {
      if (isActive && soundEnabled) {
          if (nodesRef.current.length === 0) startSound();
      } else {
          stopSound();
      }
      return () => stopSound();
  }, [isActive, soundEnabled]);

  const reset = () => { setIsActive(false); setTimeLeft(60); setPhase('Inhale'); cycleTimeRef.current = 0; stopSound(); };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-8 flex flex-col items-center">
       <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-2">
           Mindfulness Pod <Wind className="w-6 h-6 text-teal-500" />
        </h2>
        <p className="text-gray-600 dark:text-gray-400">Box breathing to reset your nervous system.</p>
      </div>

      {/* Visual Animation */}
      <div className="relative w-64 h-64 flex items-center justify-center">
         <div className={`absolute inset-0 bg-teal-200 dark:bg-teal-900/40 rounded-full blur-xl transition-all duration-[4000ms] ease-in-out
            ${phase === 'Inhale' ? 'scale-110 opacity-80' : phase === 'Hold' ? 'scale-110 opacity-60' : 'scale-75 opacity-40'}
         `}></div>
         <div className={`relative w-48 h-48 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl shadow-teal-500/30 transition-all duration-[4000ms] ease-in-out z-10
             ${phase === 'Inhale' ? 'scale-110' : phase === 'Hold' ? 'scale-110' : 'scale-90'}
         `}>
             <div className="text-center text-white">
                 <p className="text-xl font-bold uppercase tracking-widest mb-1 opacity-90">{isActive ? phase : 'Ready'}</p>
                 <p className="text-4xl font-mono">{timeLeft}s</p>
             </div>
         </div>
      </div>

      {/* Controls */}
      <div className="flex gap-6 items-center">
        <button onClick={reset} className="p-4 bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-slate-600 transition">
            <RotateCcw className="w-6 h-6" />
        </button>
        <button onClick={() => setIsActive(!isActive)} className="p-6 bg-teal-600 hover:bg-teal-700 text-white rounded-full shadow-lg hover:scale-105 transition-transform">
            {isActive ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-1" />}
        </button>
        <button onClick={() => setSoundEnabled(!soundEnabled)} className={`p-4 rounded-full transition ${soundEnabled ? 'bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300' : 'bg-gray-100 dark:bg-slate-800 text-gray-400'}`}>
            {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
        </button>
      </div>

      {/* Sound Options */}
      <div className="w-full bg-gray-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-gray-200 dark:border-slate-700 space-y-4">
          <div className="flex items-center gap-2 mb-2">
             <Sliders className="w-4 h-4 text-gray-500" />
             <span className="text-sm font-bold uppercase text-gray-500 dark:text-gray-400">Focus Soundscape</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
              {[
                  { id: 'drone', label: 'Drone', icon: Wind },
                  { id: 'rain', label: 'Rain', icon: CloudRain },
                  { id: 'river', label: 'River', icon: Waves },
                  { id: 'calm', label: 'Calm', icon: Volume2 },
              ].map((s) => (
                  <button 
                    key={s.id}
                    onClick={() => setCurrentSound(s.id as SoundType)}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg text-xs font-medium transition-all
                        ${currentSound === s.id 
                            ? 'bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 ring-2 ring-teal-500' 
                            : 'bg-white dark:bg-slate-900 text-gray-600 dark:text-gray-400 hover:bg-gray-100'}
                    `}
                  >
                      <s.icon className="w-5 h-5 mb-1" />
                      {s.label}
                  </button>
              ))}
          </div>

          {/* Volume Slider */}
          {soundEnabled && (
             <div className="flex items-center gap-3 pt-2">
                <VolumeX className="w-4 h-4 text-gray-400" />
                <input 
                    type="range" 
                    min="0" max="1" step="0.01" 
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-teal-500"
                />
                <Volume2 className="w-4 h-4 text-gray-400" />
             </div>
          )}
      </div>

      <WhyWire text="Binaural beats and Brown Noise (like river sounds) can help mask distracting thoughts and regulate dopamine levels in the ADHD brain." />
    </div>
  );
};

export default Mindfulness;