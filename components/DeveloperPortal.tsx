import React, { useState, useEffect } from 'react';
import { Terminal, Lock, TrendingUp, Map, List, Globe, Save, FileText, Check, AlertTriangle, CreditCard, Users, Zap, Briefcase, Code, BarChart3 } from 'lucide-react';
import { APP_NAME } from '../constants';

const DeveloperPortal: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'plan' | 'roadmap' | 'features' | 'competitors' | 'notes'>('plan');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('neuronav-dev-notes');
    if (saved) setNotes(saved);
  }, []);

  const handleSave = () => {
    localStorage.setItem('neuronav-dev-notes', notes);
    alert('SECURE_SYNC_COMPLETE');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="bg-zinc-950 text-indigo-500 p-12 rounded-[2.5rem] font-mono border border-indigo-900/30 shadow-[0_0_80px_rgba(79,70,229,0.1)] w-full max-w-lg transition-all duration-700">
          <div className="flex flex-col items-center text-center gap-4 mb-10">
            <div className="bg-indigo-600/10 p-4 rounded-full animate-float"><Lock className="w-10 h-10" /></div>
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">Access Restricted</h2>
            <p className="text-[10px] text-indigo-300 opacity-50 uppercase tracking-[0.4em]">Developer Authorization Required</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if(password==='admin') setIsAuthenticated(true); else alert('VOID'); }} className="space-y-6">
            <input
              type="password"
              value={password}
              placeholder="PASSCODE"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border-2 border-indigo-900/50 focus:border-indigo-500 outline-none p-5 text-white text-center rounded-2xl tracking-[0.5em]"
              autoFocus
            />
            <button type="submit" className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-500 active:scale-95 transition-all shadow-[0_20px_40px_-10px_rgba(79,70,229,0.4)]">
              Validate Signature
            </button>
          </form>
        </div>
      </div>
    );
  }

  const features = [
    "Neuro-Sync Wearable API", "Eye-Tracking Vigilance Monitor", "Real-time Cortisol Prediction", "Smart Med Dispensary Hook", "Family Cognitive Bridge",
    "School IEP Automation Pipeline", "HIPAA-Compliant Therapist Export", "RSD (Rejection) Shield AI", "Time-Blindness Visualizer (AR)", "Social Interaction Scripting",
    "Justice Sensitivity Filter", "Decision Fatigue Multi-choice AI", "Morning Momentum Launcher", "Bedtime Logic-Gate Lock", "Object Permanence 'Last Seen' Tracker",
    "Audit-Log for Med Side Effects", "Binaural Frequency Adaptive Play", "Body Doubling Matchmaking (Global)", "Focus-Mode Chrome/Safari Extension", "Smart Grocery 'No-Decision' Shop",
    "Email De-Overwhelm Summary", "Meeting Transcription (Task-Extraction)", "Career Path AI Alignment", "Hormonal Focus Mapping (Luteal/Follicular)", "Justice-Sensitivity Journaling",
    "Hyperfocus Interruption protocol", "Clutter Heatmap AR", "Meal Prep Cognitive Offloader", "Conflict Resolution Tone-Detector", "Micro-dose Pattern Tracker",
    "Executive Function Daily Score", "Predictive Burnout Analytics", "Vagus Nerve Stimulation Prompts", "Blood Sugar Focus Integration", "Job Market Accessibility Filter",
    "Resume 'Neuro-translation' Tool", "Teacher-Parent Real-time Sync", "Life Transition Planning Suite", "Debt-Management Friction-UI", "Object Locator AR Integration",
    "Crowdsourced Focus Room Sync", "Conflict Mediation Voice AI", "Child-Mode / Parental-Control Focus", "Travel Panic-Mode Protocol", "Skill Acquisition Hyper-Accelerator",
    "Executive Assistant Voice-Clone", "Medication Tapering Log", "Sensory Overload Early Warning", "Interoception Breath Guidance", "Dopamine Menu Generator"
  ];

  return (
    <div className="w-full max-w-7xl mx-auto bg-white dark:bg-black rounded-[3rem] overflow-hidden shadow-2xl flex flex-col border border-gray-200 dark:border-white/5 animate-slide-up">
      <div className="bg-zinc-950 text-white p-8 flex justify-between items-center">
        <div className="flex items-center gap-5">
            <div className="bg-indigo-600 p-3 rounded-2xl"><Terminal className="w-6 h-6"/></div>
            <div>
                <h1 className="text-2xl font-black italic tracking-tighter uppercase italic">{APP_NAME} <span className="text-indigo-500">BI-Engine</span></h1>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-mono">Master Cluster Control | Prod_v2.1</p>
            </div>
        </div>
        <div className="flex items-center gap-8">
            <div className="text-right hidden md:block">
                <p className="text-[10px] uppercase text-gray-500 font-bold">Projected ARR (Year 2)</p>
                <p className="text-xl font-black text-indigo-400 font-mono">$12,400,000</p>
            </div>
            <button onClick={() => setIsAuthenticated(false)} className="p-3 text-gray-500 hover:text-white transition-colors"><Lock className="w-5 h-5"/></button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[850px]">
          <nav className="w-full lg:w-80 bg-gray-50 dark:bg-zinc-900/30 border-r border-gray-200 dark:border-white/5 p-8 space-y-3">
             {[
                 { id: 'plan', label: 'Strategy', icon: Briefcase },
                 { id: 'roadmap', label: 'Growth', icon: Map },
                 { id: 'features', label: 'Backlog', icon: Code },
                 { id: 'competitors', label: 'Intelligence', icon: BarChart3 },
                 { id: 'notes', label: 'DevLog', icon: FileText },
             ].map((t) => (
                 <button key={t.id} onClick={() => setActiveTab(t.id as any)} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black transition-all ${activeTab === t.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30' : 'text-gray-400 hover:bg-white dark:hover:bg-white/5'}`}>
                    <t.icon className="w-5 h-5" /> {t.label}
                 </button>
             ))}
          </nav>

          <div className="flex-grow p-12 overflow-y-auto max-h-[850px]">
              {activeTab === 'plan' && (
                  <div className="space-y-12 animate-fade-in">
                      <h2 className="text-5xl font-black tracking-tighter italic italic">The Blue Ocean Strategy</h2>
                      <div className="grid md:grid-cols-3 gap-8">
                         {[
                             { label: 'CAC', val: '$42', sub: 'Target Acquisition' },
                             { label: 'LTV', val: '$580', sub: '3-Year Lifetime' },
                             { label: 'TAM', val: '$240B', sub: 'Neuro-Tech Sector' }
                         ].map((s,i) => <div key={i} className="p-8 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/5"><p className="text-[10px] uppercase text-gray-500 font-bold mb-2">{s.label}</p><p className="text-4xl font-black text-indigo-500">{s.val}</p><p className="text-xs text-gray-400 font-medium">{s.sub}</p></div>)}
                      </div>
                      <section className="space-y-4">
                          <h3 className="text-2xl font-black flex items-center gap-3 italic italic"><TrendingUp className="w-6 h-6 text-indigo-500"/> Market Dominance</h3>
                          <p className="text-lg text-gray-500 leading-relaxed font-medium">Most ADHD apps are "Planner Lite". We are a "Cognitive Prosthetic". By automating input through Gemini-3 Multimodal analysis, we remove the friction point that kills competitor retention. Our moat is <strong>Low-Activation-Energy UI</strong> coupled with <strong>Clinical-Grade Analytics</strong>.</p>
                      </section>
                  </div>
              )}

              {activeTab === 'features' && (
                  <div className="animate-fade-in space-y-8">
                      <h2 className="text-5xl font-black tracking-tighter italic italic">Master Backlog</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {features.map((f, i) => <div key={i} className="p-6 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-3 hover:border-indigo-500 transition-all cursor-default"><div className="w-2 h-2 rounded-full bg-indigo-500"></div>{f}</div>)}
                      </div>
                  </div>
              )}

              {activeTab === 'competitors' && (
                  <div className="animate-fade-in space-y-10">
                      <h2 className="text-5xl font-black tracking-tighter italic italic">Competitor Intelligence</h2>
                      <div className="overflow-hidden rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-xl">
                          <table className="w-full text-left">
                              <thead className="bg-gray-100 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                  <tr><th className="p-6">Competitor</th><th className="p-6">Est. Revenue (ARR)</th><th className="p-6">The Flaw</th></tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                                  {[{ n: 'Motion', r: '$50M+', f: 'Price Friction ($30/mo)' }, { n: 'Tiimo', r: '$5M', f: 'High Manual Input' }, { n: 'Inflow', r: '$12M', f: 'CBT Only, No Tools' }].map((c, i) => <tr key={i} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"><td className="p-6 font-black text-lg">{c.n}</td><td className="p-6 font-mono text-green-500 font-bold">{c.r}</td><td className="p-6 text-red-500 font-black text-[10px] uppercase tracking-widest">{c.f}</td></tr>)}
                              </tbody>
                          </table>
                      </div>
                  </div>
              )}

              {activeTab === 'notes' && (
                  <div className="h-full flex flex-col animate-fade-in space-y-6">
                      <div className="flex justify-between items-center">
                          <h2 className="text-5xl font-black tracking-tighter italic italic">DevLog</h2>
                          <button onClick={handleSave} className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-indigo-600/30"><Save className="w-5 h-5"/> PERSIST_STATE</button>
                      </div>
                      <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="# SYSTEM_LOG\n\n- [ ] Gemini-3-pro integration for Clinical Dashboard\n- [ ] Vagus Nerve vibration API for Apple Watch\n- [ ] Refactor state for local-first persistence..."
                          className="w-full flex-grow bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-indigo-100 font-mono p-10 rounded-[2.5rem] border-2 border-transparent focus:border-indigo-500/30 outline-none resize-none shadow-inner leading-loose text-lg"
                      />
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};

export default DeveloperPortal;