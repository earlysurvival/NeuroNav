import React, { useState, useEffect, useRef } from 'react';
import { Users, Play, Pause, Square, MessageSquareQuote, Volume2, VolumeX } from 'lucide-react';
import { getBodyDoubleCheckin } from '../services/geminiService';
import WhyWire from './WhyWire';

const BodyDouble: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [checkInMessage, setCheckInMessage] = useState<string>("Ready to start? I'm right here with you.");
  const [whyWire, setWhyWire] = useState<string>("");
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const intervalRef = useRef<number | null>(null);

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);

  // Check-in logic: Every 10 minutes (600 seconds)
  useEffect(() => {
    if (seconds > 0 && seconds % 600 === 0) {
       triggerCheckIn(Math.floor(seconds / 60));
    }
  }, [seconds]);

  const playGentleChime = () => {
    if (!soundEnabled) return;
    
    // Initialize Audio Context on first interaction if needed, or reuse
    if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;

    // Create a gentle sine wave tone
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Soft "ping" sound
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    oscillator.frequency.exponentialRampToValueAtTime(261.63, ctx.currentTime + 1.5); // Drop to C4

    // Fade out volume
    gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 1.5);
  };

  const triggerCheckIn = async (mins: number) => {
    playGentleChime();
    const data = await getBodyDoubleCheckin(mins);
    if (data.content) setCheckInMessage(data.content);
    if (data.whyWire) setWhyWire(data.whyWire);
  };

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
      // Ensure AudioContext is resumed/started on user gesture
      if (soundEnabled && !audioCtxRef.current) {
         audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      setIsActive(!isActive);
  };

  const stopTimer = () => {
    setIsActive(false);
    setSeconds(0);
    setCheckInMessage("Session ended. Great job showing up!");
    setWhyWire("Task initiation is the hardest part. Stopping is also a valid transition.");
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-8">
       <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Virtual Body Double</h2>
        <p className="text-gray-600 dark:text-gray-400">I'll hang out while you work. No judgment, just presence.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 flex flex-col items-center space-y-8 relative overflow-hidden border border-gray-100 dark:border-slate-700 transition-colors">
         {/* Sound Toggle */}
         <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            title={soundEnabled ? "Mute Check-in Chime" : "Enable Check-in Chime"}
         >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
         </button>

         <div className={`absolute top-0 left-0 w-full h-2 ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-200 dark:bg-slate-700'}`}></div>
         
         <div className="relative">
            <div className={`w-64 h-64 rounded-full flex items-center justify-center border-8 ${isActive ? 'border-green-400 dark:border-green-600' : 'border-gray-200 dark:border-slate-700'} transition-all duration-500`}>
                <span className="text-6xl font-mono font-bold text-gray-700 dark:text-white tracking-wider">
                    {formatTime(seconds)}
                </span>
            </div>
            {isActive && (
                <div className="absolute inset-0 rounded-full border-t-8 border-green-600 dark:border-green-400 animate-spin opacity-50 pointer-events-none"></div>
            )}
         </div>

         <div className="flex items-center gap-6">
            {!isActive ? (
                <button 
                    onClick={toggleTimer}
                    className="flex flex-col items-center gap-2 group"
                >
                    <div className="w-16 h-16 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition">
                        <Play className="w-8 h-8 ml-1" />
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Start Focus</span>
                </button>
            ) : (
                <button 
                    onClick={toggleTimer}
                    className="flex flex-col items-center gap-2 group"
                >
                    <div className="w-16 h-16 bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-500 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition">
                        <Pause className="w-8 h-8" />
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Pause</span>
                </button>
            )}
            
            {seconds > 0 && (
                <button 
                    onClick={stopTimer}
                    className="flex flex-col items-center gap-2 group"
                >
                    <div className="w-12 h-12 bg-gray-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 shadow-sm group-hover:bg-gray-300 dark:group-hover:bg-slate-600 transition">
                        <Square className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium text-gray-400 dark:text-gray-500">Stop</span>
                </button>
            )}
         </div>
      </div>

      <div className="bg-blue-50 dark:bg-slate-800 p-6 rounded-2xl flex items-start gap-4 shadow-sm min-h-[120px] transition-all border border-blue-100 dark:border-slate-700">
         <div className="bg-blue-200 dark:bg-slate-700 p-2 rounded-full mt-1 flex-shrink-0">
            <Users className="w-6 h-6 text-blue-700 dark:text-blue-400" />
         </div>
         <div className="space-y-2">
            <h4 className="font-bold text-blue-900 dark:text-blue-200 text-sm uppercase">NeuroNav Check-in</h4>
            <p className="text-blue-800 dark:text-blue-100 text-lg font-medium leading-snug">
                "{checkInMessage}"
            </p>
         </div>
      </div>

      <WhyWire text={whyWire} />
    </div>
  );
};

export default BodyDouble;