
import React from 'react';
import { motion } from 'framer-motion';
import { TIMELINE_DATA } from '../constants';
import { ArrowDown } from 'lucide-react';

const Timeline: React.FC = () => {
  return (
    <div className="py-8">
      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-blue-900">المسار الزمني لتطور القاعدة القانونية</h3>
        <p className="text-gray-600 mt-2">كيف انتقلنا من شرائع الغاب إلى القوانين المكتوبة؟</p>
      </div>
      
      <div className="relative container mx-auto px-4 max-w-4xl">
        {/* Vertical Line */}
        <div className="absolute right-4 md:right-1/2 transform md:translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-200 rounded-full"></div>
        
        <div className="space-y-12">
          {TIMELINE_DATA.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline Dot */}
                <div className="absolute right-4 md:right-1/2 transform translate-x-1/2 md:translate-x-1/2 -mt-1 z-10">
                  <div className="w-10 h-10 bg-blue-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{event.year}</span>
                  </div>
                </div>

                {/* Content Card */}
                <div className={`flex-1 md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'} mr-12 md:mr-0`}>
                  <div className="bg-white p-6 rounded-2xl shadow-md border-r-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <event.icon className="w-6 h-6" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-800">{event.title}</h4>
                    </div>
                    <div className="mb-2">
                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-bold">
                            {event.description}
                        </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {event.details}
                    </p>
                  </div>
                </div>
                
                {/* Empty Space for alignment */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            );
          })}
        </div>
        
        <div className="flex justify-center mt-12">
             <div className="animate-bounce bg-blue-100 p-2 rounded-full text-blue-600">
                 <ArrowDown className="w-6 h-6" />
             </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
