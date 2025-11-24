import React, { useState } from 'react';
import { Phone, Info } from 'lucide-react';

const EmergencyCard = ({ title, number, icon: Icon, description, category, colorClass }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col relative group">
      {/* Header Section */}
      <div className={`p-4 ${colorClass} bg-opacity-20 flex items-center justify-between border-b border-white/5`}>
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl ${colorClass} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon size={24} />
          </div>
          <h3 className="font-bold text-white text-lg leading-tight">{title}</h3>
        </div>
        <button 
          onClick={() => setShowInfo(!showInfo)}
          className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <Info size={20} />
        </button>
      </div>
      
      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow bg-slate-900/40">
        {showInfo && (
          <div className="mb-4 text-sm text-slate-300 bg-slate-800 p-3 rounded-lg border border-slate-700 shadow-inner animate-fadeIn">
            <p className="font-semibold text-blue-400 mb-1 flex items-center gap-2">
              <Info size={14} /> When to dial:
            </p>
            {description}
          </div>
        )}
        
        <div className="mt-auto">
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{category}</span>
              <span className="text-2xl font-black text-slate-200 tracking-tight">{number}</span>
            </div>
            <a 
              href={`tel:${number}`}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white shadow-lg hover:shadow-xl active:scale-95 transition-all ${colorClass}`}
            >
              <Phone size={18} />
              <span>Call</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyCard;