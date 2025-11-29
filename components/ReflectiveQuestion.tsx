
import React, { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp, MessageCircleQuestion } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReflectiveQuestionProps {
  question: string;
  answer: string;
}

const ReflectiveQuestion: React.FC<ReflectiveQuestionProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-6 my-10 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="bg-indigo-100 p-3 rounded-full hidden sm:block shadow-sm">
          <MessageCircleQuestion className="w-6 h-6 text-indigo-600" />
        </div>
        <div className="flex-1 w-full">
          <h4 className="text-lg font-bold text-indigo-900 mb-2 flex items-center gap-2">
            <span className="sm:hidden"><MessageCircleQuestion className="w-5 h-5 inline text-indigo-600"/></span>
            سؤال للتفكير والنقاش
          </h4>
          <p className="text-gray-700 text-lg font-medium leading-relaxed mb-4 text-justify">
            {question}
          </p>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-800 transition-colors bg-white px-4 py-2 rounded-lg border border-indigo-200 shadow-sm hover:shadow-md"
          >
            <Lightbulb className={`w-5 h-5 ${isOpen ? 'fill-indigo-400 text-indigo-600' : ''}`} />
            <span>{isOpen ? 'إخفاء الإجابة المقترحة' : 'أظهر الإجابة المقترحة'}</span>
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 p-5 bg-white rounded-xl border-r-4 border-indigo-400 shadow-sm text-gray-700 leading-relaxed text-justify">
                  <span className="font-bold text-indigo-900 block mb-1">الإجابة / التوجيه:</span>
                  {answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ReflectiveQuestion;
