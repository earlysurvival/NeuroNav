import React, { useState } from 'react';
import { Task, AppTheme } from '../types';
import { CalendarDays, CheckCircle2, Circle, Trash2, Plus, AlertCircle } from 'lucide-react';
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
     if (theme === 'swiss') return 'bg-white border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]';
     if (theme === 'neon') return 'bg-slate-900 border border-cyan-800 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.1)]';
     if (theme === 'executive') return 'bg-[#F9F8F6] border border-stone-300 rounded-sm';
     return 'bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-indigo-100 dark:border-slate-700'; // Vapor
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in p-4">
      
      <div className="flex items-center justify-between mb-8">
        <div>
           <h2 className="text-3xl font-bold flex items-center gap-3">
              <CalendarDays className={`w-8 h-8 ${theme === 'neon' ? 'text-cyan-400' : 'text-indigo-600'}`} />
              <span className={theme === 'neon' ? 'text-white' : 'text-gray-900 dark:text-white'}>
                  Smart Plan
              </span>
           </h2>
           <p className="opacity-60 mt-1">
               Hey {userName}, you have {pendingTasks.length} active tasks.
           </p>
        </div>
      </div>

      {/* Overwhelm Intervention */}
      {isOverwhelmed && (
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 rounded-r-lg animate-pulse-slow">
              <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                  <div>
                      <h4 className="font-bold text-orange-800 dark:text-orange-200">Overwhelm Detected</h4>
                      <p className="text-sm text-orange-700 dark:text-orange-300">
                          Your cognitive load is exceeding capacity ({pendingTasks.length} tasks). 
                          ADHD brains freeze when the list gets too long. 
                          <br/>
                          <strong>Suggestion:</strong> Delete 2 tasks that don't truly matter today, or move them to a "Someday" list.
                      </p>
                  </div>
              </div>
          </div>
      )}

      {/* Input */}
      <form onSubmit={handleAdd} className="relative">
          <input 
             type="text" 
             value={newTaskTitle}
             onChange={e => setNewTaskTitle(e.target.value)}
             placeholder="Add a new mission..."
             className={`w-full p-4 pr-16 focus:outline-none text-lg transition-all
                ${theme === 'swiss' ? 'border-2 border-black bg-white rounded-none placeholder-gray-500' : 
                  theme === 'neon' ? 'bg-slate-900 border-b-2 border-cyan-800 text-cyan-300 placeholder-cyan-800 rounded-t-lg' :
                  theme === 'executive' ? 'bg-transparent border-b border-stone-400 text-stone-800 rounded-none placeholder-stone-400 italic' :
                  'bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 placeholder-gray-400'}
             `}
          />
          <button 
             type="submit"
             disabled={!newTaskTitle.trim()}
             className={`absolute right-2 top-2 p-2 rounded-lg transition-colors
                 ${!newTaskTitle.trim() ? 'opacity-30' : 'opacity-100 hover:bg-gray-100 dark:hover:bg-slate-700'}
             `}
          >
              <Plus className="w-6 h-6" />
          </button>
      </form>

      {/* Task List */}
      <div className="space-y-3">
          {tasks.length === 0 && (
              <div className="text-center py-12 opacity-40">
                  <div className="text-6xl mb-4">🍃</div>
                  <p>No tasks yet. Enjoy the quiet.</p>
              </div>
          )}
          
          {tasks.map(task => (
              <div 
                  key={task.id} 
                  className={`flex items-center gap-4 p-4 transition-all group
                      ${getThemeStyles()}
                      ${task.completed ? 'opacity-50 grayscale' : 'opacity-100'}
                  `}
              >
                  <button onClick={() => onToggleTask(task.id)} className="flex-shrink-0">
                      {task.completed ? 
                          <CheckCircle2 className={`w-6 h-6 ${theme === 'neon' ? 'text-green-400' : 'text-green-500'}`} /> : 
                          <Circle className={`w-6 h-6 ${theme === 'neon' ? 'text-cyan-800' : 'text-gray-300'}`} />
                      }
                  </button>
                  
                  <div className="flex-grow">
                      <h4 className={`text-lg font-medium ${task.completed ? 'line-through' : ''}`}>
                          {task.title}
                      </h4>
                      {task.priority === 'High' && !task.completed && (
                          <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full font-bold">
                              High Priority
                          </span>
                      )}
                  </div>

                  <button 
                      onClick={() => onDeleteTask(task.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition-opacity"
                  >
                      <Trash2 className="w-5 h-5" />
                  </button>
              </div>
          ))}
      </div>
      
      <WhyWire text="Writing tasks down closes 'open loops' in your brain, reducing background anxiety and freeing up Working Memory for the task at hand." />

    </div>
  );
};

export default SmartTaskBoard;