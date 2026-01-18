import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, X, HelpCircle, Terminal, Lightbulb, List, Type, Timer, AlertTriangle, Play } from 'lucide-react';
import { questions as allQuestions } from '../data/questions';
import { examQuestions } from '../data/examQuestions';
import type { Question } from '../data/questions';

interface QuizGameProps {
  mode: 'practice' | 'exam';
  onFinish: (score: number, total: number, answers: any[]) => void;
  onExit: () => void;
}

// Fisher-Yates Shuffle
const shuffleArray = (array: Question[]) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// Text Parser Component
const ParsedText = ({ text }: { text: string }) => {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <span key={i} className="font-mono bg-slate-100 dark:bg-slate-700 text-pink-600 dark:text-pink-400 px-1.5 py-0.5 rounded mx-0.5 text-[0.9em] font-bold border border-slate-200 dark:border-slate-600">
              {part.slice(1, -1)}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
};

export default function QuizGame({ mode, onFinish, onExit }: QuizGameProps) {
  // Exam Intro State
  const [isExamReady, setIsExamReady] = useState(mode !== 'exam');
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  
  // Logic States
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false); 
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);
  
  // UI States
  const [showHint, setShowHint] = useState(false);
  const [inputType, setInputType] = useState<'text' | 'choice'>('text'); 
  const inputRef = useRef<HTMLInputElement>(null);

  // Timer State (Exam Only)
  const [timeLeft, setTimeLeft] = useState(60 * 20);

  useEffect(() => {
    if (mode === 'exam') {
        const shuffled = shuffleArray(examQuestions);
        setQuestions(shuffled.slice(0, 25));
    } else {
        const shuffled = shuffleArray(allQuestions);
        setQuestions(shuffled);
    }
  }, [mode]);

  useEffect(() => {
    if (inputRef.current && inputType === 'text' && !isAnswerRevealed && isExamReady) {
        inputRef.current.focus();
    }
  }, [currentIndex, isAnswerRevealed, inputType, isExamReady]);

  // Timer Logic
  useEffect(() => {
    if (mode === 'exam' && isExamReady && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0 && mode === 'exam' && isExamReady) {
        onFinish(score, questions.length, userAnswers);
    }
  }, [mode, isExamReady, timeLeft, score, questions.length, userAnswers, onFinish]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const startExam = () => {
    setIsExamReady(true);
  };

  const currentQuestion = questions[currentIndex];

  // --- Exam Intro Screen ---
  if (mode === 'exam' && !isExamReady) {
      return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 bg-slate-900 text-white">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-lg w-full bg-slate-800 p-10 rounded-3xl shadow-2xl border border-slate-700 text-center"
            >
                <div className="w-20 h-20 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle size={40} />
                </div>
                <h1 className="text-3xl font-black mb-2">Ready for Exam?</h1>
                <p className="text-slate-400 mb-8">
                    실전 모의고사는 실제 시험 환경과 동일하게 진행됩니다.
                </p>

                <div className="bg-slate-900/50 rounded-xl p-6 mb-8 text-left space-y-3 border border-slate-700">
                    <div className="flex items-center text-slate-300">
                        <Check size={18} className="text-green-400 mr-3" />
                        <span>총 <strong className="text-white">25문제</strong>가 출제됩니다.</span>
                    </div>
                    <div className="flex items-center text-slate-300">
                        <Timer size={18} className="text-yellow-400 mr-3" />
                        <span>제한 시간은 <strong className="text-white">20분</strong>입니다.</span>
                    </div>
                    <div className="flex items-center text-slate-300">
                        <X size={18} className="text-red-400 mr-3" />
                        <span>도중에 힌트를 볼 수 없습니다.</span>
                    </div>
                    <div className="flex items-center text-slate-300">
                        <ArrowRight size={18} className="text-blue-400 mr-3" />
                        <span>뒤로 돌아갈 수 없습니다.</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button onClick={onExit} className="flex-1 py-4 rounded-xl font-bold text-slate-400 hover:bg-slate-700 transition-colors">
                        나가기
                    </button>
                    <button onClick={startExam} className="flex-1 py-4 rounded-xl font-bold bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center">
                        <Play size={20} className="mr-2 fill-current" /> 시험 시작
                    </button>
                </div>
            </motion.div>
        </div>
      );
  }

  if (!currentQuestion) return <div className="text-center p-10 font-bold text-slate-500 dark:text-slate-400">Loading...</div>;

  const checkAnswer = (input: string, answer: string | string[]) => {
    const normalize = (str: string) => str.replace(/\s+/g, '').toLowerCase();
    const normalizedInput = normalize(input);
    
    if (Array.isArray(answer)) {
      return answer.some(a => normalize(a) === normalizedInput);
    }
    return normalize(answer) === normalizedInput;
  };

  const submitAnswer = (answerVal: string) => {
    const correct = checkAnswer(answerVal, currentQuestion.answer);
    
    const answerRecord = {
        questionId: currentQuestion.id,
        question: currentQuestion.question,
        userAnswer: answerVal,
        correctAnswer: currentQuestion.answer,
        isCorrect: correct,
        difficulty: currentQuestion.difficulty
    };

    if (mode === 'practice') {
        setIsCorrect(correct);
        if (correct) setScore(prev => prev + 1);
        setIsAnswerRevealed(true);
        setUserAnswers(prev => [...prev, answerRecord]);
    } else if (mode === 'exam') {
        const newScore = correct ? score + 1 : score;
        setScore(newScore);
        setUserAnswers(prev => [...prev, answerRecord]);
        handleNext(newScore, [...userAnswers, answerRecord]);
    }
  };

  const handleNext = (currentScore = score, currentHistory = userAnswers) => {
    setIsAnswerRevealed(false);
    setShowHint(false);
    setUserInput('');
    setIsCorrect(false);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onFinish(currentScore, questions.length, currentHistory);
    }
  };

  const handlePrev = () => {
    if (mode === 'exam') return;
    if (currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
        setIsAnswerRevealed(false);
        setShowHint(false);
        setUserInput('');
        setIsCorrect(false);
    }
  };

  const progress = ((currentIndex) / questions.length) * 100;
  const modeColor = mode === 'exam' ? 'bg-purple-500' : 'bg-blue-500';
  const modeName = mode === 'exam' ? 'Exam Mode' : 'Practice Mode';

  return (
    <div className="w-full max-w-4xl mx-auto p-4 min-h-screen flex flex-col justify-center">
      {/* Top Bar */}
      <div className="mb-6 flex justify-between items-center text-slate-500 dark:text-slate-400 font-medium select-none">
        <button onClick={onExit} className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center group">
            <div className="p-2 rounded-full bg-white dark:bg-slate-800 shadow-sm group-hover:shadow-md border border-slate-100 dark:border-slate-700 mr-2 transition-all">
                <ArrowRight className="rotate-180" size={16}/>
            </div>
            Exit
        </button>
        <div className="flex flex-col items-center">
             <span className="uppercase tracking-widest text-[10px] font-black text-slate-400 dark:text-slate-500">{modeName}</span>
             <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{currentIndex + 1} / {questions.length}</span>
        </div>
        
        {mode === 'practice' ? (
             <div className="flex items-center gap-2">
                <button 
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <button 
                    onClick={() => handleNext()}
                    disabled={currentIndex === questions.length - 1}
                    className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                >
                    <ArrowRight size={20} />
                </button>
             </div>
        ) : (
            <div className={`flex items-center font-mono font-bold text-lg ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-slate-700 dark:text-white'}`}>
                <Timer size={20} className="mr-2" />
                {formatTime(timeLeft)}
            </div>
        )}
      </div>

      {/* Progress */}
      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mb-8 overflow-hidden">
        <motion.div 
            className={`h-full ${modeColor}`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
        />
      </div>

      <AnimatePresence mode='wait'>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-2xl p-8 md:p-10 border border-slate-100 dark:border-slate-700 relative overflow-hidden"
        >
            <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${mode === 'exam' ? 'from-purple-100 dark:from-purple-900/30' : 'from-blue-100 dark:from-blue-900/30'} to-transparent rounded-full blur-3xl opacity-40 -z-10 transform translate-x-1/3 -translate-y-1/3`}></div>

            <div className="flex justify-between items-start mb-6">
                <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                        ${currentQuestion.difficulty === 'Basic' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 
                        currentQuestion.difficulty === 'Intermediate' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' : 
                        'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'}`}>
                        {currentQuestion.difficulty}
                    </span>
                    <span className="ml-3 text-xs text-slate-400 dark:text-slate-500 uppercase font-bold tracking-widest">
                        {currentQuestion.category}
                    </span>
                </div>
                
                {mode !== 'exam' && !isAnswerRevealed && (
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => setShowHint(!showHint)}
                            className={`p-2 rounded-full transition-all ${showHint ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400 ring-2 ring-yellow-200 dark:ring-yellow-800' : 'bg-slate-50 dark:bg-slate-700 text-slate-400 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'}`}
                            title="Hint"
                        >
                            <Lightbulb size={20} />
                        </button>
                        {mode === 'practice' && (
                            <button 
                                onClick={() => {
                                    setInputType(prev => prev === 'text' ? 'choice' : 'text');
                                    setUserInput('');
                                }}
                                className={`p-2 rounded-full transition-all ${inputType === 'choice' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 ring-2 ring-blue-200 dark:ring-blue-800' : 'bg-slate-50 dark:bg-slate-700 text-slate-400 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'}`}
                                title="Input Mode"
                            >
                                {inputType === 'text' ? <List size={20} /> : <Type size={20} />}
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-6 leading-tight">
                    <ParsedText text={currentQuestion.question} />
                </h2>

                {currentQuestion.code && (
                    <div className="relative group rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 mb-6">
                        <div className="bg-slate-100 dark:bg-slate-900 px-4 py-2 flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <pre className="bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 p-6 font-mono text-sm overflow-x-auto leading-relaxed">
                            <code>{currentQuestion.code}</code>
                        </pre>
                    </div>
                )}

                <AnimatePresence>
                    {showHint && currentQuestion.hint && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 p-4 rounded-xl text-sm border border-yellow-200 dark:border-yellow-800 mb-6 flex items-start">
                                <Lightbulb size={16} className="mt-1 mr-2 flex-shrink-0" />
                                {currentQuestion.hint}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {!isAnswerRevealed ? (
                <div className="mt-4">
                     <AnimatePresence mode="wait">
                        {inputType === 'text' ? (
                            <motion.div
                                key="text-input"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <form onSubmit={(e) => { e.preventDefault(); if(userInput.trim()) submitAnswer(userInput); }} className="relative">
                                    <div className="relative">
                                        <Terminal size={20} className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={userInput}
                                            onChange={(e) => setUserInput(e.target.value)}
                                            placeholder="정답을 입력하세요..."
                                            className="w-full pl-14 pr-4 py-5 bg-slate-50 dark:bg-slate-700/50 border-2 border-slate-200 dark:border-slate-600 rounded-2xl focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-mono text-lg text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-inner"
                                            autoComplete="off"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={!userInput.trim()}
                                        className="mt-6 w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:bg-black dark:hover:bg-slate-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1"
                                    >
                                        {mode === 'exam' ? '다음 문제' : '정답 확인'} <ArrowRight size={18} className="ml-2" />
                                    </button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="choice-input"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-3"
                            >
                                {currentQuestion.options?.map((opt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => submitAnswer(opt)}
                                        className="p-5 text-left rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all font-medium text-slate-700 dark:text-slate-200 active:scale-95 flex items-center group"
                                    >
                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 text-sm font-bold text-slate-500 dark:text-slate-400 mr-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 group-hover:text-blue-700 dark:group-hover:text-blue-200 transition-colors">
                                            {String.fromCharCode(65 + idx)}
                                        </span>
                                        {opt}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-2xl p-6 md:p-8 border-2 ${
                        isCorrect ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                    }`}
                >
                    <div className="flex items-center mb-6">
                        <div className={`p-3 rounded-full mr-4 ${isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                            {isCorrect ? <Check size={28} /> : <X size={28} />}
                        </div>
                        <div>
                            <h3 className={`font-black text-xl mb-1 ${isCorrect ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
                                {isCorrect ? '정답입니다!' : '오답입니다.'}
                            </h3>
                            <div className="text-slate-900 dark:text-white text-lg">
                                <span className="font-bold text-slate-500 dark:text-slate-400 mr-2">정답:</span>
                                <span className="font-mono font-bold text-blue-700 dark:text-blue-300">
                                    {Array.isArray(currentQuestion.answer) ? currentQuestion.answer[0] : currentQuestion.answer}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white/70 dark:bg-slate-800/50 rounded-xl p-5 text-slate-700 dark:text-slate-300 text-base leading-relaxed border border-slate-200/50 dark:border-slate-700/50 mb-6 shadow-sm">
                        <div className="flex items-center text-slate-900 dark:text-white font-bold mb-2">
                            <HelpCircle size={18} className="mr-2" /> 상세 해설
                        </div>
                        {currentQuestion.explanation}
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => handleNext()}
                            className={`flex-1 py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600`}
                        >
                            다음 문제로 <ArrowRight size={18} className="ml-2" />
                        </button>
                    </div>
                </motion.div>
            )}

        </motion.div>
      </AnimatePresence>
    </div>
  );
}