import { useState, useEffect } from 'react';
import Home from './components/Home';
import QuizGame from './components/QuizGame';
import StudyCards from './components/StudyCards';
import StudyDocs from './components/StudyDocs';
import Result from './components/Result';
import { Moon, Sun } from 'lucide-react';

function App() {
  const [screen, setScreen] = useState<'home' | 'quiz' | 'cards' | 'docs' | 'result'>('home');
  const [mode, setMode] = useState<'practice' | 'exam'>('practice');
  const [resultData, setResultData] = useState({ score: 0, total: 0, history: [] as any[] });
  
  // Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('theme') === 'dark' || 
               (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleStart = (selectedMode: 'docs' | 'flashcard' | 'practice' | 'exam') => {
    if (selectedMode === 'docs') {
        setScreen('docs');
    } else if (selectedMode === 'flashcard') {
        setScreen('cards');
    } else {
        setMode(selectedMode);
        setScreen('quiz');
    }
  };

  const handleFinish = (score: number, total: number, history: any[]) => {
    setResultData({ score, total, history });
    setScreen('result');
  };

  const handleRestart = () => {
    setScreen('home');
    setResultData({ score: 0, total: 0, history: [] });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* Global Dark Mode Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur shadow-lg border border-slate-200 dark:border-slate-700 hover:scale-110 transition-all text-slate-600 dark:text-yellow-400"
        >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {screen === 'home' && <Home onStart={handleStart} />}
      
      {screen === 'docs' && (
        <StudyDocs onExit={handleRestart} />
      )}

      {screen === 'cards' && (
        <StudyCards onExit={handleRestart} />
      )}

      {screen === 'quiz' && (
        <QuizGame 
            mode={mode} 
            onFinish={handleFinish} 
            onExit={handleRestart}
        />
      )}

      {screen === 'result' && (
        <Result 
            score={resultData.score} 
            total={resultData.total} 
            history={resultData.history}
            onRestart={handleRestart} 
        />
      )}
    </div>
  );
}

export default App;