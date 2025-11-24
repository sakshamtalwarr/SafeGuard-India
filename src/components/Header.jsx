import React from 'react';
import { ShieldAlert, BookOpen, Search } from 'lucide-react';

const Header = ({ searchTerm, setSearchTerm, filter, setFilter, setShowTips, categories }) => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 border-b border-white/10 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-600/90 p-3 rounded-2xl shadow-lg shadow-red-900/50">
                <ShieldAlert size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-white">SafeGuard India</h1>
                <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">Emergency Directory</p>
              </div>
            </div>
            <button onClick={() => setShowTips(true)} className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-5 py-3 rounded-xl transition-all font-semibold active:scale-95">
              <BookOpen size={18} /> Safety Tips
            </button>
          </div>

          <div className="relative group">
            <input 
              type="text" placeholder="Search services..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:bg-slate-800 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
            />
            <Search className="absolute left-4 top-4 text-slate-500" size={20} />
          </div>
        </div>
        
        <div className="border-t border-slate-800 bg-slate-900/50">
          <div className="max-w-6xl mx-auto px-4 overflow-x-auto no-scrollbar py-3">
            <div className="flex gap-2">
              {categories.map(cat => (
                <button key={cat} onClick={() => setFilter(cat)}
                  className={`px-6 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                    filter === cat ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-900/50' : 'bg-transparent text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>
  );
};
export default Header;