
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Book, Highlighter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlossaryTerm from './GlossaryTerm';
import { GLOSSARY_TERMS } from '../constants';

interface SourceReaderProps {
  title: string;
  content: string;
  defaultExpanded?: boolean;
}

const SourceReader: React.FC<SourceReaderProps> = ({ title, content, defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Function to parse text and wrap glossary terms
  const renderContentWithGlossary = (text: string) => {
    if (!text) return null;

    const allPatterns = Object.keys(GLOSSARY_TERMS).flatMap(key => 
      GLOSSARY_TERMS[key].patterns.map(pattern => ({ termKey: key, pattern }))
    ).sort((a, b) => b.pattern.length - a.pattern.length);

    let parts: (string | React.ReactNode)[] = [text];

    allPatterns.forEach(({ termKey, pattern }) => {
      const newParts: (string | React.ReactNode)[] = [];
      parts.forEach(part => {
        if (typeof part === 'string') {
          const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(`(${escapedPattern})`, 'gi');
          const split = part.split(regex);
          
          split.forEach((str, i) => {
            if (i % 2 === 1) { // It's a match
               const isCommercial = termKey.includes('تجارية') || termKey.includes('تضامن') || termKey.includes('مساهمة');
               
               newParts.push(
                <GlossaryTerm key={`${termKey}-${i}-${Math.random()}`} term={str} definition={GLOSSARY_TERMS[termKey].definition}>
                  <span className={`cursor-pointer font-medium px-1 mx-0.5 rounded transition-colors duration-200 inline-block ${isCommercial ? 'text-blue-700 bg-blue-50/80 decoration-blue-300 underline underline-offset-4' : 'text-amber-800 bg-amber-50/50 border-b-2 border-amber-300/50 hover:bg-amber-200'}`}>
                    {str}
                  </span>
                </GlossaryTerm>
              );
            } else if (str) {
              newParts.push(str);
            }
          });
        } else {
          newParts.push(part);
        }
      });
      parts = newParts;
    });

    return <p className="leading-8 text-gray-800 text-justify">{parts}</p>;
  };

  return (
    <div className="w-full my-8 bg-[#fdfbf7] border border-[#e2d5b5] rounded-xl shadow-sm overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-5 bg-[#f4efe4] hover:bg-[#ebe4d3] transition-colors text-[#5c4b37]"
      >
        <div className="flex items-center gap-4">
          <div className="bg-[#d4c5a9] p-2.5 rounded-full text-white shadow-sm">
            <Book className="w-5 h-5 text-[#5c4b37]" />
          </div>
          <div className="text-right">
            <span className="block text-xs font-bold uppercase tracking-wider opacity-60 mb-1">المصدر الأكاديمي</span>
            <span className="font-bold text-lg text-slate-800">{title}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
            <span className="text-xs font-semibold bg-amber-100 text-amber-800 px-2.5 py-1.5 rounded-lg border border-amber-200/50 hidden sm:flex items-center gap-1.5">
                <Highlighter className="w-3.5 h-3.5" />
                نص تفاعلي
            </span>
            <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                <ChevronDown className="w-5 h-5 opacity-70" />
            </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="border-t border-[#e2d5b5]"
          >
            <div className="relative bg-[#fdfbf7]">
               {/* Top Fade */}
              <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-[#e2d5b5]/10 to-transparent z-10 pointer-events-none" />
              
              {/* Scrollable Content Container */}
              <div className="p-6 md:p-8 max-h-[550px] overflow-y-auto custom-scrollbar scroll-smooth">
                <div className="font-serif text-lg md:text-xl space-y-6 text-[#2c241b]">
                   {content.split('\n').map((paragraph, idx) => (
                      <div key={idx}>
                          {renderContentWithGlossary(paragraph)}
                      </div>
                   ))}
                </div>

                <div className="mt-10 pt-6 border-t border-dashed border-[#d4c5a9] flex flex-col sm:flex-row justify-between items-center text-sm text-[#8c7b66] gap-2">
                  <span className="font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8c7b66]"></span>
                    المرجع: د. عبد العزيز عزة
                  </span>
                  <span>محاضرات في تاريخ النظم القانونية</span>
                </div>
              </div>

               {/* Bottom Fade */}
               <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-[#fdfbf7] via-[#fdfbf7]/80 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f4efe4;
          border-left: 1px solid #e2d5b5;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #d4c5a9;
          border-radius: 4px;
          border: 2px solid #f4efe4;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #c2b08e;
        }
      `}</style>
    </div>
  );
};

export default SourceReader;
