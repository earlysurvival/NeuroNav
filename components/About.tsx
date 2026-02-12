import React from 'react';
import { Brain, Heart, Zap, Shield, Sparkles, ArrowRight, Layers, Lock, Cpu } from 'lucide-react';
import { APP_NAME } from '../constants';
import { AppMode } from '../types';

const About: React.FC<{ onBack: () => void, onOpenDev: () => void }> = ({ onBack, onOpenDev }) => {
  return (
    <div className="max-w-5xl mx-auto pb-12 animate-fade-in relative">
      
      {/* Hero Section */}
      <div className="text-center space-y-8 py-20 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-indigo-200 to-purple-200 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>
        
        <div className="inline-flex items-center justify-center p-4 bg-white dark:bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl mb-4 animate-float border border-white/20">
          <Brain className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
        </div>
        
        <h2 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter leading-[1.1]">
          Rewiring the World for <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 animate-gradient">
            Neurodivergent Minds.
          </span>
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
          {APP_NAME} is not just a productivity tool. It is a <span className="font-semibold text-gray-900 dark:text-white">digital prosthesis</span> for Executive Function, designed to bridge the gap between intention and action.
        </p>

        <div className="pt-8">
            <button 
              onClick={onBack}
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-gray-900 font-lg rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100 hover:scale-105"
            >
              Initialize Dashboard
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
      </div>

      {/* Feature Grid with Glassmorphism */}
      <div className="grid md:grid-cols-3 gap-6 mb-20 px-4">
        {[
          { icon: Layers, title: "External Cortex", desc: "Offloading the heavy lifting of planning and initiation.", color: "blue" },
          { icon: Heart, title: "Empathy Engine", desc: "Shame-free, validating, and endlessly patient support.", color: "rose" },
          { icon: Zap, title: "Dopamine Hacking", desc: "Game design principles to hijack the reward system.", color: "teal" }
        ].map((feature, idx) => (
          <div key={idx} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md p-8 rounded-3xl border border-white/50 dark:border-white/5 hover:border-indigo-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-${feature.color}-50 dark:bg-${feature.color}-900/30 group-hover:scale-110 transition-transform`}>
              <feature.icon className={`w-7 h-7 text-${feature.color}-600 dark:text-${feature.color}-400`} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* The Science Section */}
      <div className="mx-4 bg-gray-900 dark:bg-black rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-20 pointer-events-none animate-spin-slow">
           <Cpu className="w-96 h-96 text-indigo-500" />
        </div>
        
        <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
             <div className="inline-flex items-center gap-2 text-indigo-300 font-bold uppercase tracking-widest text-xs border border-indigo-500/30 px-3 py-1 rounded-full">
                <Shield className="w-3 h-3" />
                Neuroscience
             </div>
             <h3 className="text-4xl md:text-5xl font-bold leading-tight">
                Understanding the <br/> <span className="text-indigo-400">"Why-Wire"</span>
             </h3>
             <p className="text-gray-300 text-lg leading-relaxed">
                ADHD brains struggle with <strong>Temporal Discounting</strong>—the tendency to undervalue future rewards. 
                {APP_NAME} combats this by making consequences immediate and visible.
             </p>
             <p className="text-gray-300 text-lg leading-relaxed">
                By externalizing Working Memory into visual structures (Task Breakdown, Brain Dump), we reduce cognitive load and lower the activation energy required to start.
             </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-inner">
             <h4 className="font-bold text-xl mb-6 border-b border-white/10 pb-4">Core Competencies</h4>
             <ul className="space-y-6">
                {[
                  { id: 1, title: "Task Initiation", desc: "Overcoming the 'Wall of Awful'."},
                  { id: 2, title: "Time Blindness", desc: "Visualizing the passage of time."},
                  { id: 3, title: "Impulse Control", desc: "Adding friction to dopamine spending."}
                ].map((item) => (
                  <li key={item.id} className="flex items-start gap-4">
                     <span className="bg-indigo-600 rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center text-sm font-bold shadow-lg shadow-indigo-500/50">{item.id}</span>
                     <div>
                       <strong className="block text-white text-lg">{item.title}</strong>
                       <span className="text-indigo-200">{item.desc}</span>
                     </div>
                  </li>
                ))}
             </ul>
          </div>
        </div>
      </div>

      {/* Footer / Developer Entry */}
      <div className="mt-16 text-center border-t border-gray-200 dark:border-gray-800 pt-8 flex justify-center items-center gap-4">
        <p className="text-sm text-gray-400">© 2024 NeuroNav Systems. All systems nominal.</p>
        <button 
          onClick={onOpenDev}
          className="p-2 text-gray-300 hover:text-indigo-600 dark:hover:text-white transition-colors opacity-50 hover:opacity-100"
          title="Developer Access"
        >
          <Lock className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

export default About;