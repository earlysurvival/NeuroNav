import React, { useState } from 'react';
import { Task } from '../types';
import { Plus, CheckCircle2, Circle, Trash2, Zap, Target, Star, AlertCircle, Heart } from 'lucide-react';
import SuccessBlueprint from './SuccessBlueprint';

const SmartPlanner: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');
  const [activeFactor, setActiveFactor] = useState<Task['priorityFactor']>('Interest');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: input,
      completed: false,
      priorityFactor: activeFactor,
      estimatedTime: '15m'
    };
    setTasks([newTask, ...tasks]);
    setInput('');
  };

  const factorIcons = {
    Interest: <Zap className="w-4 h-4" />,
    Novelty: <Star className="w-4 h-4" />,
    Challenge: <Target className="w-4 h-4" />,
    Urgency: <AlertCircle className="w-4 h-4" />,
    Passion: <Heart className="w-4 h-4" />
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-slide-up">
      <div className="flex justify-between items-end mb-12">
        <div className="space-y-1">
          <h2 className="text-4xl font-black italic tracking-tighter uppercase italic">The Success Diary</h2>
          <p className="text-white/40 text-sm font-mono tracking-widest">INCUP_PRIORITY_ENGINE_V2.0</p>
        </div>
        <div className="text-right">
           <span className="text-3xl font-black text-indigo-500">{tasks.filter(t=>!t.completed).length}</span>
           <p className="text-[10px] uppercase tracking-widest text-white/30">Active Anchors</p>
        </div>
      </div>

      <form onSubmit={addTask} className="mb-12 space-y-4">
        <div className="flex gap-2 p-1 glass rounded-2xl overflow-x-auto no-scrollbar">
          {(Object.keys(factorIcons) as Array<keyof typeof factorIcons>).map((factor) => (
            <button
              key={factor}
              type="button"
              onClick={() => setActiveFactor(factor)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeFactor === factor ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-white/40 hover:bg-white/5'}`}
            >
              {factorIcons[factor]} {factor}
            </button>
          ))}
        </div>
        <div className="relative group">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What is the One Big Win for right now?"
            className="w-full bg-white/5 border border-white/5 focus:border-indigo-500/50 outline-none p-8 rounded-[2rem] text-xl font-medium tracking-tight transition-all placeholder:text-white/10"
          />
          <button type="submit" className="absolute right-4 top-4 bottom-4 px-8 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-50 transition-all">
            Anchor
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className={`group flex items-center gap-6 p-8 glass rounded-[2.5rem] transition-all hover:-translate-y-1 ${task.completed ? 'opacity-20 grayscale scale-[0.98]' : ''}`}>
            <button onClick={() => setTasks(tasks.map(t => t.id === task.id ? {...t, completed: !t.completed} : t))} className="text-indigo-400">
              {task.completed ? <CheckCircle2 className="w-10 h-10" /> : <Circle className="w-10 h-10" />}
            </button>
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-indigo-400/60 flex items-center gap-1">
                  {factorIcons[task.priorityFactor]} {task.priorityFactor}
                </span>
              </div>
              <h4 className="text-2xl font-bold tracking-tight">{task.title}</h4>
            </div>
            <button onClick={() => setTasks(tasks.filter(t => t.id !== task.id))} className="opacity-0 group-hover:opacity-100 p-2 text-white/20 hover:text-rose-500 transition-all">
              <Trash2 className="w-6 h-6" />
            </button>
          </div>
        ))}
      </div>

      <SuccessBlueprint 
        biology="ADHD brains are interest-driven, not importance-driven. Traditional to-do lists fail because they lack novelty or personal resonance."
        strategy="The INCUP Framework bypasses executive dysfunction by identifying which 'emotional fuel' is currently available to power a task."
      />
    </div>
  );
};

export default SmartPlanner;