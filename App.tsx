
import React, { useState } from 'react';
import { 
  BookOpen, 
  History, 
  Scale, 
  Gamepad2, 
  FileText, 
  Menu, 
  X, 
  GraduationCap, 
  ChevronRight,
  Landmark,
  Users,
  MessageCircle,
  ArrowDown
} from 'lucide-react';
import SourceReader from './components/SourceReader';
import StageConclusion from './components/StageConclusion';
import Timeline from './components/Timeline';
import ClassificationGame from './components/ClassificationGame';
import ComparisonTable from './components/ComparisonTable';
import PillarsView from './components/PillarsView';
import Brainstorming from './components/Brainstorming';
import ReflectiveQuestion from './components/ReflectiveQuestion';
import DiscussionReview from './components/DiscussionReview';
import { LECTURE_CONTENT, REFLECTIVE_QUESTIONS } from './constants';

// Section Definitions
const SECTIONS = [
  { id: 'INTRO', title: 'المدخل والمفاهيم', icon: BookOpen },
  { id: 'HISTORY', title: 'المسار التاريخي', icon: History },
  { id: 'FACTORS', title: 'عوامل النشأة', icon: Users },
  { id: 'COMPARISON', title: 'مقارنة الأنظمة', icon: Scale },
  { id: 'GAME', title: 'تحدي التصنيف', icon: Gamepad2 },
  { id: 'REVIEW', title: 'المناقشة والمراجعة', icon: MessageCircle },
  { id: 'CONCLUSION', title: 'الخاتمة والتقييم', icon: FileText },
];

function App() {
  const [activeSection, setActiveSection] = useState('INTRO');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNextSection = () => {
    const currentIndex = SECTIONS.findIndex(s => s.id === activeSection);
    if (currentIndex < SECTIONS.length - 1) {
      const nextSection = SECTIONS[currentIndex + 1];
      setActiveSection(nextSection.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const nextSectionIndex = SECTIONS.findIndex(s => s.id === activeSection) + 1;
  const nextSection = nextSectionIndex < SECTIONS.length ? SECTIONS[nextSectionIndex] : null;

  const renderContent = () => {
    switch (activeSection) {
      case 'INTRO':
        return (
          <div className="space-y-8 animate-fadeIn pb-10">
            <div className="bg-[#1e293b] text-white p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden border-b-4 border-amber-500">
                <div className="relative z-10">
                    <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">نشأة القانون وتطوره</h1>
                    <p className="text-slate-200 text-lg md:text-xl leading-relaxed max-w-3xl">
                        محاضرة تفاعلية لاستكشاف جذور النظم القانونية، من العصور البدائية والأوامر الإلهية وصولاً إلى عصر التدوين والتشريعات الحديثة.
                    </p>
                </div>
                <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500 opacity-10 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3"></div>
            </div>

            {/* Brainstorming Added Here */}
            <Brainstorming />

            <SourceReader 
              title={LECTURE_CONTENT.intro.title}
              content={LECTURE_CONTENT.intro.text}
              defaultExpanded={true}
            />
            
            <div className="bg-[#fffbeb] border-r-4 border-amber-400 p-8 rounded-xl shadow-sm my-8">
                <h3 className="font-bold text-amber-900 text-xl mb-3 flex items-center gap-3">
                    <Landmark className="w-6 h-6"/>
                    لماذا ندرس تاريخ النظم؟
                </h3>
                <p className="text-amber-900/80 text-lg leading-relaxed">
                    "حيثما وجد المجتمع وجد القانون". لا يمكن فهم القوانين الحالية دون العودة لجذورها الأولى في الحضارات القديمة (بابل، روما، مصر) وكيف تدرجت من القوة إلى الحق.
                </p>
            </div>

             <SourceReader 
              title={LECTURE_CONTENT.concepts.title}
              content={LECTURE_CONTENT.concepts.text}
            />

            {/* Reflective Question Added Here */}
            <ReflectiveQuestion 
              question={REFLECTIVE_QUESTIONS.INTRO.question}
              answer={REFLECTIVE_QUESTIONS.INTRO.answer}
            />
          </div>
        );
      case 'HISTORY':
        return (
          <div className="animate-fadeIn pb-10">
            <Timeline />
            <ReflectiveQuestion 
              question={REFLECTIVE_QUESTIONS.HISTORY.question}
              answer={REFLECTIVE_QUESTIONS.HISTORY.answer}
            />
          </div>
        );
      case 'FACTORS':
        return (
          <div className="animate-fadeIn space-y-10 pb-10">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">العوامل المؤثرة في نشأة القانون</h2>
                <p className="text-slate-600 text-lg">القانون ليس نصاً جامداً، بل هو كائن حي يتأثر ببيئته. استكشف العوامل الثلاثة الكبرى التي شكلت القوانين عبر التاريخ.</p>
            </div>
            
            <PillarsView />
            
            <SourceReader 
              title={LECTURE_CONTENT.history.title}
              content={LECTURE_CONTENT.history.text}
              defaultExpanded={true}
            />

            <ReflectiveQuestion 
              question={REFLECTIVE_QUESTIONS.FACTORS.question}
              answer={REFLECTIVE_QUESTIONS.FACTORS.answer}
            />
          </div>
        );
      case 'COMPARISON':
        return (
          <div className="animate-fadeIn pb-10">
             <div className="bg-gradient-to-r from-indigo-900 to-slate-900 p-10 rounded-3xl text-white mb-10 shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-3">الدين، العرف، والقانون</h2>
                  <p className="text-indigo-100 opacity-90 text-lg">
                      كيف نميز بين القواعد القانونية وبين القواعد الدينية أو العرفية التي سبقتها؟
                  </p>
                </div>
                <Scale className="absolute top-1/2 left-10 transform -translate-y-1/2 w-32 h-32 text-white/5" />
            </div>
            <ComparisonTable />
            <SourceReader 
              title={LECTURE_CONTENT.application.title}
              content={LECTURE_CONTENT.application.text}
            />
             <ReflectiveQuestion 
              question={REFLECTIVE_QUESTIONS.COMPARISON.question}
              answer={REFLECTIVE_QUESTIONS.COMPARISON.answer}
            />
          </div>
        );
      case 'GAME':
        return (
          <div className="animate-fadeIn pb-10">
             <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-slate-800">اختبر معلوماتك</h2>
                <p className="text-slate-600 mt-3 text-lg">هل يمكنك التمييز بين مظاهر العامل الديني والعامل الاقتصادي؟</p>
             </div>
            <ClassificationGame />
          </div>
        );
      case 'REVIEW':
        return (
          <div className="animate-fadeIn pb-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-800">المناقشة والمراجعة</h2>
              <p className="text-slate-600 mt-3 text-lg">تحقق من فهمك وشارك في النقاش النقدي حول تطور النظم القانونية.</p>
            </div>
            <DiscussionReview />
          </div>
        );
      case 'CONCLUSION':
        return (
          <div className="animate-fadeIn pb-10">
            <StageConclusion />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfaf8] flex flex-col md:flex-row font-sans text-gray-900">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b p-4 flex justify-between items-center sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-2 text-slate-900 font-bold">
            <GraduationCap className="w-7 h-7 text-amber-600" />
            <span className="text-lg">تاريخ النظم</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-gray-50 rounded-lg text-gray-700">
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <div className={`
        fixed md:sticky top-0 right-0 h-screen w-80 bg-white border-l border-gray-200 shadow-2xl md:shadow-none z-40 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
      `}>
        <div className="p-8 border-b border-gray-100 bg-white">
            <div className="flex items-center gap-4 text-slate-900">
                <div className="bg-amber-100 p-3 rounded-xl shadow-sm">
                    <GraduationCap className="w-8 h-8 text-amber-700" />
                </div>
                <div>
                    <h1 className="font-bold text-2xl leading-none mb-1">تاريخ النظم</h1>
                    <span className="text-sm text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-full">السنة الأولى حقوق</span>
                </div>
            </div>
        </div>

        <nav className="p-6 space-y-3 overflow-y-auto flex-1">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                setIsSidebarOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-200 group ${
                activeSection === section.id 
                  ? 'bg-slate-900 text-white font-bold shadow-md transform scale-[1.02]' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center gap-4">
                <section.icon className={`w-5 h-5 ${activeSection === section.id ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-600'}`} />
                <span className="text-lg">{section.title}</span>
              </div>
              {activeSection === section.id && <ChevronRight className="w-5 h-5 text-amber-400" />}
            </button>
          ))}
        </nav>
        
        <div className="p-6 border-t border-gray-100 bg-[#f8fafc]">
            <div className="text-xs text-slate-500 text-center leading-relaxed font-medium space-y-1">
                <p>وزارة التعليم العالي والبحث العلمي</p>
                <p className="font-bold text-slate-800 text-sm">جامعة التكوين المتواصل ديدوش مراد</p>
                <p>مركز تمنراست - ملحقة عين صالح</p>
                <div className="my-3 border-t border-slate-200 w-16 mx-auto"></div>
                <p className="text-slate-600">إعداد: الأستاذ الشيخ بن بحان</p>
                <p className="text-slate-400 font-mono mt-1">الموسم الدراسي 2024/2025</p>
            </div>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 max-w-5xl mx-auto w-full">
        {renderContent()}

        {nextSection && (
          <button
            onClick={handleNextSection}
            className="w-full mt-8 bg-white border border-slate-200 hover:border-amber-400 p-6 rounded-2xl flex items-center justify-between group transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
          >
             <div className="flex flex-col items-start text-right">
                <span className="text-slate-500 text-sm font-bold mb-1">الانتقال للقسم التالي</span>
                <span className="text-xl font-bold text-slate-800 group-hover:text-amber-700">{nextSection.title}</span>
             </div>
             <div className="bg-slate-50 group-hover:bg-amber-100 p-3 rounded-full transition-colors">
                <ArrowDown className="w-6 h-6 text-slate-400 group-hover:text-amber-600 animate-bounce" />
             </div>
          </button>
        )}
      </main>
    </div>
  );
}

export default App;
