
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Trophy, RefreshCw, BookOpen, Coins } from 'lucide-react';
import { CLASSIFICATION_ITEMS, ClassificationItem } from '../constants';

const ClassificationGame: React.FC = () => {
  const [items, setItems] = useState<ClassificationItem[]>([]);
  const [currentItem, setCurrentItem] = useState<ClassificationItem | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const shuffled = [...CLASSIFICATION_ITEMS].sort(() => Math.random() - 0.5);
    setItems(shuffled);
    setCurrentItem(shuffled[0]);
    setScore(0);
    setStreak(0);
    setGameOver(false);
    setShowFeedback(null);
  };

  const handleChoice = (category: 'civil' | 'commercial') => {
    if (!currentItem) return;

    const isCorrect = currentItem.category === category;

    if (isCorrect) {
      setScore(s => s + 10 + (streak * 2));
      setStreak(s => s + 1);
      setShowFeedback('correct');
    } else {
      setStreak(0);
      setShowFeedback('incorrect');
    }

    setTimeout(() => {
      setShowFeedback(null);
      const nextIndex = items.indexOf(currentItem) + 1;
      if (nextIndex < items.length) {
        setCurrentItem(items[nextIndex]);
      } else {
        setGameOver(true);
      }
    }, 1200);
  };

  if (gameOver) {
    return (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center bg-white p-8 rounded-3xl shadow-xl border-4 border-yellow-100 max-w-md mx-auto mt-10"
      >
        <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-yellow-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">اكتمل التحدي!</h3>
        <p className="text-gray-600 mb-6">النتيجة النهائية: <span className="text-blue-600 font-bold text-xl">{score}</span> نقطة</p>
        <button 
          onClick={resetGame}
          className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="w-5 h-5" /> إعادة المحاولة
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-8">
      <div className="flex justify-between items-center mb-6 px-4">
        <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-500">النقاط:</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold">{score}</span>
        </div>
        <div className="flex items-center gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i < streak ? 'bg-green-500' : 'bg-gray-200'}`} />
            ))}
        </div>
        <div className="text-sm font-bold text-gray-500">
           {items.indexOf(currentItem!) + 1} / {items.length}
        </div>
      </div>

      <div className="relative h-64">
        <AnimatePresence mode="wait">
            {currentItem && (
                <motion.div
                    key={currentItem.id}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    className="absolute inset-0"
                >
                    <div className="bg-white h-full rounded-2xl shadow-lg border-2 border-gray-100 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
                        {showFeedback && (
                            <div className={`absolute inset-0 flex items-center justify-center z-10 ${showFeedback === 'correct' ? 'bg-green-500/90' : 'bg-red-500/90'}`}>
                                {showFeedback === 'correct' ? (
                                    <div className="text-white transform scale-125">
                                        <Check className="w-16 h-16 mx-auto mb-2" />
                                        <div className="font-bold text-xl">ممتاز!</div>
                                    </div>
                                ) : (
                                    <div className="text-white transform scale-125">
                                        <X className="w-16 h-16 mx-auto mb-2" />
                                        <div className="font-bold text-xl">حاول مجدداً</div>
                                        <div className="text-sm opacity-90 mt-1">{currentItem.description}</div>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        <h3 className="text-2xl font-bold text-gray-800 mb-2 leading-snug">
                            {currentItem.name}
                        </h3>
                        <p className="text-gray-400 text-sm">إلى أي عامل أو مرحلة ينتمي هذا المفهوم؟</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <button
          onClick={() => handleChoice('civil')}
          disabled={!!showFeedback}
          className="group relative overflow-hidden bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 p-6 rounded-2xl transition-all duration-300 active:scale-95 text-right"
        >
            <div className="flex items-center gap-3 mb-1">
                <div className="bg-purple-200 p-2 rounded-lg text-purple-700">
                    <BookOpen className="w-6 h-6" />
                </div>
                <span className="font-bold text-purple-900 text-lg">العامل الديني / الغيبي</span>
            </div>
            <p className="text-purple-600/70 text-sm pr-11">مرحلة الوحي والتقاليد الدينية</p>
        </button>

        <button
          onClick={() => handleChoice('commercial')}
          disabled={!!showFeedback}
          className="group relative overflow-hidden bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 p-6 rounded-2xl transition-all duration-300 active:scale-95 text-right"
        >
             <div className="flex items-center gap-3 mb-1">
                <div className="bg-blue-200 p-2 rounded-lg text-blue-700">
                    <Coins className="w-6 h-6" />
                </div>
                <span className="font-bold text-blue-900 text-lg">العامل الاقتصادي</span>
            </div>
            <p className="text-blue-600/70 text-sm pr-11">تطور المعيشة والمجتمع</p>
        </button>
      </div>
    </div>
  );
};

export default ClassificationGame;
