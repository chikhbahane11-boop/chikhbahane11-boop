
import React from 'react';
import { COMPARISON_DATA } from '../constants';
import { Scale, Info } from 'lucide-react';

const ComparisonTable: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden my-8">
      <div className="bg-gray-800 p-6 text-white flex justify-between items-center">
        <div>
           <h3 className="text-xl font-bold flex items-center gap-2">
             <Scale className="w-6 h-6 text-amber-400" />
             مقارنة جوهرية
           </h3>
           <p className="text-gray-300 text-sm mt-1">بين القواعد ذات الأصل الديني والقواعد القانونية الوضعية</p>
        </div>
        <Info className="text-gray-400 w-5 h-5 hidden md:block" />
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-4 px-6 text-right font-bold text-gray-600 w-1/4">وجه المقارنة</th>
              <th className="py-4 px-6 text-right font-bold text-purple-700 w-1/3">المرحلة الدينية / الثيوقراطية</th>
              <th className="py-4 px-6 text-right font-bold text-blue-700 w-1/3">المرحلة القانونية / الوضعية</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {COMPARISON_DATA.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-bold text-gray-800 bg-gray-50/50">{row.criteria}</td>
                <td className="py-4 px-6 text-gray-700 leading-relaxed bg-purple-50/30">{row.civil}</td>
                <td className="py-4 px-6 text-gray-700 leading-relaxed bg-blue-50/30">{row.commercial}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-gray-50 text-xs text-center text-gray-500 border-t">
        هذا الجدول يلخص الفروقات الجوهرية التي أحدثها التطور التاريخي للنظم.
      </div>
    </div>
  );
};

export default ComparisonTable;
