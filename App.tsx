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
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${getThemeContainerClasses()}`}>
      
      {/* Name Input Modal */}
      {showNameModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
              <form onSubmit={saveName} className="bg-white dark:bg-slate-900 max-w-sm w-full rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-6">
                  <div className="p-4 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                      <UserCircle className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="text-center">
                      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Welcome, Pilot.</h2>
                      <p className="text-gray-500">What should we call you?</p>
                  </div>
                  <input 
                    autoFocus
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full text-center text-2xl font-bold border-b-2 border-gray-200 focus:border-indigo-500 outline-none bg-transparent py-2"
                  />
                  <button type="submit" disabled={!userName.trim()} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:scale-[1.02] transition-transform disabled:opacity-50">
                      Let's Fly
                  </button>
              </form>
          </div>
      )}

      {/* Disclaimer Overlay */}
      {showDisclaimer && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-fade-in">
              <div className="bg-white dark:bg-slate-900 max-w-sm w-full rounded-2xl p-6 shadow-2xl border border-gray-100 dark:border-slate-800">
                  <div className="flex justify-center mb-4">
                      <div className="bg-indigo-50 dark:bg-indigo-900/50 p-3 rounded-full">
                          <ShieldCheck className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                      </div>
                  </div>
                  <h2 className="text-xl font-bold text-center mb-2">Safety Check</h2>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                      NeuroNav is an organizational aid, not a medical device.
                  </p>
                  <button onClick={acceptDisclaimer} className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition">
                      Got it
                  </button>
              </div>
          </div>
      )}

      {/* Theme Background FX */}
      {appTheme === 'vapor' && (
        <div className="fixed inset-0 pointer-events-none z-0">
           <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200/40 dark:bg-purple-900/20 rounded-full blur-[120px]"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-200/40 dark:bg-blue-900/20 rounded-full blur-[120px]"></div>
        </div>
      )}
      {appTheme === 'neon' && (
         <div className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06)_1px,transparent_0,transparent_80px),linear-gradient(rgba(255,0,0,0.06)_1px,transparent_0,transparent_80px)] bg-[length:100%_4px,40px_100%,100%_40px]"></div>
      )}

      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300
         ${appTheme === 'swiss' ? 'bg-white border-b-2 border-black py-4' : 
           appTheme === 'executive' ? 'bg-[#F2F0E9]/90 dark:bg-[#1C1C1E]/90 border-b border-stone-300 dark:border-stone-800 backdrop-blur-md py-4' :
           appTheme === 'neon' ? 'bg-slate-950/90 border-b border-slate-800 backdrop-blur-md py-4' :
           'bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl border-b border-white/20 py-4'}
      `}>
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentMode(AppMode.DASHBOARD)}>
            <div className={`p-2 transition-transform group-hover:rotate-12
                ${appTheme === 'vapor' ? 'bg-gradient-to-tr from-indigo-400 to-purple-400 rounded-xl text-white shadow-lg shadow-indigo-200 dark:shadow-none' : ''}
                ${appTheme === 'swiss' ? 'bg-black text-white rounded-none' : ''}
                ${appTheme === 'executive' ? 'text-stone-800 dark:text-stone-200 border border-stone-800 dark:border-stone-200 rounded-full' : ''}
                ${appTheme === 'neon' ? 'text-cyan-400 border border-cyan-400 rounded-md shadow-[0_0_10px_rgba(34,211,238,0.4)]' : ''}
            `}>
                <Brain className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
                <h1 className={`text-xl font-bold leading-none tracking-tight
                    ${appTheme === 'swiss' ? 'uppercase tracking-tighter text-2xl' : ''}
                    ${appTheme === 'executive' ? 'font-serif tracking-wide' : ''}
                `}>
                    {APP_NAME}
                </h1>
                <span className={`text-[10px] font-medium opacity-60
                    ${appTheme === 'neon' ? 'text-cyan-600' : ''}
                    ${appTheme === 'swiss' ? 'hidden' : ''}
                `}>External Cortex v2.0</span>
            </div>
          </div>
          
          {/* Controls Section */}
          <div className="flex items-center gap-3">
             {currentMode !== AppMode.DASHBOARD && (
                 <button 
                    onClick={() => setCurrentMode(AppMode.DASHBOARD)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all
                        ${appTheme === 'swiss' ? 'bg-red-600 text-white hover:bg-red-700' : 
                          appTheme === 'neon' ? 'text-cyan-400 border border-cyan-900 hover:bg-cyan-900/20' :
                          'bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full'}
                    `}
                 >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Back</span>
                 </button>
             )}

             <div className={`flex p-1 gap-1 border rounded-full
                ${appTheme === 'swiss' ? 'border-2 border-black rounded-none bg-white' : 
                  appTheme === 'neon' ? 'border-slate-800 bg-slate-900 rounded-md' :
                  'bg-gray-100 dark:bg-slate-800 border-transparent'}
             `}>
                 {[
                   { id: 'vapor', icon: Sparkles, label: 'Vapor' },
                   { id: 'neon', icon: Laptop, label: 'Neon' },
                   { id: 'swiss', icon: Grid, label: 'Swiss' },
                   { id: 'executive', icon: Briefcase, label: 'Exec' },
                 ].map((t) => (
                   <button 
                      key={t.id}
                      onClick={() => setAppTheme(t.id as AppTheme)} 
                      className={`p-2 rounded-full transition-all
                        ${appTheme === t.id ? 'bg-white dark:bg-slate-700 shadow-sm' : 'opacity-40 hover:opacity-100'}
                        ${appTheme === t.id && appTheme === 'swiss' ? 'bg-black text-white rounded-none' : ''}
                        ${appTheme === t.id && appTheme === 'neon' ? 'bg-cyan-900/30 text-cyan-400 rounded-sm' : ''}
                      `}
                      title={t.label}
                   >
                      <t.icon className="w-4 h-4" />
                   </button>
                 ))}
             </div>

             <button onClick={toggleThemeMode} className="p-2 opacity-50 hover:opacity-100 transition">
                 {themeMode === 'light' ? <Moon className="w-5 h-5"/> : <Sun className="w-5 h-5"/>}
             </button>
             
             <button onClick={() => setCurrentMode(AppMode.ABOUT)} className="p-2 opacity-50 hover:opacity-100 transition">
                 <UserCircle className="w-5 h-5" />
             </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-6 py-8 relative z-10 flex flex-col items-center">
        <div className="w-full animate-slide-up">
            {renderContent()}
        </div>
      </main>

    </div>
  );
};

// Dashboard Component with 4 Distinct Artistic Themes
const Dashboard: React.FC<{ onSelectMode: (mode: AppMode) => void, appTheme: AppTheme, userName: string, taskCount: number }> = ({ onSelectMode, appTheme, userName, taskCount }) => {
  
  const getCardClasses = (featured = false) => {
      const base = "relative overflow-hidden cursor-pointer transition-all duration-300 group flex flex-col justify-between";
      
      if (appTheme === 'vapor') {
          return `${base} bg-white/40 dark:bg-white/5 backdrop-blur-lg border border-white/50 dark:border-white/10 rounded-3xl p-6 hover:bg-white/60 dark:hover:bg-white/10 hover:scale-[1.02] shadow-xl shadow-indigo-100/20 dark:shadow-none`;
      }
      if (appTheme === 'neon') {
          return `${base} bg-slate-900 border border-slate-800 p-6 rounded-lg hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]`;
      }
      if (appTheme === 'swiss') {
          return `${base} bg-white border-2 border-black p-6 hover:bg-black hover:text-white rounded-none transition-colors duration-200`;
      }
      if (appTheme === 'executive') {
          return `${base} bg-[#EBE9E1] dark:bg-[#252525] border border-stone-300 dark:border-stone-700 p-8 rounded-sm hover:shadow-2xl hover:-translate-y-1`;
      }
      return base;
  };

  const renderName = () => {
    if (appTheme === 'neon') return <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse">{userName || 'Pilot'}</span>;
    if (appTheme === 'swiss') return <span className="bg-black text-white px-2">{userName || 'PILOT'}</span>;
    if (appTheme === 'executive') return <span className="italic border-b-2 border-stone-400">{userName || 'Pilot'}</span>;
    return <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">{userName || 'Pilot'}</span>;
  };

  return (
    <div className="w-full flex flex-col items-center">
        
        {/* Welcome Text */}
        <div className="text-center mb-12 max-w-2xl animate-fade-in">
            {appTheme === 'swiss' && (
                <h2 className="text-6xl font-black uppercase tracking-tighter text-black dark:text-white mb-2 leading-[0.9]">
                    HELLO, {renderName()}.<br/><span className="text-red-600">READY?</span>
                </h2>
            )}
            {appTheme === 'neon' && (
                <h2 className="text-4xl font-mono text-slate-200 mb-2">
                    > WELCOME_BACK_{renderName()}_
                </h2>
            )}
            {(appTheme === 'vapor' || appTheme === 'executive') && (
                <h2 className={`text-5xl font-bold tracking-tight text-slate-800 dark:text-white mb-2 ${appTheme === 'executive' ? 'font-serif' : ''}`}>
                    Ready to flow, {renderName()}?
                </h2>
            )}
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl auto-rows-[200px]">
            
            {/* KAI - Featured Card */}
            <button 
                onClick={() => onSelectMode(AppMode.AI_FRIEND)}
                className={`md:col-span-2 ${getCardClasses(true)} ${appTheme === 'swiss' ? 'bg-red-600 border-red-600 text-white hover:bg-black hover:border-black' : ''}`}
            >
                <div className="relative z-10 h-full flex flex-col justify-between items-start text-left w-full">
                    <div className="flex justify-between w-full items-start">
                        <div className={`p-3 rounded-xl ${appTheme === 'vapor' ? 'bg-pink-100/50 text-pink-600' : ''}`}>
                             <MODE_CONFIG.AI_FRIEND.icon className="w-8 h-8" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider opacity-70 border border-current px-2 py-1 rounded-full">Always Online</span>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold mb-1">Kai Companion</h3>
                        <p className="opacity-80 font-medium">Vent, process, and plan with your AI friend.</p>
                    </div>
                </div>
            </button>

            {/* Smart Plan (New) */}
            <button onClick={() => onSelectMode(AppMode.TASK_BOARD)} className={getCardClasses()}>
                 <div className="flex justify-between w-full">
                    <div className={`p-3 rounded-xl ${appTheme === 'vapor' ? 'bg-indigo-100/50 text-indigo-600' : ''}`}>
                         <MODE_CONFIG.TASK_BOARD.icon className="w-8 h-8" />
                    </div>
                    {taskCount > 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-md">
                            {taskCount}
                        </span>
                    )}
                 </div>
                 <div className="text-left mt-auto">
                     <h3 className="text-xl font-bold">Smart Plan</h3>
                     <p className="text-sm opacity-60 mt-1 font-medium">Calendar & Tasks</p>
                 </div>
            </button>

            <button onClick={() => onSelectMode(AppMode.TASK_BREAKDOWN)} className={getCardClasses()}>
                 <div className={`p-3 w-fit rounded-xl ${appTheme === 'vapor' ? 'bg-blue-100/50 text-blue-600' : ''}`}>
                    <MODE_CONFIG.TASK_BREAKDOWN.icon className="w-8 h-8 mb-auto" />
                 </div>
                 <div className="text-left mt-auto">
                     <h3 className="text-xl font-bold">Breakdown</h3>
                     <p className="text-sm opacity-60 mt-1 font-medium">Visual De-overwhelm</p>
                 </div>
            </button>

            <button onClick={() => onSelectMode(AppMode.IMPULSE_GUARD)} className={getCardClasses()}>
                 <div className={`p-3 w-fit rounded-xl ${appTheme === 'vapor' ? 'bg-rose-100/50 text-rose-600' : ''}`}>
                    <MODE_CONFIG.IMPULSE_GUARD.icon className="w-8 h-8 mb-auto" />
                 </div>
                 <div className="text-left mt-auto">
                     <h3 className="text-xl font-bold">Impulse Guard</h3>
                     <p className="text-sm opacity-60 mt-1 font-medium">Spending Friction</p>
                 </div>
            </button>

            <button onClick={() => onSelectMode(AppMode.BRAIN_DUMP)} className={`md:col-span-2 ${getCardClasses()}`}>
                 <div className="flex flex-row items-center gap-6 h-full text-left">
                     <div className={`p-6 rounded-full flex-shrink-0
                        ${appTheme === 'vapor' ? 'bg-indigo-100 text-indigo-600' : 'border-2 border-current'}
                        ${appTheme === 'swiss' ? 'border-2 border-white' : ''}
                     `}>
                        <MODE_CONFIG.BRAIN_DUMP.icon className="w-10 h-10" />
                     </div>
                     <div>
                         <h3 className="text-2xl font-bold">Brain Dump</h3>
                         <p className="opacity-70 mt-1 font-medium">Turn mental chaos into a structured plan.</p>
                     </div>
                 </div>
            </button>

            <button onClick={() => onSelectMode(AppMode.BODY_DOUBLE)} className={getCardClasses()}>
                 <div className={`p-3 w-fit rounded-xl ${appTheme === 'vapor' ? 'bg-emerald-100/50 text-emerald-600' : ''}`}>
                    <MODE_CONFIG.BODY_DOUBLE.icon className="w-8 h-8 mb-auto" />
                 </div>
                 <div className="text-left mt-auto">
                     <h3 className="text-xl font-bold">Body Double</h3>
                     <p className="text-sm opacity-60 mt-1 font-medium">Presence Timer</p>
                 </div>
            </button>

            <button onClick={() => onSelectMode(AppMode.MINDFULNESS)} className={getCardClasses()}>
                 <div className={`p-3 w-fit rounded-xl ${appTheme === 'vapor' ? 'bg-teal-100/50 text-teal-600' : ''}`}>
                    <MODE_CONFIG.MINDFULNESS.icon className="w-8 h-8 mb-auto" />
                 </div>
                 <div className="text-left mt-auto">
                     <h3 className="text-xl font-bold">Mindfulness</h3>
                     <p className="text-sm opacity-60 mt-1 font-medium">Soundscapes & Breath</p>
                 </div>
            </button>

             <button onClick={() => onSelectMode(AppMode.REWARD)} className={getCardClasses()}>
                 <div className={`p-3 w-fit rounded-xl ${appTheme === 'vapor' ? 'bg-yellow-100/50 text-yellow-600' : ''}`}>
                    <MODE_CONFIG.REWARD.icon className="w-8 h-8 mb-auto" />
                 </div>
                 <div className="text-left mt-auto">
                     <h3 className="text-xl font-bold">Rewards</h3>
                     <p className="text-sm opacity-60 mt-1 font-medium">Dopamine Depot</p>
                 </div>
            </button>

        </div>
    </div>
  );
};

export default App;