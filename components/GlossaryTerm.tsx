
import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface GlossaryTermProps {
  term: string;
  definition: string;
  children: React.ReactNode;
}

const GlossaryTerm: React.FC<GlossaryTermProps> = ({ term, definition, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, placement: 'top' });
  const triggerRef = useRef<HTMLSpanElement>(null);

  const calculatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // If the term is too close to the top of the screen (less than 180px), show tooltip below it.
      // Otherwise, show it above.
      const showBelow = rect.top < 180; 
      
      setCoords({
        left: rect.left + (rect.width / 2),
        top: showBelow ? rect.bottom + 8 : rect.top - 8,
        placement: showBelow ? 'bottom' : 'top'
      });
    }
  };

  const handleMouseEnter = () => {
    calculatePosition();
    setIsOpen(true);
  };

  // Close tooltip on scroll to prevent it from detaching visually from the term
  useEffect(() => {
    const handleScroll = () => {
        if(isOpen) setIsOpen(false);
    };
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [isOpen]);

  const isTop = coords.placement === 'top';

  return (
    <>
      <span 
        ref={triggerRef}
        className="relative inline-block" 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => {
            calculatePosition();
            setIsOpen(!isOpen);
        }}
      >
        {children}
      </span>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: isTop ? 10 : -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: isTop ? 10 : -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{ 
                position: 'fixed', 
                top: coords.top, 
                left: coords.left,
                transform: `translate(-50%, ${isTop ? '-100%' : '0'})`, // CSS transform for positioning anchor
                zIndex: 9999,
                pointerEvents: 'none'
            }}
            className="w-72 p-4 bg-slate-800/95 backdrop-blur-md text-white text-sm rounded-xl shadow-2xl border border-slate-600"
          >
             {/* Arrow Indicator */}
            <div 
                className={`absolute left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent ${
                    isTop 
                    ? 'bottom-[-8px] border-t-[8px] border-t-slate-800/95' 
                    : 'top-[-8px] border-b-[8px] border-b-slate-800/95'
                }`}
            ></div>
            
            <div className="font-bold text-amber-400 mb-2 border-b border-slate-600 pb-2 text-base">{term}</div>
            <div className="leading-relaxed text-slate-100 font-light text-justify">{definition}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlossaryTerm;
