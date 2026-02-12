import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Star, Gift, PartyPopper, Zap, Target, Flame } from 'lucide-react';
import WhyWire from './WhyWire';

const RewardCenter: React.FC = () => {
  const [points, setPoints] = useState(1250);
  const [streak, setStreak] = useState(5);
  const [showConfetti, setShowConfetti] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const claimBonus = () => {
    setShowConfetti(true);
    setPoints(p => p + 150);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10 animate-fade-in relative">
      <div className="text-center space-y-3">
        <h2 className="text-5xl font-black tracking-tighter italic uppercase italic">The Depot</h2>
        <p className="text-gray-500 text-lg font-medium">Turn consistency into currency.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-black text-white rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-10 opacity-10"><Zap className="w-64 h-64 text-indigo-500" /></div>
            <div className="relative z-10">
                <p className="text-[10px] uppercase font-black tracking-[0.3em] opacity-40 mb-2">Neuro-Balance</p>
                <h3 className="text-7xl font-black tracking-tighter text-indigo-400">{points.toLocaleString()}</h3>
                <p className="text-sm font-bold text-gray-400 mt-2 italic font-serif">"Wealth is the ability to fully experience life."</p>
            </div>
            <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center text-[10px] font-black">{i}</div>)}
                </div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Level 4 Cortex Pilot</p>
            </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-rose-600 rounded-[2.5rem] p-10 text-white flex flex-col justify-between shadow-xl">
            <div className="flex justify-between items-start">
                <Flame className="w-12 h-12" />
                <span className="text-[10px] font-black bg-white/20 px-3 py-1 rounded-full uppercase">On Fire</span>
            </div>
            <div>
                <h4 className="text-6xl font-black tracking-tighter">{streak}</h4>
                <p className="text-sm font-bold uppercase tracking-widest opacity-80">Day Focus Streak</p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
            { label: 'Daily Bonus', icon: PartyPopper, action: claimBonus, color: 'indigo', val: '+150' },
            { label: 'Focus Goal', icon: Target, action: null, color: 'teal', val: '2/5' },
            { label: 'Store', icon: Gift, action: null, color: 'rose', val: 'Shop' },
            { label: 'Top 10%', icon: Trophy, action: null, color: 'yellow', val: 'Rank' }
        ].map((btn, i) => (
            <button 
                key={i} 
                onClick={btn.action || undefined}
                className={`p-6 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-3xl flex flex-col items-center gap-3 transition-all hover:-translate-y-2 hover:shadow-xl group
                    ${!btn.action ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
            >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-${btn.color}-50 dark:bg-${btn.color}-900/30 text-${btn.color}-600 group-hover:scale-110 transition-transform`}>
                    <btn.icon className="w-6 h-6" />
                </div>
                <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{btn.label}</p>
                    <p className="font-black text-xl tracking-tight">{btn.val}</p>
                </div>
            </button>
        ))}
      </div>

      <WhyWire text="ADHD brains are reward-deficient. By creating 'artificial' immediate rewards for long-term habits, we bypass the Temporal Discounting obstacle." />
    </div>
  );
};

export default RewardCenter;