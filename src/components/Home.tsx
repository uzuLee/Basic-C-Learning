import { motion } from 'framer-motion';
import { BookOpen, Target, Swords, BrainCircuit, FileText } from 'lucide-react';

interface HomeProps {
  onStart: (mode: 'docs' | 'flashcard' | 'practice' | 'exam') => void;
}

export default function Home({ onStart }: HomeProps) {
  const modes = [
    {
      id: 'docs',
      title: 'C Docs',
      subtitle: 'Knowledge Base',
      desc: 'Master the fundamentals with our comprehensive documentation.',
      icon: FileText,
      color: 'from-slate-700 to-slate-900',
      textColor: 'text-slate-100',
      iconColor: 'text-slate-300',
      delay: 0.1
    },
    {
      id: 'flashcard',
      title: 'Flashcards',
      subtitle: 'Memory Training',
      desc: 'Reinforce your memory with interactive flashcards.',
      icon: BookOpen,
      color: 'from-emerald-500 to-emerald-700',
      textColor: 'text-emerald-50',
      iconColor: 'text-emerald-200',
      delay: 0.2
    },
    {
      id: 'practice',
      title: 'Practice',
      subtitle: 'Skill Building',
      desc: 'Apply your knowledge with instant feedback questions.',
      icon: Target,
      color: 'from-blue-500 to-blue-700',
      textColor: 'text-blue-50',
      iconColor: 'text-blue-200',
      delay: 0.3
    },
    {
      id: 'exam',
      title: 'Exam',
      subtitle: 'Final Test',
      desc: 'Simulate a real exam environment. 25 questions, 20 minutes.',
      icon: Swords,
      color: 'from-purple-500 to-purple-700',
      textColor: 'text-purple-50',
      iconColor: 'text-purple-200',
      delay: 0.4
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] text-center px-4 relative overflow-hidden py-10 bg-slate-50 dark:bg-slate-900 transition-colors">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 dark:opacity-10 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-16 relative z-10"
      >
        <div className="inline-flex items-center justify-center p-5 mb-6 bg-white dark:bg-slate-800 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-700">
            <BrainCircuit size={56} className="text-slate-800 dark:text-white" />
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            C <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">BASIC LEARNING</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
            Interactive Learning Platform for C Programming
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl px-4 z-10">
        {modes.map((mode) => (
            <motion.button
                key={mode.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                    delay: mode.delay, 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 20 
                }}
                whileHover={{ 
                    scale: 1.02, 
                    y: -5,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onStart(mode.id as any)}
                className={`relative overflow-hidden rounded-[2rem] p-1 shadow-lg hover:shadow-2xl transition-shadow duration-300 group h-full flex flex-col`}
            >
                {/* Background Gradient & Blur */}
                <div className={`absolute inset-0 bg-gradient-to-br ${mode.color} opacity-100 transition-transform duration-500 group-hover:scale-110`}></div>
                
                {/* Content Container */}
                <div className="relative h-full bg-white/10 backdrop-blur-md rounded-[1.8rem] p-6 flex flex-col items-start text-left border border-white/20 transition-colors duration-300 group-hover:bg-white/20">
                    <div className={`p-3 rounded-2xl bg-white/20 mb-4 ${mode.iconColor} shadow-inner`}>
                        <mode.icon size={28} />
                    </div>
                    <h2 className={`text-2xl font-black mb-1 ${mode.textColor}`}>{mode.title}</h2>
                    <p className={`text-xs font-bold uppercase tracking-widest mb-4 opacity-70 ${mode.textColor}`}>{mode.subtitle}</p>
                    <p className={`text-sm leading-relaxed opacity-90 ${mode.textColor} font-medium`}>
                        {mode.desc}
                    </p>
                </div>
            </motion.button>
        ))}
      </div>
    </div>
  );
}