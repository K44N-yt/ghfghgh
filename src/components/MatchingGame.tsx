import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface MatchingGameProps {
  pairs: { left: string; right: string }[];
  onComplete: () => void;
}

export function MatchingGame({ pairs, onComplete }: MatchingGameProps) {
  const [leftItems, setLeftItems] = useState<{ id: string; text: string }[]>([]);
  const [rightItems, setRightItems] = useState<{ id: string; text: string }[]>([]);
  
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [errorPair, setErrorPair] = useState<{ left: string; right: string } | null>(null);

  // Shuffle arrays on mount
  useEffect(() => {
    const shuffledLeft = [...pairs].sort(() => Math.random() - 0.5).map(p => ({ id: p.left, text: p.left }));
    const shuffledRight = [...pairs].sort(() => Math.random() - 0.5).map(p => ({ id: p.right, text: p.right }));
    
    setLeftItems(shuffledLeft);
    setRightItems(shuffledRight);
  }, [pairs]);

  // Check for match when both selected
  useEffect(() => {
    if (selectedLeft && selectedRight) {
      const isMatch = pairs.find(p => p.left === selectedLeft && p.right === selectedRight);
      
      if (isMatch) {
        // Match success
        setMatchedPairs(prev => [...prev, selectedLeft]);
        setSelectedLeft(null);
        setSelectedRight(null);
      } else {
        // Match failed
        setErrorPair({ left: selectedLeft, right: selectedRight });
        
        // Reset selection after delay
        setTimeout(() => {
          setErrorPair(null);
          setSelectedLeft(null);
          setSelectedRight(null);
        }, 1000);
      }
    }
  }, [selectedLeft, selectedRight, pairs]);

  // Check for completion
  useEffect(() => {
    if (matchedPairs.length === pairs.length && pairs.length > 0) {
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  }, [matchedPairs, pairs, onComplete]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Kavramları Eşleştir</h3>
      </div>
      
      <p className="text-slate-400 mb-8 text-sm">
        Soldaki kavramı seçip sağdaki doğru açıklamasıyla eşleştir.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-3">
          {leftItems.map((item) => {
            const isMatched = matchedPairs.includes(item.id);
            const isSelected = selectedLeft === item.id;
            const isError = errorPair?.left === item.id;
            
            let btnClass = "w-full text-left p-4 rounded-xl border transition-all ";
            if (isMatched) {
              btnClass += "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 opacity-50 cursor-default";
            } else if (isError) {
              btnClass += "border-red-500 bg-red-500/20 text-red-400 animate-shake";
            } else if (isSelected) {
              btnClass += "border-cyan-500 bg-cyan-500/20 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]";
            } else {
              btnClass += "border-slate-700 bg-slate-800/50 hover:bg-slate-700 hover:border-slate-600 text-slate-200 cursor-pointer";
            }

            return (
              <motion.button
                key={`left-${item.id}`}
                layout
                disabled={isMatched || !!errorPair}
                onClick={() => setSelectedLeft(isSelected ? null : item.id)}
                className={btnClass}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.text}</span>
                  {isMatched && <CheckCircle2 className="w-5 h-5" />}
                  {isError && <XCircle className="w-5 h-5" />}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          {rightItems.map((item) => {
            // Find if this right item's corresponding left item is matched
            const originalPair = pairs.find(p => p.right === item.id);
            const isMatched = originalPair ? matchedPairs.includes(originalPair.left) : false;
            const isSelected = selectedRight === item.id;
            const isError = errorPair?.right === item.id;
            
            let btnClass = "w-full text-left p-4 rounded-xl border transition-all text-sm ";
            if (isMatched) {
              btnClass += "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 opacity-50 cursor-default";
            } else if (isError) {
              btnClass += "border-red-500 bg-red-500/20 text-red-400 animate-shake";
            } else if (isSelected) {
              btnClass += "border-cyan-500 bg-cyan-500/20 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]";
            } else {
              btnClass += "border-slate-700 bg-slate-800/50 hover:bg-slate-700 hover:border-slate-600 text-slate-300 cursor-pointer";
            }

            return (
              <motion.button
                key={`right-${item.id}`}
                layout
                disabled={isMatched || !!errorPair}
                onClick={() => setSelectedRight(isSelected ? null : item.id)}
                className={btnClass}
              >
                <div className="flex items-center justify-between">
                  <span className="leading-relaxed">{item.text}</span>
                  {isMatched && <CheckCircle2 className="w-5 h-5 shrink-0 ml-2" />}
                  {isError && <XCircle className="w-5 h-5 shrink-0 ml-2" />}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {matchedPairs.length === pairs.length && pairs.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 p-6 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-center"
        >
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
          <h4 className="text-xl font-bold text-white mb-2">Tebrikler!</h4>
          <p className="text-emerald-300">Tüm eşleştirmeleri başarıyla tamamladın.</p>
        </motion.div>
      )}
    </div>
  );
}
