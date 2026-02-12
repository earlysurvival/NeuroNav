import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Star, Gift, PartyPopper } from 'lucide-react';
import WhyWire from './WhyWire';

const RewardCenter: React.FC = () => {
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Load fake persisted data for demo
    const savedPoints = localStorage.getItem('neuro-points') || '1250';
    const savedStreak = localStorage.getItem('neuro-streak') || '3';
    setPoints(parseInt(savedPoints));
    setStreak(parseInt(savedStreak));
  }, []);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setPoints(p => {
        const newP = p + 100;
        localStorage.setItem('neuro-points', newP.toString());
        return newP;
    });
    
    // Simple canvas confetti implementation
    if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;
        
        let particles: any[] = [];
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: canvasRef.current.width / 2,
                y: canvasRef.current.height / 2,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10 - 5,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                size: Math.random() * 5 + 2
            });
        }

        const animate = () => {
            if (!ctx || !canvasRef.current) return;
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            particles.forEach((p, index) => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.2; // Gravity
                
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                if (p.y > canvasRef.current!.height) particles.splice(index, 1);
            });

            if (particles.length > 0) requestAnimationFrame(animate);
            else setShowConfetti(false);
        };
        animate();
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-8 relative">
       {/* Confetti Canvas Layer */}
       <canvas 
          ref={canvasRef} 
          width={400} 
          height={400} 
          className={`absolute top-0 left-0 w-full h-full pointer-events-none z-50 ${showConfetti ? 'block' : 'hidden'}`}
       />

       <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-2">
           Dopamine Depot <Trophy className="w-6 h-6 text-yellow-500" />
        </h2>
        <p className="text-gray-600 dark:text-gray-400">Celebrate your wins, no matter how small.</p>
      </div>

      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-8 text-white shadow-xl transform hover:scale-105 transition-transform duration-300">
         <div className="flex justify-between items-end">
            <div>
                <p className="font-bold opacity-80 uppercase tracking-wider text-sm">Total NeuroPoints</p>
                <h3 className="text-5xl font-extrabold mt-2">{points.toLocaleString()}</h3>
            </div>
            <div className="text-right">
                <div className="flex items-center gap-1 justify-end">
                    <Star className="w-5 h-5 fill-white text-white" />
                    <span className="font-bold text-xl">{streak} Day Streak</span>
                </div>
                <p className="text-xs opacity-80 mt-1">Keep it up!</p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
         <button 
            onClick={triggerConfetti}
            className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border-2 border-dashed border-gray-200 dark:border-slate-700 hover:border-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all group flex flex-col items-center gap-3"
         >
             <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                 <PartyPopper className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
             </div>
             <span className="font-bold text-gray-700 dark:text-gray-200">Claim Daily Bonus</span>
         </button>

         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 flex flex-col items-center gap-3 opacity-50 cursor-not-allowed">
             <div className="w-12 h-12 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                 <Gift className="w-6 h-6 text-gray-400" />
             </div>
             <span className="font-bold text-gray-500">Unlock Themes (2500 pts)</span>
         </div>
      </div>

      <div className="space-y-4">
          <h4 className="font-bold text-gray-700 dark:text-gray-300">Recent Achievements</h4>
          <div className="space-y-3">
              <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700">
                  <span className="text-2xl">🧘</span>
                  <div>
                      <p className="font-bold text-gray-800 dark:text-white text-sm">Zen Master</p>
                      <p className="text-xs text-gray-500">Completed a Mindfulness session</p>
                  </div>
                  <span className="ml-auto font-bold text-yellow-600 dark:text-yellow-400 text-sm">+50</span>
              </div>
              <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700">
                  <span className="text-2xl">🛡️</span>
                  <div>
                      <p className="font-bold text-gray-800 dark:text-white text-sm">Impulse Control</p>
                      <p className="text-xs text-gray-500">Calculated an impulse purchase</p>
                  </div>
                  <span className="ml-auto font-bold text-yellow-600 dark:text-yellow-400 text-sm">+25</span>
              </div>
          </div>
      </div>

      <WhyWire text="Gamification hacks the ADHD brain's reward pathway, artificially boosting dopamine to make 'boring' consistency feel exciting." />

    </div>
  );
};

export default RewardCenter;