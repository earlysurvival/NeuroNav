
import React, { useState } from 'react';
import { Camera, Upload, CheckCircle2, Circle, Loader2, RefreshCw } from 'lucide-react';
import { analyzeImageForBreakdown } from '../services/geminiService';
import WhyWire from './WhyWire';
import { MicroAction } from '../types';

const TaskBreakdown: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [actions, setActions] = useState<MicroAction[]>([]);
  const [whyWireText, setWhyWireText] = useState<string>('');
  const [introText, setIntroText] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setSelectedImage(base64);
        processImage(base64, file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (base64Full: string, mimeType: string) => {
    setIsLoading(true);
    // Strip prefix for API
    const base64Data = base64Full.split(',')[1];
    
    try {
      const result = await analyzeImageForBreakdown(base64Data, mimeType);
      setIntroText(result.content);
      setWhyWireText(result.whyWire);
      // Fixed: result.actions directly contains the micro-actions array
      if (result.actions) {
        setActions(result.actions);
      }
    } catch (error) {
      console.error(error);
      setIntroText("Oops! My neuro-circuits got crossed. Try uploading again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAction = (id: string) => {
    setActions(prev => prev.map(a => a.id === id ? { ...a, isCompleted: !a.isCompleted } : a));
  };

  const reset = () => {
    setSelectedImage(null);
    setActions([]);
    setWhyWireText('');
    setIntroText('');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Visual De-Overwhelm</h2>
        <p className="text-gray-600 dark:text-gray-400">Snap a photo of the mess or document. I'll give you 3 tiny steps.</p>
      </div>

      {!selectedImage ? (
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-10 flex flex-col items-center justify-center bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-750 transition-colors cursor-pointer relative group">
           <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
            <Camera className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="font-semibold text-gray-700 dark:text-gray-200">Tap to Upload or Take Photo</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Supports JPG, PNG, WEBP</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative rounded-xl overflow-hidden shadow-md max-h-64 mx-auto w-full max-w-md">
            <img src={selectedImage} alt="Task context" className="w-full h-full object-cover" />
            <button 
              onClick={reset}
              className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="w-10 h-10 text-blue-600 dark:text-blue-400 animate-spin" />
              <p className="text-blue-600 dark:text-blue-400 font-medium animate-pulse">Analyzing visual chaos...</p>
            </div>
          ) : (
            <div className="animate-fade-in-up space-y-6">
              {introText && (
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700">
                  <p className="text-gray-800 dark:text-gray-200">{introText}</p>
                </div>
              )}

              <div className="space-y-3">
                <h3 className="font-bold text-gray-700 dark:text-gray-400 uppercase tracking-wider text-xs ml-1">Micro-Actions</h3>
                {actions.map((action) => (
                  <div 
                    key={action.id}
                    onClick={() => toggleAction(action.id)}
                    className={`
                      flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all
                      ${action.isCompleted 
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 opacity-60' 
                        : 'bg-white dark:bg-slate-800 border-blue-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 shadow-sm'}
                    `}
                  >
                    {action.isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500 dark:text-green-400 flex-shrink-0" />
                    ) : (
                      <Circle className="w-6 h-6 text-blue-300 dark:text-blue-400 flex-shrink-0" />
                    )}
                    <span className={`text-lg ${action.isCompleted ? 'line-through text-gray-500 dark:text-gray-500' : 'text-gray-800 dark:text-gray-100'}`}>
                      {action.text}
                    </span>
                  </div>
                ))}
              </div>

              <WhyWire text={whyWireText} />
              
              {actions.length > 0 && actions.every(a => a.isCompleted) && (
                 <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg text-center font-bold animate-bounce">
                    🎉 Dopamine Hit! Task Complete!
                 </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskBreakdown;