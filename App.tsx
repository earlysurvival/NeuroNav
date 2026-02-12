import React, { useState, useEffect } from 'react';
import { AppMode } from './types';
import { MODE_CONFIG, APP_NAME } from './constants';
import { Brain, ArrowLeft, Sun, Moon } from 'lucide-react';

import TaskBreakdown from './components/TaskBreakdown';
import ImpulseGuard from './components/ImpulseGuard';
import BrainDump from './components/BrainDump';
import BodyDouble from './components/BodyDouble';
import About from './components/About';

const App: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<AppMode>(AppMode.DASHBOARD);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Initialize Theme from LocalStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('neuronav-theme') as 'light' | 'dark' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme('dark');
    }
  }, []);

  // Toggle Theme Class
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('neuronav-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const renderContent = () => {
    switch (currentMode) {
      case AppMode.TASK_BREAKDOWN:
        return <TaskBreakdown />;
      case AppMode.IMPULSE_GUARD:
        return <ImpulseGuard />;
      case AppMode.BRAIN_DUMP:
        return <BrainDump />;
      case AppMode.BODY_DOUBLE:
        return <BodyDouble />;
      case AppMode.ABOUT:
        return <About onBack={() => setCurrentMode(AppMode.DASHBOARD)} />;
      default:
        return <Dashboard onSelectMode={setCurrentMode} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900 selection:text-indigo-900 dark:selection:text-indigo-100 transition-colors duration-300">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
         <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-50 animate-pulse-slow" />
         <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-teal-200/20 dark:bg-teal-900/20 rounded-full blur-3xl opacity-40" />
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-slate-800/50 transition-all duration-300">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setCurrentMode(AppMode.DASHBOARD)}
          >
            <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-2 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none group-hover:shadow-indigo-300 transition-all duration-300">
                <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 tracking-tight group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">{APP_NAME}</h1>
          </div>
          
          <div className="flex items-center gap-3">
            {currentMode !== AppMode.DASHBOARD && (
               <button 
                  onClick={() => setCurrentMode(AppMode.DASHBOARD)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-full transition-all duration-200"
               >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Main Menu</span>
               </button>
            )}

            <button 
              onClick={toggleTheme}
              className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 relative z-10">
        <div className="py-8 animate-fade-in">
            {renderContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-white/60 dark:bg-slate-900/60 border-t border-gray-200/60 dark:border-slate-800/60 backdrop-blur-sm py-8 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
             <p>© {new Date().getFullYear()} {APP_NAME}. <span className="hidden md:inline">Your external pre-frontal cortex.</span></p>
             <div className="flex items-center gap-6">
                <button 
                    onClick={() => setCurrentMode(AppMode.ABOUT)}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
                >
                    About Us
                </button>
                <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">Privacy</a>
                <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">Support</a>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Dashboard Component defined within App.tsx to keep file count low but organized
const Dashboard: React.FC<{ onSelectMode: (mode: AppMode) => void }> = ({ onSelectMode }) => {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-3xl mx-auto mt-8 animate-slide-up">
        <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
          Hello, Brain. <br/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            What do we need help with?
          </span>
        </h2>
        <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed font-light">
          Select a cognitive tool below to offload your executive function.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {Object.entries(MODE_CONFIG).map(([key, config], index) => {
           const ModeIcon = config.icon;
           return (
             <button
               key={key}
               onClick={() => onSelectMode(key as AppMode)}
               style={{ animationDelay: `${index * 100}ms` }}
               className="group flex flex-col items-start p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-sm border border-white dark:border-slate-700 hover:shadow-xl hover:border-indigo-100 dark:hover:border-indigo-900/50 hover:-translate-y-1 transition-all duration-300 text-left w-full relative overflow-hidden animate-slide-up fill-mode-backwards"
             >
               <div className={`absolute -top-4 -right-4 p-3 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-10 dark:group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110 group-hover:rotate-12`}>
                  <ModeIcon className="w-48 h-48 dark:text-white" />
               </div>
               
               <div className={`${config.bgColor} p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner dark:shadow-none`}>
                 <ModeIcon className={`w-8 h-8 ${config.color}`} />
               </div>
               <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 tracking-tight group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">
                  {config.title}
               </h3>
               <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed relative z-10">
                  {config.description}
               </p>
               
               <div className="mt-6 flex items-center text-sm font-bold text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                  Activate Tool <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
               </div>
             </button>
           );
        })}
      </div>
    </div>
  );
};

export default App;