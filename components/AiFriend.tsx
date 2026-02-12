import React, { useState, useRef, useEffect, useEffect as useLayoutEffect } from 'react';
import { Send, Mic, StopCircle, Radio, Brain, Sparkles, MessageSquare } from 'lucide-react';
import { chatWithFriend } from '../services/geminiService';
import WhyWire from './WhyWire';
import { AppTheme } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'kai';
  text: string;
}

interface AiFriendProps {
    theme: AppTheme;
}

type AvatarState = 'idle' | 'listening' | 'thinking' | 'speaking';

const AiFriend: React.FC<AiFriendProps> = ({ theme }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', sender: 'kai', text: "I'm online. How can I help you focus today?" }
  ]);
  const [input, setInput] = useState('');
  const [avatarState, setAvatarState] = useState<AvatarState>('idle');
  const [whyWire, setWhyWire] = useState<string>('');
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis>(window.speechSynthesis);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, whyWire]);

  // Speech Setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => setAvatarState('listening');
      recognition.onend = () => { if (avatarState === 'listening') setAvatarState('idle'); };
      recognition.onerror = () => setAvatarState('idle');
      recognition.onresult = (event: any) => {
        const t = Array.from(event.results).map((r: any) => r[0].transcript).join('');
        setInput(t);
        if (event.results[0].isFinal) handleSend(null, t);
      };
      recognitionRef.current = recognition;
    }
  }, [avatarState]);

  const speak = (text: string) => {
    if (synthRef.current.speaking) synthRef.current.cancel();
    const cleanText = text.replace(/[*_#`]/g, '').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.onstart = () => setAvatarState('speaking');
    utterance.onend = () => setAvatarState('idle');
    synthRef.current.speak(utterance);
  };

  const toggleListening = () => {
    if (avatarState === 'listening') recognitionRef.current?.stop();
    else recognitionRef.current?.start();
  };

  const handleSend = async (e: React.FormEvent | null, textOverride?: string) => {
    if (e) e.preventDefault();
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setAvatarState('thinking');

    try {
      const response = await chatWithFriend(messages, userMsg.text);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'kai', text: response.content }]);
      setWhyWire(response.whyWire);
      speak(response.content);
    } catch (error) {
      setAvatarState('idle');
    }
  };

  // --- AVATARS ---

  // 1. Vapor (Gen Z) - Soft Holographic Sphere
  const AvatarVapor = () => (
    <div className="relative w-48 h-48 flex items-center justify-center">
       <div className={`absolute inset-0 bg-gradient-to-tr from-indigo-300 to-purple-300 rounded-full blur-xl opacity-50 animate-pulse-slow`}></div>
       <div className={`relative w-32 h-32 rounded-full bg-gradient-to-br from-white/80 to-indigo-100/50 backdrop-blur-md border border-white/50 shadow-xl flex items-center justify-center transition-all duration-300
          ${avatarState === 'speaking' ? 'scale-110' : 'scale-100'}
       `}>
          {avatarState === 'idle' && <div className="w-16 h-1 bg-indigo-300/50 rounded-full"></div>}
          {avatarState === 'listening' && <div className="w-4 h-4 bg-red-400 rounded-full animate-ping"></div>}
          {avatarState === 'thinking' && <Sparkles className="w-8 h-8 text-indigo-400 animate-spin-slow" />}
          {avatarState === 'speaking' && <div className="w-16 h-16 border-4 border-indigo-300 rounded-full animate-[ping_2s_infinite]"></div>}
       </div>
    </div>
  );

  // 2. Neon (Gen Z) - Cyberpunk Glitch Face
  const AvatarNeon = () => (
    <div className="relative w-40 h-40 border border-slate-700 bg-slate-900 flex items-center justify-center overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
        
        {avatarState === 'idle' && <div className="text-cyan-500 font-mono text-4xl animate-pulse">^_^</div>}
        {avatarState === 'listening' && <div className="w-full h-1 bg-red-500 animate-[pulse_0.1s_infinite]"></div>}
        {avatarState === 'thinking' && <div className="text-xs font-mono text-yellow-400 animate-pulse">PROCESSING...</div>}
        {avatarState === 'speaking' && (
             <div className="flex gap-1 h-8 items-end">
                 {[1,2,3,4].map(i => <div key={i} className="w-2 bg-cyan-400 animate-[bounce_0.2s_infinite]" style={{height: `${Math.random() * 100}%`}}></div>)}
             </div>
        )}
    </div>
  );

  // 3. Swiss (Pro) - Geometric Primitives
  const AvatarSwiss = () => (
    <div className="flex gap-2">
        <div className={`w-12 h-12 bg-red-600 transition-all duration-300 ${avatarState === 'thinking' ? 'animate-spin' : ''}`}></div>
        <div className={`w-12 h-12 bg-black rounded-full transition-all duration-300 ${avatarState === 'speaking' ? 'scale-y-150' : ''}`}></div>
        <div className={`w-0 h-0 border-l-[24px] border-l-transparent border-r-[24px] border-r-transparent border-b-[48px] border-b-black transition-all duration-300 ${avatarState === 'listening' ? 'border-b-red-600 translate-y-[-10px]' : ''}`}></div>
    </div>
  );

  // 4. Executive (Pro) - Minimal Line Art
  const AvatarExecutive = () => (
    <div className="relative w-48 h-48 border border-stone-300 rounded-full flex items-center justify-center bg-[#F9F8F6]">
        <div className={`absolute inset-2 border border-stone-200 rounded-full ${avatarState === 'thinking' ? 'animate-spin-slow border-t-stone-800' : ''}`}></div>
        <div className="flex flex-col items-center gap-2 z-10">
            {avatarState === 'idle' && <div className="w-12 h-[2px] bg-stone-800"></div>}
            {avatarState === 'listening' && <div className="w-3 h-3 bg-stone-800 rounded-full animate-pulse"></div>}
            {avatarState === 'thinking' && <Brain className="w-8 h-8 text-stone-600 animate-pulse" />}
            {avatarState === 'speaking' && <div className="w-12 h-12 border border-stone-800 rounded-full animate-ping opacity-20"></div>}
        </div>
    </div>
  );

  const renderAvatar = () => {
    switch(theme) {
        case 'neon': return <AvatarNeon />;
        case 'swiss': return <AvatarSwiss />;
        case 'executive': return <AvatarExecutive />;
        default: return <AvatarVapor />;
    }
  };

  // --- STYLES ---
  const getContainerStyles = () => {
      if (theme === 'neon') return 'bg-slate-950 border border-slate-800 rounded-lg';
      if (theme === 'swiss') return 'bg-white border-2 border-black rounded-none';
      if (theme === 'executive') return 'bg-[#F2F0E9] border border-stone-300 rounded-sm shadow-xl';
      return 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 rounded-[2.5rem] shadow-2xl'; // Vapor
  };

  const getBubbleStyles = (isUser: boolean) => {
      if (theme === 'neon') return isUser ? 'bg-cyan-900 text-cyan-100 border border-cyan-700' : 'text-slate-300 border border-slate-800';
      if (theme === 'swiss') return isUser ? 'bg-black text-white rounded-none font-bold' : 'bg-gray-100 text-black rounded-none font-medium';
      if (theme === 'executive') return isUser ? 'bg-stone-800 text-stone-100 rounded-none' : 'bg-white border border-stone-200 text-stone-800 rounded-none italic';
      return isUser ? 'bg-indigo-500 text-white rounded-2xl rounded-br-none shadow-lg shadow-indigo-500/20' : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 rounded-2xl rounded-bl-none shadow-sm';
  };

  return (
    <div className={`h-[80vh] flex flex-col relative overflow-hidden ${getContainerStyles()}`}>
      
      {/* 1. TOP SECTION: AVATAR (Flexible Height) */}
      <div className="flex-grow flex flex-col items-center justify-center relative p-6">
         {renderAvatar()}
         
         <div className="mt-8 text-xs font-bold uppercase tracking-widest opacity-40 flex items-center gap-2">
            {avatarState === 'listening' ? <span className="text-red-500 flex items-center gap-2"><Radio className="w-3 h-3 animate-pulse"/> Listening</span> :
             avatarState === 'thinking' ? <span className="text-yellow-500 flex items-center gap-2"><Brain className="w-3 h-3 animate-bounce"/> Thinking</span> :
             avatarState === 'speaking' ? <span className="text-blue-500">Speaking</span> :
             "Ready"}
         </div>
      </div>

      {/* 2. BOTTOM SECTION: CHAT & INPUT (Fixed-ish height, sits at bottom) */}
      <div className={`flex-shrink-0 flex flex-col z-20 w-full max-h-[50%] 
          ${theme === 'neon' ? 'bg-slate-900 border-t border-slate-800' : 
            theme === 'swiss' ? 'bg-white border-t-2 border-black' :
            theme === 'executive' ? 'bg-[#EBE9E1] border-t border-stone-300' :
            'bg-white/60 dark:bg-black/40 backdrop-blur-xl border-t border-white/20'}
      `}>
          
          {/* Scrollable Messages Area */}
          <div className="overflow-y-auto px-4 py-4 space-y-3 flex-grow">
             {messages.length > 1 && messages.slice(1).map(m => (
                 <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                     <div className={`px-4 py-2 max-w-[85%] text-sm ${getBubbleStyles(m.sender === 'user')}`}>
                         {m.text}
                     </div>
                 </div>
             ))}
             {/* WhyWire Insert */}
             <WhyWire text={whyWire} />
             <div ref={messagesEndRef} />
          </div>

          {/* Input Bar - Always pinned to bottom */}
          <form onSubmit={(e) => handleSend(e)} className="p-3 flex items-center gap-2 border-t border-transparent">
             <button
                type="button"
                onClick={toggleListening}
                className={`p-3 rounded-full transition-all flex-shrink-0 
                    ${avatarState === 'listening' ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 dark:bg-slate-800 text-gray-500'}
                    ${theme === 'swiss' ? 'rounded-none border-2 border-black' : ''}
                `}
             >
                {avatarState === 'listening' ? <StopCircle className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
             </button>

             <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message Kai..."
                className={`flex-grow p-3 bg-transparent focus:outline-none text-sm
                    ${theme === 'neon' ? 'text-cyan-400 placeholder-cyan-900 font-mono' : 'text-gray-900 dark:text-white'}
                `}
             />

             <button 
                type="submit" 
                disabled={!input.trim()} 
                className={`p-3 rounded-full transition-transform active:scale-95 disabled:opacity-50
                    ${theme === 'vapor' ? 'bg-indigo-500 text-white shadow-lg' : 
                      theme === 'neon' ? 'text-cyan-400 hover:bg-cyan-900/20' :
                      theme === 'swiss' ? 'bg-black text-white rounded-none' :
                      theme === 'executive' ? 'text-stone-800 hover:bg-stone-200' : 'bg-gray-200'}
                `}
             >
                <Send className="w-5 h-5" />
             </button>
          </form>

      </div>

    </div>
  );
};

export default AiFriend;