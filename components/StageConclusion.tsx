
import React, { useState } from 'react';
import { Download, BookOpen, Users, Building2, Gavel, Scroll, ExternalLink, ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// رابط ملف PDF الصحيح والمباشر للمحاضرة
const PDF_URL = "https://fr.scribd.com/document/793308325/%D8%AF-%D8%B9%D8%B2%D8%A9-%D8%B9%D8%A8%D8%AF-%D8%A7%D9%84%D8%B9%D8%B2%D9%8A%D8%B2-%D9%85%D8%B7%D8%A8%D9%88%D8%B9%D8%A9-%D8%A8%D9%8A%D8%AF%D8%A7%D8%BA%D9%88%D8%AC%D9%8A%D8%A9-%D8%AA%D8%A7%D8%B1%D9%8A%D8%AE-%D8%A7%D9%84%D9%86%D8%B8%D9%85-%D8%A7%D9%84%D9%82%D8%A7%D9%86%D9%88%D9%86%D9%8A%D8%A9";
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf3cIY051YNTt4aKCOUhykbGsfYf_87wfrEDIziaUnd5qcu0A/viewform?usp=publish-editor";

// تحديث البيانات لتناسب مقارنة "الدين vs القانون" و "العرف vs التشريع"
const CLASSIFICATION_TABLE_DATA = [
  {
    criterion: "المصدر",
    civil: "وحي إلهي / إرادة الآلهة (غيبي).",
    commercial: "إرادة الحاكم / عرف المجتمع (وضعي)."
  },
  {
    criterion: "الجزاء (العقاب)",
    civil: "أخروي (اللعنة، غضب الآلهة).",
    commercial: "دنيوي مادي (القصاص، الغرامة، النفي)."
  },
  {
    criterion: "الهدف",
    civil: "خلاص الروح وإرضاء الآلهة.",
    commercial: "ضبط سلوك الأفراد وحفظ النظام العام."
  },
  {
    criterion: "السلطة الحاكمة",
    civil: "رجال الدين / الكهنة (حكم ثيوقراطي).",
    commercial: "الملك / الحاكم / الشعب (حكم زمني)."
  },
  {
    criterion: "النطاق",
    civil: "يشمل النوايا والضمائر والسلوك الظاهر.",
    commercial: "يحكم السلوك الظاهر فقط ولا يعاقب على النوايا."
  }
];

const StageConclusion: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'concepts' | 'types' | 'classification'>('concepts');

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-blue-900">خلاصة الدرس والمحطة الختامية</h2>
        <p className="text-gray-600 text-lg">
          تاريخ النظم القانونية: رحلة القانون من القوة إلى الحق ومن العرف إلى التشريع
        </p>
      </div>

      {/* Comprehensive Summary Module */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100">
        <div className="bg-blue-900 p-8 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute right-0 top-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
             <div className="absolute left-0 bottom-0 w-64 h-64 bg-amber-500 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="relative z-10 text-center md:text-right">
            <h3 className="text-white font-bold text-3xl flex items-center justify-center md:justify-start gap-3 mb-2">
              <BookOpen className="w-8 h-8 text-amber-400" />
              الملخص الشامل للمحاضرة
            </h3>
            <p className="text-blue-100/80 text-lg max-w-xl">
              احصل على النسخة الكاملة للمحاضرة بصيغة PDF لمراجعة نشأة القانون وتطوره.
            </p>
          </div>

          <a 
            href={PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 group flex items-center gap-4 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-blue-950 px-8 py-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(245,158,11,0.4)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
          >
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm group-hover:rotate-12 transition-transform duration-300">
              <Download className="w-8 h-8 text-blue-950" />
            </div>
            <div className="text-right">
              <div className="font-black text-xl leading-none mb-1">تحميل المحاضرة</div>
              <div className="text-sm font-semibold opacity-75">نسخة PDF شاملة</div>
            </div>
          </a>
        </div>

        {/* Tabs Header */}
        <div className="flex border-b bg-gray-50">
          <button
            onClick={() => setActiveTab('concepts')}
            className={`flex-1 py-4 px-6 text-center font-bold transition-colors ${activeTab === 'concepts' ? 'bg-white text-blue-900 border-t-4 border-blue-900' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            مراحل النشأة
          </button>
          <button
            onClick={() => setActiveTab('types')}
            className={`flex-1 py-4 px-6 text-center font-bold transition-colors ${activeTab === 'types' ? 'bg-white text-blue-900 border-t-4 border-blue-900' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            العوامل المؤثرة
          </button>
          <button
            onClick={() => setActiveTab('classification')}
            className={`flex-1 py-4 px-6 text-center font-bold transition-colors ${activeTab === 'classification' ? 'bg-white text-blue-900 border-t-4 border-blue-900' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            مقارنة النظم
          </button>
        </div>

        {/* Tabs Content */}
        <div className="p-8 bg-white min-h-[300px]">
          <AnimatePresence mode="wait">
            {activeTab === 'concepts' && (
              <motion.div 
                key="concepts"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="prose max-w-none text-right">
                  <h4 className="text-blue-800 text-lg font-bold mb-2">التطور التاريخي للقاعدة القانونية</h4>
                  <p className="text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-lg border-r-4 border-blue-500">
                    "لم يظهر القانون بشكله الحالي فجأة، بل بدأ كأوامر إلهية، ثم تقاليد دينية يحرسها الكهنة، ثم أعراف اجتماعية ملزمة، وأخيراً قواعد مكتوبة (التدوين) لتحقيق العدالة والمساواة."
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-bold text-blue-900 mb-2 flex items-center gap-2"><Scroll className="w-4 h-4"/> من القوة إلى الحق</h5>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>الانتقام الفردي (شريعة الغاب).</li>
                        <li>القصاص (العين بالعين).</li>
                        <li>الدية (التعويض المالي).</li>
                        <li>تدخل السلطة العامة (القضاء).</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-bold text-blue-900 mb-2 flex items-center gap-2"><Gavel className="w-4 h-4"/> أهمية التدوين</h5>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>نشر القانون للكافة.</li>
                        <li>ثبات القاعدة القانونية.</li>
                        <li>منع تحكم القضاة والكهنة.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'types' && (
              <motion.div 
                key="types"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid md:grid-cols-3 gap-6"
              >
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto">
                    <BookOpen className="text-orange-600 w-6 h-6" />
                  </div>
                  <h4 className="text-center font-bold text-orange-800 mb-2">العامل الديني</h4>
                  <p className="text-sm text-gray-600 text-center">
                    اعتبر القانون وحياً مقدساً. كان يطبق بصرامة باعتباره إرادة الآلهة. أثر بشكل كبير في قوانين الأسرة والميراث.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto">
                    <Building2 className="text-blue-600 w-6 h-6" />
                  </div>
                  <h4 className="text-center font-bold text-blue-800 mb-2">العامل الاقتصادي</h4>
                  <p className="text-sm text-gray-600 text-center">
                    الانتقال من الصيد إلى الزراعة أوجد الملكية العقارية. ظهور التجارة استلزم عقوداً وقواعد للتبادل والديون.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto">
                    <Users className="text-green-600 w-6 h-6" />
                  </div>
                  <h4 className="text-center font-bold text-green-800 mb-2">العامل الاجتماعي</h4>
                  <p className="text-sm text-gray-600 text-center">
                    اتساع الدائرة من الأسرة إلى العشيرة ثم الدولة. ظهور الطبقية (أحرار/عبيد) أثر في اختلاف العقوبات والحقوق.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'classification' && (
              <motion.div 
                key="classification"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100 text-blue-900">
                        <th className="p-3 text-right border rounded-tr-lg">وجه المقارنة</th>
                        <th className="p-3 text-right border">القاعدة الدينية/الأخلاقية</th>
                        <th className="p-3 text-right border rounded-tl-lg">القاعدة القانونية</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      {CLASSIFICATION_TABLE_DATA.map((row, index) => (
                        <tr key={index} className="hover:bg-blue-50 transition-colors border-b">
                          <td className="p-3 border font-bold text-blue-800 bg-gray-50">{row.criterion}</td>
                          <td className="p-3 border">{row.civil}</td>
                          <td className="p-3 border font-semibold text-blue-700">{row.commercial}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  المصدر: محاضرات تاريخ النظم القانونية - السنة الأولى حقوق
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Exit Ticket Link Section (Replaces the Form) */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-100 p-8 text-center transition-all hover:shadow-2xl">
         <div className="max-w-2xl mx-auto space-y-6">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <ClipboardList className="w-10 h-10 text-indigo-600" />
            </div>
            
            <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-900">بطاقة الخروج (Exit Ticket)</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                    شكراً لإتمامك المحاضرة. يرجى ملء استمارة التقييم الإلكترونية لتسجيل حضورك ومشاركتك، وطرح أي أسئلة قد تكون لديك.
                </p>
            </div>

            <a 
                href={GOOGLE_FORM_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold px-10 py-4 rounded-xl transition-all transform hover:-translate-y-1 shadow-lg shadow-indigo-200 mt-4"
            >
                <span>فتح استمارة التقييم</span>
                <ExternalLink className="w-5 h-5" />
            </a>
            
            <p className="text-xs text-gray-400 mt-4">
                سيتم فتح النموذج في نافذة جديدة عبر Google Forms
            </p>
         </div>
      </div>
    </div>
  );
};

export default StageConclusion;
