import React from 'react';
import { Brain, Heart, Zap, Shield, Sparkles, ArrowRight, Layers } from 'lucide-react';
import { APP_NAME } from '../constants';

const About: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12 animate-fade-in">
      
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-50 dark:bg-indigo-900/50 rounded-full mb-4 animate-pulse-slow">
          <Brain className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
          Rewiring the World for <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Neurodivergent Minds
          </span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          {APP_NAME} is not just a productivity tool. It is a digital prosthesis for Executive Function, designed to bridge the gap between intention and action.
        </p>
      </div>

      {/* Mission Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all duration-300 group">
          <div className="bg-blue-100 dark:bg-blue-900/50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">External Pre-Frontal Cortex</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We offload the heavy lifting of planning, prioritizing, and initiating tasks, freeing your brain to focus on doing rather than managing.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all duration-300 group">
          <div className="bg-rose-100 dark:bg-rose-900/50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Heart className="w-6 h-6 text-rose-600 dark:text-rose-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Empathy Engine</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Shame is the enemy of productivity. Our AI is programmed to be non-judgmental, validating, and endlessly patient.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all duration-300 group">
          <div className="bg-teal-100 dark:bg-teal-900/50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Zap className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Dopamine Architecture</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We use game design principles and immediate feedback loops ("The Why-Wire") to hack the ADHD reward system.
          </p>
        </div>
      </div>

      {/* The Science Section */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
           <Sparkles className="w-64 h-64 text-indigo-500/20" />
        </div>
        
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
             <div className="flex items-center gap-2 text-indigo-300 font-bold uppercase tracking-wider text-sm">
                <Shield className="w-4 h-4" />
                The Science
             </div>
             <h3 className="text-3xl font-bold leading-tight text-white">
                Understanding the "Why-Wire"
             </h3>
             <p className="text-indigo-100 leading-relaxed">
                ADHD brains struggle with <strong>Temporal Discounting</strong>—the tendency to undervalue future rewards. 
                {APP_NAME} combats this by making consequences immediate and visible.
             </p>
             <p className="text-indigo-100 leading-relaxed">
                By externalizing Working Memory into visual structures (Task Breakdown, Brain Dump), we reduce cognitive load and lower the activation energy required to start.
             </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
             <h4 className="font-bold text-lg mb-4 border-b border-white/20 pb-2 text-white">Core Competencies</h4>
             <ul className="space-y-4 text-indigo-50">
                <li className="flex items-start gap-3">
                   <span className="bg-indigo-500 rounded-full w-6 h-6 flex items-center justify-center text-xs mt-0.5">1</span>
                   <span><strong>Task Initiation:</strong> Overcoming the "Wall of Awful".</span>
                </li>
                <li className="flex items-start gap-3">
                   <span className="bg-indigo-500 rounded-full w-6 h-6 flex items-center justify-center text-xs mt-0.5">2</span>
                   <span><strong>Time Blindness:</strong> Visualizing the passage of time.</span>
                </li>
                <li className="flex items-start gap-3">
                   <span className="bg-indigo-500 rounded-full w-6 h-6 flex items-center justify-center text-xs mt-0.5">3</span>
                   <span><strong>Impulse Control:</strong> Adding friction to spending.</span>
                </li>
             </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-8">
        <button 
          onClick={onBack}
          className="group bg-gray-900 dark:bg-white dark:text-slate-900 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:bg-black dark:hover:bg-gray-100 transition-all flex items-center gap-2 mx-auto"
        >
          Initialize Dashboard
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
};

export default About;