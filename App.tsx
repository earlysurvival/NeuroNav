import React, { useState, useEffect } from 'react';
import { AppMode, ThemeType } from './types';
import { Brain, LayoutGrid, Target, Zap, ShieldCheck, Activity, Coffee, Terminal, ArrowLeft } from 'lucide-react';
import SmartPlanner from './components/SmartPlanner';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.DASHBOARD);
  const [userName, setUserName] = useState<string>('');
  
  useEffect(() => {
    const saved = localStorage.getItem('aura_username');
    if (saved) setUserName(saved);
  }, []);

  const renderContent = () => {
    switch (mode) {
      case AppMode.PLANNER: return <SmartPlanner />;
      case AppMode.DASHBOARD: return <Dashboard onSelect={setMode} userName={userName} />;
      default: return <ComingSoon onBack={() => setMode(AppMode.DASHBOARD)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-50 glass border-b border-white/5 py-6 px-8 flex justify-between items-center">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setMode(AppMode.DASHBOARD)}>
          <div className="p-2.5 bg-indigo-600 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.4)] animate-pulse-slow">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black italic uppercase tracking-tighter italic">Aura</h1>
            <p className="text-[8px] uppercase tracking-[0.4em] text-white/30 font-mono">Cognitive_Arch_v2</p>
          </div>
        </div>

        <nav className="flex items-center gap-8">
            <button className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all">Neuro_Health</button>
            <button className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all">Deep_Focus</button>
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
        </nav>
      </header>

      <main className="flex-grow">
        {renderContent()}
      </main>

      <footer className="py-8 px-12 border-t border-white/5 text-center flex justify-between items-center bg-black/50">
          <p className="text-[10px] uppercase tracking-widest text-white/20">© 2025 Aura Neuro-Architect. No rights reserved.</p>
          <div className="flex gap-4">
              <Activity className="w-4 h-4 text-white/20" />
              <ShieldCheck className="w-4 h-4 text-white/20" />
          </div>
      </footer>
    </div>
  );
};

const Dashboard: React.FC<{ onSelect: (m: AppMode) => void, userName: string }> = ({ onSelect, userName }) => (
  <div className="max-w-7xl mx-auto py-24 px-12 animate-fade-in">
    <div className="mb-20 space-y-4">
        <h2 className="text-7xl font-black italic tracking-tighter uppercase italic leading-[0.85]">
            Architecting <br/>Your Focus.
        </h2>
        <p className="text-2xl text-white/30 font-light max-w-2xl">Good afternoon, Pilot. Your cognitive reserves are estimated at 84%. Ready for strategic execution?</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        { id: AppMode.PLANNER, title: 'Strategic Anchors', desc: 'Identify the 20% that drives 80%.', icon: Target, color: 'indigo' },
        { id: AppMode.VISION, title: 'Vision Intent', desc: 'Transform visual chaos into order.', icon: Activity, color: 'emerald' },
        { id: AppMode.COACH, title: 'Neuro-Coach', desc: 'Real-time cognitive alignment.', icon: Zap, color: 'amber' },
        { id: AppMode.IMPULSE, title: 'Temporal Shield', desc: 'Protect your future self from now.', icon: ShieldCheck, color: 'rose' },
        { id: AppMode.MINDFULNESS, title: 'Vagus Reset', desc: 'De-escalate the amygdala.', icon: Coffee, color: 'teal' },
        { id: AppMode.DEVELOPER, title: 'Core Console', desc: 'Architect internal systems.', icon: Terminal, color: 'zinc' },
      ].map((card) => (
        <button 
          key={card.id} 
          onClick={() => onSelect(card.id)}
          className="group glass p-10 rounded-[3rem] text-left hover:bg-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform"><card.icon className="w-32 h-32" /></div>
          <div className={`w-14 h-14 rounded-2xl bg-${card.color}-500/10 flex items-center justify-center mb-8 border border-${card.color}-500/20`}>
            <card.icon className={`w-6 h-6 text-${card.color}-400`} />
          </div>
          <h3 className="text-3xl font-black tracking-tight mb-2 uppercase italic">{card.title}</h3>
          <p className="text-white/40 font-medium leading-relaxed">{card.desc}</p>
        </button>
      ))}
    </div>
  </div>
);

const ComingSoon: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
        <div className="p-10 glass rounded-[3rem] text-center space-y-6 max-w-md">
            <Activity className="w-16 h-16 text-indigo-500 mx-auto animate-pulse" />
            <h3 className="text-3xl font-black italic italic uppercase tracking-tighter">Under Construction</h3>
            <p className="text-white/40">The Neuro-Architect is currently drafting this sub-system. Check the DevLog for status.</p>
            <button onClick={onBack} className="flex items-center gap-2 mx-auto text-[10px] font-black uppercase tracking-widest text-indigo-400">
                <ArrowLeft className="w-4 h-4" /> Return to Bridge
            </button>
        </div>
    </div>
);

export default App;