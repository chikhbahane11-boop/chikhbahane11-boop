
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, MessageSquare, Brain, Lightbulb, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { REVIEW_QUIZ_DATA, DISCUSSION_TOPICS } from '../constants';

const DiscussionReview: React.FC = () => {
  // Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Discussion State
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const currentQuestion = REVIEW_QUIZ_DATA[currentQuestionIndex];

  const handleAnswer = (userChoice: boolean) => {
    const isCorrect = userChoice === currentQuestion.isTrue;
    setLastAnswerCorrect(isCorrect);
    setShowAnswer(true);
    if (isCorrect) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    setShowAnswer(false);
    setLastAnswerCorrect(null);
    if (currentQuestionIndex < REVIEW_QUIZ_DATA.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setShowAnswer(false);
    setQuizCompleted(false);
    setScore(0);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 my-10">
      
      {/* Right Column: True/False Quiz */}
      <div className="bg-white rounded-3xl shadow-lg border border-indigo-100 overflow-hidden flex flex-col h-full">
        <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-indigo-200" />
            <h3 className="text-xl font-bold">مراجعة سريعة</h3>
          </div>
          <span className="bg-indigo-500 px-3 py-1 rounded-full text-sm font-mono">
            {currentQuestionIndex + 1}/{REVIEW_QUIZ_DATA.length}
          </span>
        </div>

        <div className="p-8 flex-1 flex flex-col justify-center min-h-[300px]">
          {!quizCompleted ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col"
              >
                <p className="text-xl font-medium text-gray-800 leading-relaxed mb-8 flex-1">
                  {currentQuestion.question}
                </p>

                {!showAnswer ? (
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleAnswer(true)}
                      className="flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-green-100 bg-green-50 text-green-700 hover:bg-green-100 hover:border-green-300 transition-all font-bold text-lg"
                    >
                      <CheckCircle2 className="w-6 h-6" /> صواب
                    </button>
                    <button
                      onClick={() => handleAnswer(false)}
                      className="flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-red-100 bg-red-50 text-red-700 hover:bg-red-100 hover:border-red-300 transition-all font-bold text-lg"
                    >
                      <XCircle className="w-6 h-6" /> خطأ
                    </button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-xl p-5 border-l-4 ${lastAnswerCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}
                  >
                    <div className="flex items-center gap-2 font-bold mb-2">
                      {lastAnswerCorrect ? (
                        <span className="text-green-700 flex items-center gap-2"><CheckCircle2 className="w-5 h-5"/> إجابة صحيحة!</span>
                      ) : (
                        <span className="text-red-700 flex items-center gap-2"><XCircle className="w-5 h-5"/> إجابة خاطئة!</span>
                      )}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      {currentQuestion.explanation}
                    </p>
                    <button
                      onClick={nextQuestion}
                      className="w-full py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors"
                    >
                      السؤال التالي
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-indigo-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-2">أحسنت!</h4>
              <p className="text-gray-600 mb-6">لقد أجبت بشكل صحيح على {score} من {REVIEW_QUIZ_DATA.length} أسئلة.</p>
              <button
                onClick={resetQuiz}
                className="px-6 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg font-bold hover:bg-indigo-50 transition-colors"
              >
                إعادة الاختبار
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Left Column: Critical Thinking & Discussion */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-amber-100 p-2 rounded-lg">
             <MessageSquare className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">للنقاش والتفكير</h3>
        </div>
        <p className="text-gray-600">قضايا للنقاش الجماعي أو التفكير الفردي المتعمق لربط الماضي بالحاضر.</p>

        <div className="space-y-4">
          {DISCUSSION_TOPICS.map((topic) => (
            <div key={topic.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <button
                onClick={() => setActiveTopic(activeTopic === topic.id ? null : topic.id)}
                className="w-full text-right p-5 flex items-start justify-between gap-4"
              >
                <div className="flex gap-3">
                   <Brain className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                   <span className="font-bold text-lg text-gray-800">{topic.title}</span>
                </div>
                {activeTopic === topic.id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>

              <AnimatePresence>
                {activeTopic === topic.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-0">
                      <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                        <h5 className="font-bold text-amber-800 mb-3 flex items-center gap-2 text-sm">
                          <Lightbulb className="w-4 h-4" /> نقاط استرشادية للنقاش:
                        </h5>
                        <ul className="space-y-2">
                          {topic.points.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm leading-relaxed">
                              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default DiscussionReview;
