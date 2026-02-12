import React, { useState } from 'react';
import { DollarSign, Clock, AlertTriangle, ArrowRight, Loader2 } from 'lucide-react';
import { calculateImpulseCost } from '../services/geminiService';
import WhyWire from './WhyWire';
import { HOURLY_RATE } from '../constants';

const ImpulseGuard: React.FC = () => {
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item || !price) return;
    
    setIsLoading(true);
    try {
      const data = await calculateImpulseCost(item, parseFloat(price));
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Impulse Purchase Guard</h2>
        <p className="text-gray-600 dark:text-gray-400">Translate dollars into hours of your life.</p>
      </div>

      <form onSubmit={handleCalculate} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md space-y-4 border border-gray-100 dark:border-slate-700">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">What do you want to buy?</label>
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="e.g. Neon Light Up Keyboard"
            className="w-full p-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none placeholder-gray-400 dark:placeholder-gray-600"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price ($)</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              className="w-full pl-10 p-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none placeholder-gray-400 dark:placeholder-gray-600"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : 'Calculate "Life Cost"'}
        </button>
      </form>

      {result && (
        <div className="animate-fade-in space-y-6">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 border-l-4 border-red-500 p-6 rounded-r-lg shadow-sm">
             <div className="flex items-center gap-4 mb-4">
                <div className="bg-red-200 dark:bg-red-900/50 p-3 rounded-full">
                    <Clock className="w-8 h-8 text-red-700 dark:text-red-400" />
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
                        {result.data?.hoursCost?.toFixed(1)} Hours
                    </h3>
                    <p className="text-red-700 dark:text-red-300 font-medium">of actual work time</p>
                </div>
             </div>
             <p className="text-gray-700 dark:text-gray-200 italic border-t border-red-200 dark:border-red-800 pt-4">
                "{result.content}"
             </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 text-center space-y-4">
             <h4 className="font-bold text-gray-800 dark:text-gray-200 flex items-center justify-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                The 24-Hour Rule
             </h4>
             <p className="text-gray-600 dark:text-gray-400">
                {result.data?.waitMessage || "Wait 24 hours. If you still want it (and remember it) tomorrow, then consider it."}
             </p>
             <button className="text-sm text-red-500 dark:text-red-400 font-medium hover:underline">
                Add to "Later" List
             </button>
          </div>

          <WhyWire text={result.whyWire} />
        </div>
      )}
    </div>
  );
};

export default ImpulseGuard;