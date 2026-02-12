import React from 'react';
import { Lightbulb } from 'lucide-react';

interface WhyWireProps {
  text: string;
}

const WhyWire: React.FC<WhyWireProps> = ({ text }) => {
  if (!text) return null;

  return (
    <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 rounded-r-lg shadow-sm animate-fade-in transition-colors">
      <div className="flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-yellow-800 dark:text-yellow-200 text-sm uppercase tracking-wide mb-1">
            Why this was hard (The Why-Wire)
          </h4>
          <p className="text-yellow-900 dark:text-yellow-100 text-sm leading-relaxed">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyWire;