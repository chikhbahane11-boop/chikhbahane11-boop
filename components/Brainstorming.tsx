
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';

const Brainstorming: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const options = [
    {
      id: 1,
      text: "استخدام القوة (البقاء للأقوى)",
      feedback: "هذا يمثل مرحلة 'الانتقام الفردي'، وهي أقدم المراحل البشرية حيث كانت القوة هي التي تنشئ الحق وتحميه، قبل ظهور أي تنظيم."
    },
    {
      id: 2,
      text: "الاحتكام لكبير القبيلة أو الكاهن",
      feedback: "خيار ذكي! هذا يمثل بداية ظهور 'السلطة' والتحكيم، وانتقال المجتمع من الفوضى إلى النظام بفضل العامل الديني والاجتماعي."
    },
    {
      id: 3,
      text: "انتظار حكم السماء (الآلهة)",
      feedback: "هذا يمثل 'المرحلة الدينية'، حيث كان يعتقد أن العدالة تأتي من قوى غيبية (مثل اختبارات النار والماء) لكشف الجاني."
    }
  ];

  return (
    <div className="bg-slate-900 rounded-3xl p-6 md:p-10 mb-12 text-white shadow-2xl overflow-hidden relative border border-slate-700">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-pulse pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-amber-500/20 p-3 rounded-full">
            <BrainCircuit className="w-8 h-8 text-amber-400" />
          </div>
          <h2 className="text-2xl font-bold text-amber-50">عصف ذهني: قبل البداية...</h2>
        </div>

        <p className="text-lg md:text-xl text-slate-200 mb-8 leading-relaxed">
          تخيل أنك تعيش في مجتمع بدائي قبل آلاف السنين، حيث لا توجد شرطة ولا محاكم ولا قوانين مكتوبة. 
          <br className="hidden md:block"/>
          وقع نزاع حاد بينك وبين شخص آخر حول ملكية أداة صيد ثمينة. 
          <span className="text-amber-300 font-bold block mt-3">كيف تتوقع أن يتم حل هذا النزاع في ذلك الزمن؟</span>
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`p-5 rounded-xl text-right transition-all duration-300 border h-full flex flex-col ${
                selectedOption === option.id 
                  ? 'bg-amber-500 border-amber-400 text-slate-900 transform scale-[1.02] shadow-lg ring-2 ring-amber-300 ring-offset-2 ring-offset-slate-900' 
                  : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-slate-500 text-slate-300'
              }`}
            >
              <div className="font-bold mb-auto text-lg">{option.text}</div>
              {selectedOption === option.id && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-sm font-semibold mt-4 pt-3 border-t border-slate-900/20 leading-relaxed"
                >
                  {option.feedback}
                </motion.div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brainstorming;
