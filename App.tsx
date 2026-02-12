import React, { useState, useEffect } from 'react';
import { AppMode, AppTheme, Task } from './types';
import { MODE_CONFIG, APP_NAME } from './constants';
import { Brain, ArrowLeft, Sun, Moon, ShieldCheck, Palette, Grid, Laptop, Briefcase, Sparkles, UserCircle } from 'lucide-react';

import TaskBreakdown from './components/TaskBreakdown';
import ImpulseGuard from './components/ImpulseGuard';
import BrainDump from './components/BrainDump';
import BodyDouble from './components/BodyDouble';
import AiFriend from './components/AiFriend';
import Mindfulness from './components/Mindfulness';
import RewardCenter from './components/RewardCenter';
import SmartTaskBoard from './components/SmartTaskBoard';
import About from './components/About';
import DeveloperPortal from './components/DeveloperPortal';

const App: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<AppMode>(AppMode.DASHBOARD);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const [appTheme, setAppTheme] = useState<AppTheme>('vapor');
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [userName, setUserName] = useState<string>('');
  const [showNameModal, setShowNameModal] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  // Initialize
  useEffect(() => {
    const savedThemeMode = localStorage.getItem('neuronav-theme-mode') as 'light' | 'dark' | null;
    const savedAppTheme = localStorage.getItem('neuronav-app-theme') as AppTheme | null;
    const savedName = localStorage.getItem('neuronav-username');
    const savedTasks = localStorage.getItem('neuronav-tasks');
    
    if (savedThemeMode) setThemeMode(savedThemeMode);
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setThemeMode('dark');

    if (savedAppTheme) setAppTheme(savedAppTheme);

    if (savedName) setUserName(savedName);
    else setShowNameModal(true);

    if (savedTasks) setTasks(JSON.parse(savedTasks));

    const accepted = sessionStorage.getItem('disclaimer-accepted');
    if (accepted === 'true') setShowDisclaimer(false);
  }, []);

  // Persistence
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(themeMode);
    localStorage.setItem('neuronav-theme-mode', themeMode);
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem('neuronav-app-theme', appTheme);
  }, [appTheme]);

  useEffect(() => {
    localStorage.setItem('neuronav-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleThemeMode = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  const acceptDisclaimer = () => {
      sessionStorage.setItem('disclaimer-accepted', 'true');
      setShowDisclaimer(false);
  };

  const saveName = (e: React.FormEvent) => {
      e.preventDefault();
      if(userName.trim()) {
          localStorage.setItem('neuronav-username', userName);
          setShowNameModal(false);
      }
  };

  // Task Helpers
  const addTask = (task: Task) => setTasks(prev => [task, ...prev]);
  const addMultipleTasks = (newTasks: Task[]) => setTasks(prev => [...newTasks, ...prev]);
  const toggleTask = (id: string) => setTasks(prev => prev.map(t => t.id === id ? {...t, completed: !t.completed} : t));
  const deleteTask = (id: string) => setTasks(prev => prev.filter(t => t.id !== id));

  const renderContent = () => {
    switch (currentMode) {
      case AppMode.TASK_BOARD: return <SmartTaskBoard tasks={tasks} userName={userName} onToggleTask={toggleTask} onDeleteTask={deleteTask} onAddTask={addTask} theme={appTheme} />;
      case AppMode.TASK_BREAKDOWN: return <TaskBreakdown />;
      case AppMode.IMPULSE_GUARD: return <ImpulseGuard />;
      case AppMode.BRAIN_DUMP: return <BrainDump onAddTasks={addMultipleTasks} userName={userName} />;
      case AppMode.BODY_DOUBLE: return <BodyDouble />;
      case AppMode.AI_FRIEND: return <AiFriend theme={appTheme} />;
      case AppMode.MINDFULNESS: return <Mindfulness />;
      case AppMode.REWARD: return <RewardCenter />;
      case AppMode.DEVELOPER: return <DeveloperPortal />;
      case AppMode.ABOUT: return <About onBack={() => setCurrentMode(AppMode.DASHBOARD)} onOpenDev={() => setCurrentMode(AppMode.DEVELOPER)} />;
      default: return <Dashboard onSelectMode={setCurrentMode} appTheme={appTheme} userName={userName} taskCount={tasks.filter(t=>!t.completed).length} />;
    }
  };

  // Dynamic Base Classes based on Theme
  const getThemeContainerClasses = () => {
    switch (appTheme) {
      case 'swiss': return 'bg-white text-black font-swiss selection:bg-red-500 selection:text-white';
      case 'executive': return 'bg-[#F2F0E9] dark:bg-[#1C1C1E] text-slate-800 dark:text-slate-200 font-executive';
      case 'neon': return 'bg-slate-950 text-slate-200 font-neon selection:bg-cyan-500 selection:text-black';
      default: return 'bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans'; // Vapor
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-all duration-700 ease-in-out ${getThemeContainerClasses()}`}>
      
      {/* Name Input Modal */}
      {showNameModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
              <form onSubmit={saveName} className="bg-white dark:bg-slate-900 max-w-sm w-full rounded-[2.5rem] p-10 shadow-2xl flex flex-col items-center gap-8">
                  <div className="p-5 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl animate-float">
                      <UserCircle className="w-14 h-14 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="text-center space-y-2">
                      <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white uppercase">Initialize.</h2>
                      <p className="text-gray-500 font-medium">Identify yourself, Pilot.</p>
                  </div>
                  <input 
                    autoFocus
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="NAME_REQUIRED"
                    className="w-full text-center text-3xl font-black border-b-4 border-indigo-100 dark:border-white/5 focus:border-indigo-500 outline-none bg-transparent py-3 uppercase tracking-tighter transition-all"
                  />
                  <button type="submit" disabled={!userName.trim()} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:scale-[1.05] hover:shadow-2xl hover:shadow-indigo-600/30 active:scale-95 transition-all disabled:opacity-30">
                      ENGAGE CORE
                  </button>
              </form>
          </div>
      )}

      {/* Disclaimer Overlay */}
      {showDisclaimer && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-fade-in">
              <div className="bg-white dark:bg-slate-900 max-w-sm w-full rounded-3xl p-8 shadow-2xl border border-white/10">
                  <div className="flex justify-center mb-6">
                      <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-full">
                          <ShieldCheck className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                      </div>
                  </div>
                  <h2 className="text-2xl font-black text-center mb-3 uppercase tracking-tighter">Safety Protocol</h2>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                      NeuroNav is a <strong>Cognitive Prosthetic</strong>. It provides organizational aid, not clinical treatment.
                  </p>
                  <button onClick={acceptDisclaimer} className="w-full py-4 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 shadow-xl transition-all">
                      I ACKNOWLEDGE
                  </button>
              </div>
          </div>
      )}

      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all duration-500
         ${appTheme === 'swiss' ? 'bg-white border-b-4 border-black py-5' : 
           appTheme === 'executive' ? 'bg-[#F2F0E9]/90 dark:bg-[#1C1C1E]/90 border-b border-stone-300 dark:border-stone-800 backdrop-blur-xl py-5' :
           appTheme === 'neon' ? 'bg-slate-950/90 border-b border-white/5 backdrop-blur-xl py-5' :
           'bg-white/60 dark:bg-slate-950/60 backdrop-blur-2xl border-b border-white/10 py-5'}
      `}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setCurrentMode(AppMode.DASHBOARD)}>
            <div className={`p-2.5 transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110
                ${appTheme === 'vapor' ? 'bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-2xl text-white shadow-xl shadow-indigo-500/20' : ''}
                ${appTheme === 'swiss' ? 'bg-black text-white rounded-none' : ''}
                ${appTheme === 'executive' ? 'text-stone-800 dark:text-stone-200 border-2 border-stone-800 dark:border-stone-200 rounded-full' : ''}
                ${appTheme === 'neon' ? 'text-cyan-400 border border-cyan-400 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.3)]' : ''}
            `}>
                <Brain className="w-7 h-7" />
            </div>
            <div className="flex flex-col">
                <h1 className={`text-2xl font-black leading-none tracking-tighter
                    ${appTheme === 'swiss' ? 'uppercase text-3xl italic' : ''}
                    ${appTheme === 'executive' ? 'font-serif tracking-normal italic' : ''}
                `}>
                    {APP_NAME}
                </h1>
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] opacity-40
                    ${appTheme === 'neon' ? 'text-cyan-600 opacity-100' : ''}
                    ${appTheme === 'swiss' ? 'hidden' : ''}
                `}>Bio-Digital Interface</span>
            </div>
          </div>
          
          {/* Controls Section */}
          <div className="flex items-center gap-4">
             {currentMode !== AppMode.DASHBOARD && (
                 <button 
                    onClick={() => setCurrentMode(AppMode.DASHBOARD)}
                    className={`flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest transition-all
                        ${appTheme === 'swiss' ? 'bg-black text-white hover:bg-red-600 rounded-none' : 
                          appTheme === 'neon' ? 'text-cyan-400 border border-cyan-400/30 hover:bg-cyan-400 hover:text-black rounded-xl' :
                          'bg-gray-100 dark:bg-white/5 hover:scale-105 rounded-2xl'}
                    `}
                 >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Return</span>
                 </button>
             )}

             <div className={`flex p-1 gap-1 border rounded-2xl
                ${appTheme === 'swiss' ? 'border-4 border-black rounded-none bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)]' : 
                  appTheme === 'neon' ? 'border-white/5 bg-white/5 rounded-xl' :
                  'bg-gray-100 dark:bg-white/5 border-transparent'}
             `}>
                 {[
                   { id: 'vapor', icon: Sparkles },
                   { id: 'neon', icon: Laptop },
                   { id: 'swiss', icon: Grid },
                   { id: 'executive', icon: Briefcase },
                 ].map((t) => (
                   <button 
                      key={t.id}
                      onClick={() => setAppTheme(t.id as AppTheme)} 
                      className={`p-2.5 rounded-xl transition-all duration-300
                        ${appTheme === t.id ? 'bg-white dark:bg-white/10 shadow-lg scale-110' : 'opacity-30 hover:opacity-100 hover:scale-105'}
                        ${appTheme === t.id && appTheme === 'swiss' ? 'bg-black text-white rounded-none' : ''}
                        ${appTheme === t.id && appTheme === 'neon' ? 'bg-cyan-400 text-black rounded-lg' : ''}
                      `}
                   >
                      <t.icon className="w-4 h-4" />
                   </button>
                 ))}
             </div>

             <button onClick={toggleThemeMode} className="p-3 bg-gray-100 dark:bg-white/5 rounded-2xl opacity-60 hover:opacity-100 transition-all hover:scale-110">
                 {themeMode === 'light' ? <Moon className="w-5 h-5"/> : <Sun className="w-5 h-5"/>}
             </button>
             
             <button onClick={() => setCurrentMode(AppMode.ABOUT)} className="p-3 bg-gray-100 dark:bg-white/5 rounded-2xl opacity-60 hover:opacity-100 transition-all hover:scale-110">
                 <UserCircle className="w-5 h-5" />
             </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-6xl mx-auto px-6 py-12 relative z-10 flex flex-col items-center">
        <div className="w-full">
            {renderContent()}
        </div>
      </main>

    </div>
  );
};

// Dashboard Component with Improved Alignment and Visual Polish
const Dashboard: React.FC<{ onSelectMode: (mode: AppMode) => void, appTheme: AppTheme, userName: string, taskCount: number }> = ({ onSelectMode, appTheme, userName, taskCount }) => {
  
  const getCardClasses = (featured = false) => {
      const base = "relative overflow-hidden cursor-pointer transition-all duration-500 group flex flex-col justify-between transform-gpu";
      
      if (appTheme === 'vapor') {
          return `${base} bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 rounded-[2.5rem] p-8 hover:bg-white/90 dark:hover:bg-white/10 hover:shadow-[0_20px_60px_-15px_rgba(79,70,229,0.2)] hover:-translate-y-2`;
      }
      if (appTheme === 'neon') {
          return `${base} bg-[#0A0A0B] border border-white/5 p-8 rounded-2xl hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:-translate-y-1`;
      }
      if (appTheme === 'swiss') {
          return `${base} bg-white border-4 border-black p-8 hover:bg-black hover:text-white rounded-none hover:translate-x-[4px] hover:-translate-y-[4px] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)]`;
      }
      if (appTheme === 'executive') {
          return `${base} bg-[#EBE9E1] dark:bg-[#202022] border border-stone-300 dark:border-stone-800 p-10 rounded-sm hover:shadow-2xl hover:-translate-y-1 transition-transform duration-700`;
      }
      return base;
  };

  const renderName = () => {
    if (appTheme === 'neon') return <span className="text-cyan-400 animate-pulse font-mono">> {userName.toUpperCase()}_</span>;
    if (appTheme === 'swiss') return <span className="bg-red-600 text-white px-3 italic uppercase">{userName}</span>;
    if (appTheme === 'executive') return <span className="italic font-serif border-b-2 border-stone-500">{userName}</span>;
    return <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500 font-black">{userName}</span>;
  };

  return (
    <div className="w-full flex flex-col items-center">
        
        {/* Welcome Text */}
        <div className="text-center mb-16 max-w-3xl animate-slide-up">
            {appTheme === 'swiss' && (
                <h2 className="text-7xl font-black uppercase tracking-tighter text-black dark:text-white mb-4 leading-[0.85]">
                    WELCOME BACK,<br/>{renderName()}.
                </h2>
            )}
            {appTheme === 'neon' && (
                <div className="space-y-4">
                  <h2 className="text-5xl font-mono text-white mb-2 tracking-tighter">
                      AUTHENTICATED_ACCESS
                  </h2>
                  <p className="text-cyan-500/60 font-mono text-sm tracking-widest">{renderName()} | SESSION_OPEN</p>
                </div>
            )}
            {(appTheme === 'vapor' || appTheme === 'executive') && (
                <div className="space-y-4">
                  <h2 className={`text-6xl font-black tracking-tight text-gray-900 dark:text-white ${appTheme === 'executive' ? 'font-serif' : ''}`}>
                      The world is yours, {renderName()}.
                  </h2>
                  <p className="text-xl text-gray-500 font-medium">Ready to take the first step?</p>
                </div>
            )}
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl auto-rows-[220px]">
            
            {/* KAI - Featured Card */}
            <button 
                onClick={() => onSelectMode(AppMode.AI_FRIEND)}
                className={`md:col-span-2 ${getCardClasses(true)} ${appTheme === 'swiss' ? 'bg-red-600 border-red-600 text-white hover:bg-black hover:border-black' : ''}`}
            >
                <div className="relative z-10 h-full flex flex-col justify-between items-start text-left w-full animate-fade-in" style={{animationDelay: '0.1s'}}>
                    <div className="flex justify-between w-full items-start">
                        <div className={`p-4 rounded-2xl ${appTheme === 'vapor' ? 'bg-pink-100/50 text-pink-600 shadow-xl' : 'bg-white/10'}`}>
                             <MODE_CONFIG.AI_FRIEND.icon className="w-10 h-10" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 border-2 border-current px-4 py-1.5 rounded-full">Neuro_Companion_Active</span>
                    </div>
                    <div>
                        <h3 className="text-4xl font-black mb-2 tracking-tighter">Connect with Kai</h3>
                        <p className="opacity-80 text-lg font-medium leading-tight max-w-md">Vent, process emotions, and build tiny plans with your digital pet.</p>
                    </div>
                </div>
            </button>

            {/* Smart Plan */}
            <button onClick={() => onSelectMode(AppMode.TASK_BOARD)} className={getCardClasses()} style={{animationDelay: '0.2s'}}>
                 <div className="flex justify-between w-full items-start animate-fade-in">
                    <div className={`p-4 rounded-2xl ${appTheme === 'vapor' ? 'bg-indigo-100/50 text-indigo-600 shadow-xl' : 'bg-white/10'}`}>
                         <MODE_CONFIG.TASK_BOARD.icon className="w-9 h-9" />
                    </div>
                    {taskCount > 0 && (
                        <span className="bg-red-600 text-white text-xs font-black w-8 h-8 flex items-center justify-center rounded-2xl shadow-xl shadow-red-600/30 animate-bounce">
                            {taskCount}
                        </span>
                    )}
                 </div>
                 <div className="text-left mt-auto animate-fade-in">
                     <h3 className="text-2xl font-black tracking-tight">Smart Plan</h3>
                     <p className="text-sm opacity-50 font-bold uppercase tracking-widest mt-1">Calendar Core</p>
                 </div>
            </button>

            <button onClick={() => onSelectMode(AppMode.TASK_BREAKDOWN)} className={getCardClasses()} style={{animationDelay: '0.3s'}}>
                 <div className={`p-4 w-fit rounded-2xl ${appTheme === 'vapor' ? 'bg-blue-100/50 text-blue-600 shadow-xl' : 'bg-white/10'}`}>
                    <MODE_CONFIG.TASK_BREAKDOWN.icon className="w-9 h-9" />
                 </div>
                 <div className="text-left mt-auto">
                     <h3 className="text-2xl font-black tracking-tight">Breakdown</h3>
                     <p className="text-sm opacity-50 font-bold uppercase tracking-widest mt-1">Visual Logic</p>
                 </div>
            </button>

            <button onClick={() => onSelectMode(AppMode.IMPULSE_GUARD)} className={getCardClasses()} style={{animationDelay: '0.4s'}}>
                 <div className={`p-4 w-fit rounded-2xl ${appTheme === 'vapor' ? 'bg-rose-100/50 text-rose-600 shadow-xl' : 'bg-white/10'}`}>
                    <MODE_CONFIG.IMPULSE_GUARD.icon className="w-9 h-9" />
                 </div>
                 <div className="text-left mt-auto">
                     <h3 className="text-2xl font-black tracking-tight">Friction</h3>
                     <p className="text-sm opacity-50 font-bold uppercase tracking-widest mt-1">Impulse Shield</p>
                 </div>
            </button>

            <button onClick={() => onSelectMode(AppMode.BRAIN_DUMP)} className={`md:col-span-2 ${getCardClasses()}`} style={{animationDelay: '0.5s'}}>
                 <div className="flex flex-row items-center gap-8 h-full text-left w-full px-2">
                     <div className={`p-8 rounded-[2rem] flex-shrink-0 transition-transform duration-500 group-hover:rotate-12
                        ${appTheme === 'vapor' ? 'bg-indigo-100 text-indigo-600 shadow-2xl' : 'border-2 border-current'}
                        ${appTheme === 'swiss' ? 'border-4 border-white bg-black text-white rounded-none' : ''}
                     `}>
                        <MODE_CONFIG.BRAIN_DUMP.icon className="w-12 h-12" />
                     </div>
                     <div className="space-y-2">
                         <h3 className="text-3xl font-black tracking-tighter uppercase">The Brain Dump</h3>
                         <p className="opacity-60 text-lg font-medium leading-tight">Offload the noise. We convert chaos into actionable neuro-paths.</p>
                     </div>
                 </div>
            </button>

            <button onClick={() => onSelectMode(AppMode.BODY_DOUBLE)} className={getCardClasses()} style={{animationDelay: '0.6s'}}>
                 <div className={`p-4 w-fit rounded-2xl ${appTheme === 'vapor' ? 'bg-emerald-100/50 text-emerald-600 shadow-xl' : 'bg-white/10'}`}>
                    <MODE_CONFIG.BODY_DOUBLE.icon className="w-9 h-9" />
                 </div>
                 <div className="text-left mt-auto">
                     <h3 className="text-2xl font-black tracking-tight">Presence</h3>
                     <p className="text-sm opacity-50 font-bold uppercase tracking-widest mt-1">Body Doubling</p>
                 </div>
            </button>

            <button onClick={() => onSelectMode(AppMode.MINDFULNESS)} className={getCardClasses()} style={{animationDelay: '0.7s'}}>
                 <div className={`p-4 w-fit rounded-2xl ${appTheme === 'vapor' ? 'bg-teal-100/50 text-teal-600 shadow-xl' : 'bg-white/10'}`}>
                    <MODE_CONFIG.MINDFULNESS.icon className="w-9 h-9" />
                 </div>
                 <div className="text-left mt-auto">
                     <h3 className="text-2xl font-black tracking-tight">Atmosphere</h3>
                     <p className="text-sm opacity-50 font-bold uppercase tracking-widest mt-1">Bio-Soundscapes</p>
                 </div>
            </button>

             <button onClick={() => onSelectMode(AppMode.REWARD)} className={getCardClasses()} style={{animationDelay: '0.8s'}}>
                 <div className={`p-4 w-fit rounded-2xl ${appTheme === 'vapor' ? 'bg-yellow-100/50 text-yellow-600 shadow-xl' : 'bg-white/10'}`}>
                    <MODE_CONFIG.REWARD.icon className="w-9 h-9" />
                 </div>
                 <div className="text-left mt-auto">
                     <h3 className="text-2xl font-black tracking-tight">Depot</h3>
                     <p className="text-sm opacity-50 font-bold uppercase tracking-widest mt-1">Dopamine Wins</p>
                 </div>
            </button>

        </div>
    </div>
  );
};

export default App;