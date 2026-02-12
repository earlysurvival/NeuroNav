import React, { useState } from 'react';
import { Task, AppTheme } from '../types';
import { CalendarDays, CheckCircle2, Circle, Trash2, Plus, AlertCircle, TrendingUp } from 'lucide-react';
import WhyWire from './WhyWire';

interface SmartTaskBoardProps {
  tasks: Task[];
  userName: string;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onAddTask: (task: Task) => void;
  theme: AppTheme;
}

const SmartTaskBoard: React.FC<SmartTaskBoardProps> = ({ tasks, userName, onToggleTask, onDeleteTask, onAddTask, theme }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  
  const pendingTasks = tasks.filter(t => !t.completed);
  const isOverwhelmed = pendingTasks.length > 5;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    onAddTask({
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
      priority: 'Medium',
      date: new Date().toISOString().split('T')[0]
    });
    setNewTaskTitle('');
  };

  const getThemeStyles = () => {
     if (theme === 'swiss') return 'bg-white border-4 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]';
     if (theme === 'neon') return 'bg-slate-900 border border-cyan-800 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.1)]';
     if (theme === 'executive') return 'bg-[#F9F8F6] border border-stone-300 rounded-sm shadow-sm';
     return 'bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl border border-indigo-100 dark:border-white/5'; // Vapor
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fade-in pb-20">
      
      <div className="flex items-center justify-between">
        <div className="space-y-2">
           <h2 className="text-5xl font-black tracking-tighter flex items-center gap-4 italic italic">
              <CalendarDays className={`w-12 h-12 ${theme === 'neon' ? 'text-cyan-400' : 'text-indigo-600'}`} />
              The Mission
           </h2>
           <p className="text-gray-500 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
               <TrendingUp className="w-4 h-4" /> Cognitive Load: {pendingTasks.length}/5 Optimized
           </p>
        </div>
      </div>

      {isOverwhelmed && (
          <div className="p-8 bg-orange-50 dark:bg-orange-950/20 border-l-8 border-orange-500 rounded-r-[2rem] animate-pulse-slow">
              <div className="flex items-start gap-5">
                  <AlertCircle className="w-10 h-10 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                  <div>
                      <h4 className="text-xl font-black text-orange-800 dark:text-orange-200 uppercase tracking-tighter mb-2">Cognitive Overload Protection</h4>
                      <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                          Pilot, your Working Memory is reaching its buffer limit. ADHD brains shut down when faced with too many "Open Loops". 
                          <br/><br/>
                          <strong>Protocol:</strong> Delete 2 non-essential tasks or move them to the "Someday" dump.
                      </p>
                  </div>
              </div>
          </div>
      )}

      <form onSubmit={handleAdd} className="relative group">
          <input 
             type="text" 
             value={newTaskTitle}
             onChange={e => setNewTaskTitle(e.target.value)}
             placeholder="What is the next micro-step?"
             className={`w-full p-8 pr-24 focus:outline-none text-2xl font-black tracking-tighter transition-all
                ${theme === 'swiss' ? 'border-4 border-black bg-white rounded-none uppercase' : 
                  theme === 'neon' ? 'bg-slate-900 border-b-2 border-cyan-800 text-cyan-300 placeholder-cyan-900' :
                  theme === 'executive' ? 'bg-transparent border-b border-stone-400 text-stone-800 italic font-serif' :
                  'bg-white dark:bg-white/5 rounded-3xl shadow-2xl border border-white dark:border-white/5 placeholder-gray-400'}
             `}
          />
          <button 
             type="submit"
             disabled={!newTaskTitle.trim()}
             className={`absolute right-4 top-4 p-4 rounded-2xl transition-all shadow-xl
                 ${!newTaskTitle.trim() ? 'opacity-20 grayscale' : 'bg-indigo-600 text-white hover:scale-105 active:scale-95'}
             `}
          >
              <Plus className="w-8 h-8" />
          </button>
      </form>

      <div className="space-y-4">
          {tasks.length === 0 && (
              <div className="text-center py-24 opacity-30">
                  <div className="text-8xl mb-6">🍃</div>
                  <p className="text-2xl font-black uppercase tracking-widest">Mental Space Optimized</p>
              </div>
          )}
          
          {tasks.map((task, idx) => (
              <div 
                  key={task.id} 
                  className={`flex items-center gap-6 p-8 transition-all group animate-slide-up
                      ${getThemeStyles()}
                      ${task.completed ? 'opacity-30 grayscale blur-[1px]' : 'opacity-100'}
                  `}
                  style={{animationDelay: `${idx * 0.05}s`}}
              >
                  <button onClick={() => onToggleTask(task.id)} className="flex-shrink-0 transition-transform active:scale-75">
                      {task.completed ? 
                          <CheckCircle2 className={`w-10 h-10 ${theme === 'neon' ? 'text-green-400' : 'text-green-500'}`} /> : 
                          <Circle className={`w-10 h-10 ${theme === 'neon' ? 'text-cyan-800' : 'text-gray-300 dark:text-white/10'}`} />
                      }
                  </button>
                  
                  <div className="flex-grow">
                      <h4 className={`text-2xl font-black tracking-tighter ${task.completed ? 'line-through opacity-50' : ''}`}>
                          {task.title}
                      </h4>
                      {task.priority === 'High' && !task.completed && (
                          <span className="text-[10px] bg-red-600 text-white px-3 py-1 rounded-full font-black uppercase tracking-widest mt-2 inline-block">
                              Critical Priority
                          </span>
                      )}
                  </div>

                  <button 
                      onClick={() => onDeleteTask(task.id)}
                      className="opacity-0 group-hover:opacity-100 p-3 text-gray-400 hover:text-red-500 transition-all hover:scale-125"
                  >
                      <Trash2 className="w-6 h-6" />
                  </button>
              </div>
          ))}
      </div>
      
      <WhyWire text="Tasks that remain in your head consume metabolic energy. By writing them down, you perform a 'Context Store', allowing your brain to enter 'Execution State' without the background noise of remembering." />

    </div>
  );
};

export default SmartTaskBoard;