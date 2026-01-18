import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCw, BookOpen, ThumbsDown, HelpCircle, ThumbsUp } from 'lucide-react';
import { questions as allQuestions } from '../data/questions';

interface StudyCardsProps {
  onExit: () => void;
}

export default function StudyCards({ onExit }: StudyCardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
  
  const questions = allQuestions; 
  const currentCard = questions[currentIndex];

  if (!currentCard) return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading Cards...</div>;

  const handleNext = () => {
    setDirection(1);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % questions.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + questions.length) % questions.length);
  };

  const handleRate = () => {
    handleNext();
  };

  const variants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.8,
      rotateY: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: isFlipped ? 180 : 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        rotateY: { duration: 0.5 },
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.8,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }
    })
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden bg-slate-100 dark:bg-slate-900 transition-colors">
      
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-300/30 dark:bg-emerald-900/20 rounded-full blur-3xl -z-10 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300/30 dark:bg-blue-900/20 rounded-full blur-3xl -z-10 animate-blob animation-delay-2000"></div>

      {/* Header */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-4 md:mb-8 z-10">
        <button 
            onClick={onExit}
            className="flex items-center text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800"
        >
            <ArrowLeft className="mr-2" size={20} /> <span className="font-bold">Exit</span>
        </button>
        <span className="font-mono text-slate-400 dark:text-slate-500 font-bold bg-white dark:bg-slate-800 px-4 py-1 rounded-full shadow-sm">
            CARD {currentIndex + 1} / {questions.length}
        </span>
      </div>

      {/* Card Container */}
      <div className="perspective-1000 w-full max-w-3xl h-[550px] md:h-[600px] relative z-10 flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full h-full preserve-3d cursor-pointer"
                onClick={() => !isFlipped && setIsFlipped(true)}
            >
                {/* --- FRONT (Question) --- */}
                <div 
                    className="absolute w-full h-full backface-hidden bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-700 p-8 md:p-12 flex flex-col justify-between overflow-hidden z-20"
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                    <div className="overflow-y-auto custom-scrollbar flex-1 pr-2">
                        <div className="flex justify-between items-start mb-6">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300`}>
                                Concept
                            </span>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                {currentCard.category}
                            </span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white mb-8 leading-tight tracking-tight whitespace-pre-line">
                            {currentCard.question.split(/(`[^`]+`)/g).map((part, i) => (
                                part.startsWith('`') && part.endsWith('`') 
                                ? <span key={i} className="font-mono bg-slate-100 dark:bg-slate-700 text-pink-600 dark:text-pink-400 px-1.5 py-0.5 rounded mx-0.5 text-[0.9em] font-bold border border-slate-200 dark:border-slate-600">{part.slice(1, -1)}</span>
                                : <span key={i}>{part}</span>
                            ))}
                        </h2>

                        {currentCard.code && (
                            <div className="relative group rounded-xl overflow-hidden shadow-inner border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 mb-6">
                                <pre className="p-6 font-mono text-sm md:text-base text-slate-700 dark:text-slate-300 overflow-x-auto leading-relaxed">
                                    <code>{currentCard.code}</code>
                                </pre>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-center text-slate-400 dark:text-slate-500 text-sm font-bold animate-pulse">
                        <RotateCw size={16} className="mr-2" /> Tap card to flip
                    </div>
                </div>

                {/* --- BACK (Answer & Action) --- */}
                <div 
                    className="absolute w-full h-full backface-hidden bg-slate-900 dark:bg-slate-950 text-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 flex flex-col justify-between overflow-hidden z-10"
                    style={{ 
                        transform: "rotateY(180deg)",
                        backfaceVisibility: 'hidden', 
                        WebkitBackfaceVisibility: 'hidden' 
                    }}
                    onClick={(e) => e.stopPropagation()} 
                >
                    <div className="overflow-y-auto custom-scrollbar flex-1 pr-2 mb-4">
                        <div className="flex items-center mb-6 text-emerald-400">
                            <BookOpen size={24} className="mr-3" />
                            <h3 className="text-xl font-bold uppercase tracking-wider">Solution</h3>
                        </div>

                        <div className="mb-8">
                            <p className="text-slate-500 text-xs mb-2 uppercase font-bold tracking-widest">Answer</p>
                            <div className="text-2xl md:text-3xl font-mono font-bold text-white mb-2 break-words">
                                {Array.isArray(currentCard.answer) ? currentCard.answer[0] : currentCard.answer}
                            </div>
                            {currentCard.options && (
                                <p className="text-slate-500 text-sm">
                                    (Options: {currentCard.options.join(', ')})
                                </p>
                            )}
                        </div>

                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-2">
                            <h4 className="flex items-center font-bold text-blue-300 mb-3 text-sm uppercase tracking-wide">
                                Explanation
                            </h4>
                            <p className="text-slate-300 leading-relaxed text-base font-medium whitespace-pre-line">
                                {currentCard.explanation.split(/(`[^`]+`)/g).map((part, i) => (
                                    part.startsWith('`') && part.endsWith('`') 
                                    ? <span key={i} className="font-mono text-pink-300 bg-white/10 px-1 rounded">{part.slice(1, -1)}</span>
                                    : <span key={i}>{part}</span>
                                ))}
                            </p>
                        </div>
                    </div>

                    {/* Rating Buttons */}
                    <div className="pt-4 border-t border-white/10">
                        <p className="text-center text-slate-500 text-[10px] font-bold uppercase mb-4 tracking-[0.2em]">Self Evaluation</p>
                        <div className="grid grid-cols-3 gap-3">
                            <button onClick={() => handleRate()} className="group flex flex-col items-center justify-center p-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all border border-red-500/30 active:scale-95">
                                <ThumbsDown size={24} className="mb-2 group-hover:-translate-y-1 transition-transform" />
                                <span className="text-xs font-bold">Hard</span>
                            </button>
                            <button onClick={() => handleRate()} className="group flex flex-col items-center justify-center p-3 rounded-2xl bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 hover:text-yellow-300 transition-all border border-yellow-500/30 active:scale-95">
                                <HelpCircle size={24} className="mb-2 group-hover:-translate-y-1 transition-transform" />
                                <span className="text-xs font-bold">So-so</span>
                            </button>
                            <button onClick={() => handleRate()} className="group flex flex-col items-center justify-center p-3 rounded-2xl bg-green-500/10 hover:bg-green-500/20 text-green-400 hover:text-green-300 transition-all border border-green-500/30 active:scale-95">
                                <ThumbsUp size={24} className="mb-2 group-hover:-translate-y-1 transition-transform" />
                                <span className="text-xs font-bold">Easy</span>
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div 
        className={`flex items-center justify-center mt-6 gap-6 transition-all duration-300 ${isFlipped ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'}`}
      >
        <button 
            onClick={handlePrev} 
            className="p-4 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl hover:scale-110 text-slate-700 dark:text-slate-200 transition-all active:scale-95"
        >
            <ArrowLeft size={24} />
        </button>
        <button 
            onClick={handleNext} 
            className="p-4 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-110 transition-all active:scale-95"
        >
            <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}