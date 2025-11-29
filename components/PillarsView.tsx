
import React from 'react';
import { motion } from 'framer-motion';
import { PILLARS } from '../constants';

const PillarsView: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
      {PILLARS.map((pillar, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 group"
        >
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-colors duration-300">
            <pillar.icon className="w-7 h-7 text-indigo-600 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-3">{pillar.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {pillar.desc}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default PillarsView;
