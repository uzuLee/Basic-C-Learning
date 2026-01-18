import { motion } from 'framer-motion';
import { RefreshCcw, Trophy, Award, XCircle, CheckCircle } from 'lucide-react';

interface ResultProps {
  score: number;
  total: number;
  history: any[]; // 문제별 기록
  onRestart: () => void;
}

export default function Result({ score, total, history, onRestart }: ResultProps) {
  const percentage = Math.round((score / total) * 100);
  
  let message = "";
  let ColorIcon = Award;
  let colorClass = "text-yellow-500";
  let bgClass = "bg-yellow-50";

  if (percentage === 100) {
    message = "Perfect Score! Master Level.";
    ColorIcon = Trophy;
    colorClass = "text-yellow-500";
    bgClass = "bg-yellow-50";
  } else if (percentage >= 80) {
    message = "Excellent! You passed the test.";
    ColorIcon = Award;
    colorClass = "text-blue-500";
    bgClass = "bg-blue-50";
  } else {
    message = "Keep practicing. You can do it!";
    ColorIcon = Award;
    colorClass = "text-slate-400";
    bgClass = "bg-slate-50";
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 py-12">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center"
      >
        <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${bgClass} ${colorClass}`}>
          <ColorIcon size={48} />
        </div>
        
        <h1 className="text-4xl font-black text-slate-800 mb-2">Result Report</h1>
        <p className="text-slate-500 mb-8 font-medium">{message}</p>

        <div className="flex justify-center items-end mb-12">
          <span className={`text-7xl font-black tracking-tighter ${percentage >= 80 ? 'text-blue-600' : 'text-slate-800'}`}>
            {score}
          </span>
          <span className="text-2xl text-slate-400 mb-4 ml-2 font-bold">/ {total}</span>
        </div>

        {/* 상세 리포트 */}
        <div className="text-left mb-12">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Detailed Analysis</h3>
            <div className="grid gap-3">
                {history.map((record, idx) => (
                    <div key={idx} className={`p-4 rounded-xl border flex items-start ${record.isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                        <div className={`mt-1 mr-3 min-w-[20px] ${record.isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                            {record.isCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between mb-1">
                                <span className="text-xs font-bold uppercase text-slate-500">Question {idx + 1}</span>
                                <span className={`text-xs font-bold uppercase ${record.isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                                    {record.difficulty}
                                </span>
                            </div>
                            <p className="font-medium text-slate-800 text-sm mb-2">{record.question}</p>
                            {!record.isCorrect && (
                                <div className="text-xs space-y-1">
                                    <p className="text-red-500 line-through">Your answer: {record.userAnswer || "(No Answer)"}</p>
                                    <p className="text-green-600 font-bold">Correct: {Array.isArray(record.correctAnswer) ? record.correctAnswer.join(' / ') : record.correctAnswer}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <button
          onClick={onRestart}
          className="w-full py-5 rounded-2xl bg-slate-900 text-white font-bold hover:bg-black transition-all flex items-center justify-center group shadow-xl hover:shadow-2xl hover:-translate-y-1"
        >
          <RefreshCcw size={20} className="mr-2 group-hover:rotate-180 transition-transform duration-500" />
          Start New Test
        </button>
      </motion.div>
    </div>
  );
}