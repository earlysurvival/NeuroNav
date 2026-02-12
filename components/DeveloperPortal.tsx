import React, { useState, useEffect } from 'react';
import { Terminal, Lock, TrendingUp, Map, List, Globe, Save, FileText, Check, AlertTriangle } from 'lucide-react';
import { APP_NAME } from '../constants';

const DeveloperPortal: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'plan' | 'roadmap' | 'features' | 'competitors' | 'notes'>('plan');
  const [notes, setNotes] = useState('');

  // Note persistence
  useEffect(() => {
    const savedNotes = localStorage.getItem('neuronav-dev-notes');
    if (savedNotes) setNotes(savedNotes);
  }, []);

  const handleSaveNotes = () => {
    localStorage.setItem('neuronav-dev-notes', notes);
    alert('DevLog Synced.');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') setIsAuthenticated(true);
    else alert('Access Denied: Invalid Credentials');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center animate-fade-in">
        <div className="bg-black text-green-500 p-8 rounded-xl font-mono border border-green-800 shadow-2xl w-full max-w-md">
          <div className="flex items-center gap-2 mb-6 border-b border-green-800 pb-2">
            <Terminal className="w-6 h-6" />
            <h2 className="text-xl font-bold tracking-widest">ROOT_ACCESS</h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs uppercase opacity-70">Enter Passphrase:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border-2 border-green-900 focus:border-green-500 outline-none p-3 text-white rounded-md"
                autoFocus
              />
            </div>
            <button type="submit" className="w-full bg-green-900/50 hover:bg-green-800 text-green-400 py-2 rounded border border-green-700 uppercase font-bold tracking-widest transition-colors">
              Decrypt
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Content Data
  const featuresList = [
      "Wearable Sync (Apple Watch/Garmin)", "Medication Tapering Alerts", "Therapist Data Export (PDF)", "AI Voice Journaling", "Sleep Rhythm Analytics",
      "Meal Prep for Exec Dysfunction", "Grocery List Automation", "Browser Extension Blocker", "Focus Music Generator (Real-time)", "Social Battery Monitor",
      "Task Gamification RPG Mode", "Pet Evolution System", "AR Room Organization", "Receipt Scanner for Budget", "Subscription Canceller",
      "Email Summary AI", "Meeting Transcriber", "Tone Detector for Texts", "Rejection Sensitivity (RSD) Soother", "Hyperfocus Timer (Pomodoro Inverse)",
      "Object Permanence Widget (Recent Files)", "Clutter Heatmap", "Dopamine Menu Builder", "Sensory Overload Alert", "Binaural Beats Player",
      "Body Doubling Community P2P", "Accountability Partner Match", "Streak Freeze Bank", "Custom Themes Marketplace", "Widget Stack (iOS/Android)",
      "Focus Mode Launcher (Android)", "Notification Batching", "Morning Routine Builder", "Bedtime Wind-down Protocol", "Water Intake Smart Reminders",
      "Meds Refill Automation", "Insurance Claim Helper", "Job Application Tracker", "Password Manager Integration", "Memory Palace AR",
      "Voice-to-Task Quick Capture", "Smart Calendar Blocking", "Travel Packing Generator", "Outfit Decision Helper", "Cleaning Playlist Sync",
      "Tax Document Organizer", "Impulse Buy 'Cool Down' Locker", "Family Plan Sync", "Teacher/IEP Mode", "Crisis Hotline Quick Access"
  ];

  const competitors = [
      { name: "Tiimo", rev: "$5M ARR", weakness: "Visuals only, no AI analysis." },
      { name: "Motion", rev: "$15M ARR", weakness: "Too expensive ($30/mo), complex UI." },
      { name: "Goblin Tools", rev: "Donation/Low", weakness: "Web only, no holistic system." },
      { name: "Dubbii", rev: "$1M ARR", weakness: "Video only, no task management." },
      { name: "Inflow", rev: "$8M ARR", weakness: "CBT heavy, low practical utility." }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto min-h-screen bg-white dark:bg-[#111] text-gray-900 dark:text-gray-100 font-sans shadow-2xl rounded-xl overflow-hidden animate-fade-in border border-gray-200 dark:border-gray-800">
      
      {/* Header */}
      <div className="bg-black text-white p-4 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg"><Terminal className="w-5 h-5"/></div>
            <div>
                <h1 className="font-bold text-lg tracking-tight">{APP_NAME} <span className="opacity-50 font-normal">| Master Control</span></h1>
                <p className="text-[10px] uppercase tracking-widest text-gray-400">Auth: Admin | Ver: 2.1.0-alpha</p>
            </div>
        </div>
        <div className="flex gap-4 text-xs font-mono">
            <span className="flex items-center gap-1 text-green-400"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/> SYSTEM_ONLINE</span>
        </div>
      </div>

      {/* Layout */}
      <div className="flex flex-col md:flex-row min-h-[800px]">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-gray-50 dark:bg-[#1a1a1a] border-r border-gray-200 dark:border-gray-800 p-4 space-y-2">
             {[
                 { id: 'plan', label: 'Business Plan', icon: FileText },
                 { id: 'roadmap', label: 'Strategic Roadmap', icon: Map },
                 { id: 'features', label: 'Feature Backlog (50+)', icon: List },
                 { id: 'competitors', label: 'Market Intel', icon: Globe },
                 { id: 'notes', label: 'DevLog (Notes)', icon: Save },
             ].map((tab) => (
                 <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                        ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'}
                    `}
                 >
                     <tab.icon className="w-4 h-4" />
                     {tab.label}
                 </button>
             ))}
          </div>

          {/* Main Content */}
          <div className="flex-grow p-8 overflow-y-auto h-[800px]">
              
              {/* BUSINESS PLAN */}
              {activeTab === 'plan' && (
                  <div className="space-y-8 animate-fade-in max-w-3xl">
                      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                          <h2 className="text-3xl font-black mb-2">Executive Strategy 2026</h2>
                          <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Confidential</p>
                      </div>
                      
                      <section className="space-y-3">
                          <h3 className="text-xl font-bold flex items-center gap-2"><TrendingUp className="w-5 h-5 text-blue-500"/> Value Proposition</h3>
                          <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                              {APP_NAME} targets the $13B Digital Health market by solving the "Action Gap" in ADHD. Unlike competitors who focus on *planning* (Motion) or *learning* (Inflow), we focus on *execution*. We act as an external pre-frontal cortex using Generative AI for real-time intervention.
                          </p>
                      </section>

                      <div className="grid md:grid-cols-2 gap-6">
                          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                              <h4 className="font-bold mb-3">Monetization (B2C)</h4>
                              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                  <li>• Freemium: Core tools (Timer, basic chat).</li>
                                  <li>• Pro ($12/mo): AI Visual Breakdown, Impulse Guard.</li>
                                  <li>• Lifetime ($299): Founding Member status.</li>
                              </ul>
                          </div>
                          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                              <h4 className="font-bold mb-3">Monetization (B2B)</h4>
                              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                  <li>• Enterprise: Corporate neurodiversity packages.</li>
                                  <li>• Clinical: Dashboard for therapists to track patient executive dysfunction patterns.</li>
                              </ul>
                          </div>
                      </div>

                      <section className="space-y-3">
                          <h3 className="text-xl font-bold">Financial Projections</h3>
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex text-xs font-bold text-white text-center leading-4">
                             <div className="w-[10%] bg-blue-500">Q1</div>
                             <div className="w-[20%] bg-blue-600">Q2</div>
                             <div className="w-[30%] bg-blue-700">Q3</div>
                             <div className="w-[40%] bg-blue-800">Q4 (Break Even)</div>
                          </div>
                          <p className="text-xs text-gray-500">Projected User Growth: 100k MAU by EOY.</p>
                      </section>
                  </div>
              )}

              {/* ROADMAP */}
              {activeTab === 'roadmap' && (
                  <div className="space-y-8 animate-fade-in">
                      <h2 className="text-3xl font-black mb-6">Strategic Roadmap</h2>
                      <div className="space-y-0 border-l-2 border-gray-200 dark:border-gray-800 ml-4">
                          {[
                              { q: "Q1 2026", title: "Foundation & AI", items: ["Gemini 2.0 Integration", "Voice Input latency <200ms", "Basic Wearable Push"] },
                              { q: "Q2 2026", title: "Community & Social", items: ["Body Doubling P2P Matching", "Gamification Leaderboards", "Family Sync"] },
                              { q: "Q3 2026", title: "Ecosystem", items: ["Chrome Extension", "Desktop Native App", "Calendar Bi-directional Sync"] },
                              { q: "Q4 2026", title: "The 'Cure' Era", items: ["Clinical Trials Partnership", "Predictive Burnout AI", "Hardware (Focus Dial)"] }
                          ].map((phase, i) => (
                              <div key={i} className="relative pl-8 pb-10">
                                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-gray-900"></div>
                                  <h3 className="text-xl font-bold">{phase.q}: {phase.title}</h3>
                                  <ul className="mt-2 space-y-1">
                                      {phase.items.map(item => <li key={item} className="text-gray-600 dark:text-gray-400 text-sm">• {item}</li>)}
                                  </ul>
                              </div>
                          ))}
                      </div>
                  </div>
              )}

              {/* FEATURES */}
              {activeTab === 'features' && (
                  <div className="animate-fade-in">
                      <div className="flex justify-between items-end mb-6">
                        <h2 className="text-3xl font-black">Feature Backlog</h2>
                        <span className="text-sm font-bold bg-blue-100 dark:bg-blue-900 text-blue-600 px-3 py-1 rounded-full">Count: {featuresList.length}</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {featuresList.map((f, i) => (
                              <div key={i} className="p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700 text-xs font-medium hover:border-blue-500 transition-colors cursor-default">
                                  {f}
                              </div>
                          ))}
                      </div>
                  </div>
              )}

              {/* COMPETITORS */}
              {activeTab === 'competitors' && (
                  <div className="animate-fade-in">
                      <h2 className="text-3xl font-black mb-6">Market Intelligence</h2>
                      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                          <table className="w-full text-left">
                              <thead className="bg-gray-100 dark:bg-gray-800 text-xs uppercase font-bold text-gray-500">
                                  <tr>
                                      <th className="p-4">Competitor</th>
                                      <th className="p-4">Est. Revenue</th>
                                      <th className="p-4">Critical Weakness</th>
                                  </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                  {competitors.map((c, i) => (
                                      <tr key={i} className="bg-white dark:bg-[#151515]">
                                          <td className="p-4 font-bold">{c.name}</td>
                                          <td className="p-4 font-mono text-green-600 dark:text-green-400">{c.rev}</td>
                                          <td className="p-4 text-red-500 text-sm">{c.weakness}</td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                      <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                          <h4 className="font-bold mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> Our Winning Edge</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                              Competitors rely on the user to *input* data manually (high friction). 
                              {APP_NAME} uses Multimodal AI (Image/Voice) to reduce input friction by 90%. 
                              We don't ask "What did you do?", we see it and log it.
                          </p>
                      </div>
                  </div>
              )}

              {/* DEVLOG (NOTES) */}
              {activeTab === 'notes' && (
                  <div className="h-full flex flex-col animate-fade-in">
                      <div className="flex justify-between items-center mb-4">
                          <h2 className="text-3xl font-black">DevLog</h2>
                          <button onClick={handleSaveNotes} className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                              <Save className="w-4 h-4" /> Sync
                          </button>
                      </div>
                      <div className="flex-grow relative">
                          <textarea
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              placeholder="# Development Notes\n\n- [ ] Fix re-render issue on TaskBoard\n- [ ] Update Gemini API key\n- [ ] Design new 'Neon' theme assets..."
                              className="w-full h-[600px] bg-yellow-50 dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-300 font-mono p-8 rounded-xl border border-yellow-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:ring-gray-600 resize-none shadow-inner leading-relaxed"
                          />
                          <div className="absolute top-4 right-6 text-xs text-gray-400 font-mono pointer-events-none">
                              Markdown Supported
                          </div>
                      </div>
                  </div>
              )}

          </div>
      </div>
    </div>
  );
};

export default DeveloperPortal;