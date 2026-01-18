import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Menu, X, Book, ChevronRight, Bookmark } from 'lucide-react';
import { curriculum } from '../data/curriculum';

interface StudyDocsProps {
  onExit: () => void;
}

export default function StudyDocs({ onExit }: StudyDocsProps) {
  const [activeChapterId, setActiveChapterId] = useState(curriculum[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle

  const activeChapter = curriculum.find(ch => ch.id === activeChapterId) || curriculum[0];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden text-slate-900 dark:text-slate-100">
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar (Table of Contents) */}
      <motion.aside 
        className={`fixed md:relative inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col transform md:transform-none transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
            <h2 className="font-black text-xl flex items-center">
                <Book className="mr-2 text-blue-600 dark:text-blue-400" />
                C Curriculum
            </h2>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-1">
                <X />
            </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
            {curriculum.map((chapter) => (
                <button
                    key={chapter.id}
                    onClick={() => {
                        setActiveChapterId(chapter.id);
                        setIsSidebarOpen(false);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl text-sm font-bold transition-all flex items-center group overflow-hidden ${
                        activeChapterId === chapter.id 
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 ring-1 ring-blue-200 dark:ring-blue-800' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                >
                    <span className="truncate flex-1">{chapter.title}</span>
                    {activeChapterId === chapter.id && <ChevronRight size={14} className="flex-shrink-0 ml-2" />}
                </button>
            ))}
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-700">
            <button 
                onClick={onExit}
                className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
            >
                <ArrowLeft size={18} className="mr-2" /> Main Menu
            </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Top Bar for Mobile */}
        <div className="md:hidden p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 mr-3">
                <Menu />
            </button>
            <span className="font-bold truncate">{activeChapter.title}</span>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar max-w-5xl mx-auto w-full">
            <motion.div
                key={activeChapter.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="mb-10 pb-6 border-b-2 border-slate-100 dark:border-slate-700">
                    <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-sm mb-2 block">
                        Chapter
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                        {activeChapter.title}
                    </h1>
                </div>

                <div className="space-y-12">
                    {activeChapter.sections.map((section, idx) => (
                        <section key={idx} className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center">
                                <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 flex items-center justify-center text-sm mr-3">
                                    {idx + 1}
                                </span>
                                {section.title}
                            </h2>
                            
                            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6 whitespace-pre-line">
                                {section.content}
                            </p>

                            {section.code && (
                                <div className="relative group rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                                    <div className="absolute top-0 right-0 p-2 opacity-50 text-xs text-white font-mono">C Language</div>
                                    <pre className="p-6 font-mono text-sm md:text-base text-blue-100 overflow-x-auto leading-relaxed">
                                        <code>{section.code}</code>
                                    </pre>
                                </div>
                            )}

                            {section.tip && (
                                <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded-r-xl">
                                    <p className="text-yellow-800 dark:text-yellow-200 font-medium flex items-start">
                                        <Bookmark className="mr-2 flex-shrink-0 mt-1" size={18} />
                                        {section.tip}
                                    </p>
                                </div>
                            )}
                        </section>
                    ))}
                </div>

                {/* Footer Navigation within Chapter */}
                <div className="mt-16 py-10 border-t border-slate-200 dark:border-slate-700 text-center text-slate-400">
                    <p>End of {activeChapter.title}</p>
                </div>
            </motion.div>
        </div>
      </main>
    </div>
  );
}