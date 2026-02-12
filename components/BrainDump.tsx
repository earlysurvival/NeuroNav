import React, { useState } from 'react';
import { Brain, Sparkles, Loader2, ArrowRight, CalendarPlus } from 'lucide-react';
import { processBrainDump } from '../services/geminiService';
import WhyWire from './WhyWire';
import { BrainDumpTask, Task } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface BrainDumpProps {
    onAddTasks: (tasks: Task[]) => void;
    userName: string;
}

const BrainDump: React.FC<BrainDumpProps> = ({ onAddTasks, userName }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleDump = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    try {
      const data = await processBrainDump(input);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransferToCalendar = () => {
      if (!result?.data?.tasks) return;
      const newTasks: Task[] = result.data.tasks.map((t: BrainDumpTask) => ({
          id: Date.now().toString() + Math.random(),
          title: t.task,
          completed: false,
          priority: t.priority,
          date: new Date().toISOString().split('T')[0]
      }));
      
      const confirmMsg = `Hey ${userName}, I found ${newTasks.length} actionable tasks. Add them to your Smart Plan?`;
      if (window.confirm(confirmMsg)) {
          onAddTasks(newTasks);
          alert("Tasks added to your plan!");
      }
  };

  const getPriorityColor = (p: string) => {
    switch (p.toLowerCase()) {
      case 'high': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      case 'low': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800';
      default: return 'bg-gray-100 dark:bg-gray-700';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">The Brain Dump</h2>
        <p className="text-gray-600 dark:text-gray-400">Type everything buzzing in your head. I'll sort it out.</p>
      </div>

      <div className="relative group">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="I need to call mom, buy eggs, finish that report, fix the sink..."
          className="w-full h-40 p-4 border border-purple-200 dark:border-purple-800/50 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none resize-none shadow-sm dark:shadow-none transition-colors"
        />
        <button
          onClick={handleDump}
          disabled={isLoading || !input.trim()}
          className="absolute bottom-4 right-4 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg disabled:opacity-50 transition transform group-hover:scale-105"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles />}
        </button>
      </div>

      {result && result.data && (
        <div className="animate-fade-in space-y-8">
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                 <h3 className="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    Structured Plan
                 </h3>
                 <button 
                    onClick={handleTransferToCalendar}
                    className="flex items-center gap-2 text-xs font-bold bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 transition"
                 >
                    <CalendarPlus className="w-4 h-4" /> Add to Plan
                 </button>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-purple-50 dark:bg-purple-900/20 text-purple-900 dark:text-purple-200 text-xs uppercase font-semibold">
                    <tr>
                      <th className="p-4">Task</th>
                      <th className="p-4">Priority</th>
                      <th className="p-4">Est. Time</th>
                      <th className="p-4 text-center">Dopamine</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                    {(result.data.tasks || []).map((task: BrainDumpTask, idx: number) => (
                      <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition">
                        <td className="p-4 font-medium text-gray-800 dark:text-gray-200">{task.task}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </td>
                        <td className="p-4 text-gray-500 dark:text-gray-400 text-sm">{task.timeEstimate}</td>
                        <td className="p-4 flex justify-center">
                           <div className="flex items-center gap-1">
                             <span className="font-bold text-purple-600 dark:text-purple-400">{task.dopamine}</span>
                             <span className="text-gray-300 dark:text-gray-600">/10</span>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 flex flex-col">
               <h3 className="font-bold text-gray-700 dark:text-gray-300 mb-4 text-sm uppercase tracking-wide">Dopamine Map</h3>
               <div className="flex-grow min-h-[200px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={result.data.tasks} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <XAxis type="number" domain={[0, 10]} hide />
                      <YAxis dataKey="task" type="category" width={80} tick={{fontSize: 10, fill: '#94a3b8'}} interval={0} />
                      <Tooltip 
                        cursor={{fill: 'transparent'}}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#1e293b', color: '#f8fafc' }}
                      />
                      <Bar dataKey="dopamine" radius={[0, 4, 4, 0]} barSize={20}>
                        {
                          (result.data.tasks || []).map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={entry.dopamine > 7 ? '#9333ea' : '#c084fc'} />
                          ))
                        }
                      </Bar>
                    </BarChart>
                 </ResponsiveContainer>
               </div>
               <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">Higher bars = More Satisfaction</p>
            </div>
          </div>

          <WhyWire text={result.whyWire} />
          
          <div className="flex justify-end">
            <button 
                onClick={() => setInput('')}
                className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-800 dark:hover:text-purple-300 text-sm flex items-center gap-1"
            >
                Start New Dump <ArrowRight className="w-4 h-4"/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrainDump;