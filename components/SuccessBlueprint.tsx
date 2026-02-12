import React from 'react';
import { Lightbulb, ShieldCheck } from 'lucide-react';

interface SuccessBlueprintProps {
  biology: string;
  strategy: string;
}

const SuccessBlueprint: React.FC<SuccessBlueprintProps> = ({ biology, strategy }) => {
  if (!biology || !strategy) return null;

  return (
    <div className="mt-12 pt-8 border-t border-white/5 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-px flex-grow bg-white/5"></div>
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black">Success Blueprint</span>
        <div className="h-px flex-grow bg-white/5"></div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <h4 className="text-[10px] uppercase font-black tracking-widest text-indigo-400">Biological Logic</h4>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed italic">{biology}</p>
        </div>
        
        <div className="glass p-6 rounded-2xl border-indigo-500/10">
          <div className="flex items-center gap-3 mb-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <h4 className="text-[10px] uppercase font-black tracking-widest text-amber-400">Executive Strategy</h4>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed font-medium">{strategy}</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessBlueprint;