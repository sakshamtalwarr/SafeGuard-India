import React, { useState } from 'react';
import { 
  ShieldAlert, Ambulance, Flame, HeartHandshake, Baby, Globe, Train, 
  PawPrint, Trees, Phone, BookOpen, X, HeartPulse, AlertTriangle, UserCheck, ExternalLink, 
  Smile, Car, Briefcase, Info, UserPlus // <--- ADDED UserPlus HERE!
} from 'lucide-react';

import Header from './components/Header';
import EmergencyCard from './components/EmergencyCard';
import { SOSWhatsApp, SirenTool, LocationTool, NearbyServices } from './components/Tools';

// --- Tips Modal ---
const TipsModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('medical');

  if (!isOpen) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'medical':
        return (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-red-50 p-4 rounded-xl border border-red-100">
              <h3 className="font-bold text-red-800 flex items-center gap-2"><HeartPulse size={18}/> Heart Attack</h3>
              <ul className="text-sm text-slate-700 mt-2 space-y-1 list-disc pl-4">
                <li><strong>Call 108/112 immediately.</strong></li>
                <li>Make the person sit down and relax (knees bent).</li>
                <li>Ask if they are allergic to Aspirin. If not, give them one to <strong>chew</strong> slowly.</li>
                <li>If unconscious and not breathing, start <strong>CPR</strong> (Push hard and fast in center of chest).</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
              <h3 className="font-bold text-orange-800 flex items-center gap-2"><Flame size={18}/> Burns</h3>
              <ul className="text-sm text-slate-700 mt-2 space-y-1 list-disc pl-4">
                <li>Hold under <strong>cool running water</strong> for 20 minutes.</li>
                <li><strong>DO NOT</strong> use ice, butter, or toothpaste.</li>
                <li>Cover loosely with cling film or a clean plastic bag to prevent infection.</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <h3 className="font-bold text-blue-800 flex items-center gap-2"><UserCheck size={18}/> Choking</h3>
              <ul className="text-sm text-slate-700 mt-2 space-y-1 list-disc pl-4">
                <li>Encourage them to cough.</li>
                <li>Give 5 sharp <strong>back blows</strong> between shoulder blades.</li>
                <li>Give 5 abdominal thrusts (Heimlich maneuver).</li>
              </ul>
            </div>
          </div>
        );
      case 'fire':
        return (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 bg-slate-100 rounded-xl">
                <h3 className="font-bold text-slate-800">General Fire Rules</h3>
                <ul className="text-sm text-slate-600 mt-2 space-y-2">
                    <li>🔥 <strong>Stop, Drop, and Roll:</strong> If clothes catch fire, do not run. Cover face, drop to ground, and roll.</li>
                    <li>🌫️ <strong>Stay Low:</strong> Smoke rises. Crawl on hands and knees where air is cleaner.</li>
                    <li>🚪 <strong>Check Doors:</strong> Use back of hand to touch door handles. If hot, DO NOT OPEN.</li>
                </ul>
            </div>
            <div className="p-4 bg-red-50 rounded-xl border border-red-100 text-sm text-red-800">
                <strong>Using an Extinguisher (P.A.S.S):</strong>
                <br/>1. <strong>P</strong>ull the pin.
                <br/>2. <strong>A</strong>im at the base of fire.
                <br/>3. <strong>S</strong>queeze the handle.
                <br/>4. <strong>S</strong>weep side to side.
            </div>
          </div>
        );
      case 'disaster':
        return (
          <div className="space-y-4 animate-fadeIn">
             <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                <h3 className="font-bold text-yellow-800">Earthquake</h3>
                <p className="text-sm text-slate-700 mt-1"><strong>Drop, Cover, and Hold On.</strong></p>
                <ul className="text-sm text-slate-700 mt-2 list-disc pl-4">
                    <li><strong>Indoors:</strong> Get under a sturdy table. Stay away from glass/windows.</li>
                    <li><strong>Outdoors:</strong> Move to clear area away from buildings, trees, and power lines.</li>
                    <li><strong>Driving:</strong> Pull over to a clear spot and stay inside car.</li>
                </ul>
             </div>
             <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <h3 className="font-bold text-blue-800">Dog Attack</h3>
                <ul className="text-sm text-slate-700 mt-2 list-disc pl-4">
                    <li><strong>Do Not Run.</strong> This triggers their chase instinct.</li>
                    <li>Stand still like a tree ("Be boring").</li>
                    <li>Avoid direct eye contact (seen as aggression).</li>
                    <li>Back away slowly once the dog loses interest.</li>
                </ul>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/80 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] overflow-hidden shadow-2xl border border-slate-600 flex flex-col">
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
            <BookOpen className="text-blue-600" /> Safety Protocols
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex border-b border-slate-100">
            <button onClick={() => setActiveTab('medical')} className={`flex-1 py-3 text-sm font-bold transition-colors ${activeTab === 'medical' ? 'text-red-600 border-b-2 border-red-600 bg-red-50' : 'text-slate-500 hover:bg-slate-50'}`}>Medical</button>
            <button onClick={() => setActiveTab('fire')} className={`flex-1 py-3 text-sm font-bold transition-colors ${activeTab === 'fire' ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50' : 'text-slate-500 hover:bg-slate-50'}`}>Fire</button>
            <button onClick={() => setActiveTab('disaster')} className={`flex-1 py-3 text-sm font-bold transition-colors ${activeTab === 'disaster' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-slate-500 hover:bg-slate-50'}`}>Disaster</button>
        </div>

        <div className="p-6 overflow-y-auto bg-white">
            {renderContent()}
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 text-right">
          <button onClick={onClose} className="bg-slate-800 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-slate-900 w-full md:w-auto transition-colors">
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Application ---
const SafeGuardIndia = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [showTips, setShowTips] = useState(false);

  const emergencyData = [
    { id: 1, title: "Pan-India Emergency", number: "112", icon: ShieldAlert, category: "General", description: "All-in-one number for Police, Fire, Ambulance.", colorClass: "bg-red-600" },
    { id: 2, title: "Police Helpline", number: "100", icon: ShieldAlert, category: "Police", description: "Standard police emergency line.", colorClass: "bg-blue-700" },
    { id: 3, title: "Ambulance (Medical)", number: "108", icon: Ambulance, category: "Medical", description: "General medical emergency ambulance.", colorClass: "bg-emerald-600" },
    { id: 18, title: "Pregnancy Ambulance", number: "102", icon: Ambulance, category: "Medical", description: "Free ambulance for pregnant women & infants (Janani Express).", colorClass: "bg-pink-500" },
    { id: 4, title: "Fire Brigade", number: "101", icon: Flame, category: "Fire", description: "For fire outbreaks or gas leaks.", colorClass: "bg-orange-600" },
    { id: 5, title: "Women's Helpline", number: "1091", icon: HeartHandshake, category: "Women", description: "24/7 helpline for women in distress.", colorClass: "bg-pink-600" },
    { id: 6, title: "Domestic Violence", number: "181", icon: HeartHandshake, category: "Women", description: "Counseling and aid for abuse.", colorClass: "bg-purple-600" },
    { id: 9, title: "Child Helpline", number: "1098", icon: Baby, category: "Children", description: "Reporting child labor or abuse.", colorClass: "bg-amber-500" },
    { id: 19, title: "Elder Line", number: "14567", icon: UserPlus, category: "Seniors", description: "Govt helpline for senior citizens (Rescue & Abuse).", colorClass: "bg-teal-600" },
    { id: 20, title: "Mental Health", number: "14416", icon: Smile, category: "Mental Health", description: "Tele MANAS: Free 24/7 mental health counseling.", colorClass: "bg-indigo-500" },
    { id: 21, title: "Highway Helpline", number: "1033", icon: Car, category: "Travel", description: "NHAI helpline for accidents on National Highways.", colorClass: "bg-orange-500" },
    { id: 10, title: "Cyber Crime", number: "1930", icon: Globe, category: "Cyber", description: "Online fraud and harassment.", colorClass: "bg-indigo-600" },
    { id: 12, title: "Railway Security", number: "139", icon: Train, category: "Travel", description: "Help on trains.", colorClass: "bg-blue-800" },
    { id: 14, title: "Animal Ambulance", number: "1962", icon: PawPrint, category: "Animals", description: "Govt Veterinary Unit.", colorClass: "bg-yellow-600" },
    { id: 16, title: "Wildlife SOS", number: "9871963535", icon: Trees, category: "Animals", description: "Wild animal rescue.", colorClass: "bg-green-700" },
    { id: 22, title: "Consumer Helpline", number: "1915", icon: Briefcase, category: "General", description: "For consumer grievances and fraud.", colorClass: "bg-slate-600" }
  ];

  const categories = ['All', 'General', 'Medical', 'Women', 'Seniors', 'Children', 'Mental Health', 'Travel', 'Animals', 'Cyber'];

  const filteredData = emergencyData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.number.includes(searchTerm) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || item.category === filter || (filter === 'General' && (item.category === 'Police' || item.category === 'Fire'));
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen pb-20 relative overflow-x-hidden">
      <SirenTool />
      
      <Header 
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        filter={filter} setFilter={setFilter}
        setShowTips={setShowTips} categories={categories}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 mb-16">
          <div className="flex flex-col gap-8 order-2 lg:order-1">
             <LocationTool />
             <NearbyServices />
          </div>
          
          <div className="flex flex-col gap-8 lg:col-span-2 order-1 lg:order-2">
            <div className="flex flex-col md:grid md:grid-cols-2 gap-8 h-full">
              <SOSWhatsApp />
               <div className="glass-card rounded-3xl p-8 bg-gradient-to-br from-blue-600 to-indigo-900 text-white flex flex-col justify-between relative overflow-hidden border-none shadow-2xl min-h-[320px]">
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <h2 className="text-3xl font-black mb-3 tracking-tight">Panic Mode</h2>
                      <p className="text-blue-100 text-base mb-8 opacity-90 leading-relaxed font-medium">
                        In extreme danger, dial <span className="font-bold text-white">112</span>. It connects to Police, Fire, & Ambulance simultaneously.
                      </p>
                    </div>
                    <a href="tel:112" className="inline-flex items-center gap-3 bg-white text-blue-700 px-8 py-5 rounded-2xl font-black shadow-xl hover:bg-blue-50 transition-all active:scale-95 w-full justify-center text-xl group">
                      <Phone size={28} className="group-hover:animate-bounce" /> Dial 112
                    </a>
                  </div>
                  <div className="absolute -bottom-12 -right-12 opacity-10 rotate-12">
                    <ShieldAlert size={240} />
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="mb-8 pl-4 border-l-8 border-white">
           <h2 className="text-3xl font-black text-white tracking-tight">Helpline Directory</h2>
           <p className="text-slate-400 font-medium mt-1">Direct access to national emergency services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredData.map(item => (
            <EmergencyCard key={item.id} {...item} />
          ))}
        </div>

      </main>
      
      <TipsModal isOpen={showTips} onClose={() => setShowTips(false)} />

      {/* Footer */}
    {/* Footer */}
      <footer className="mt-20 py-8 border-t border-white/10 bg-slate-900/50 backdrop-blur-md">
        <div className="text-center">
            <p className="text-slate-400 font-medium text-sm flex flex-col sm:flex-row justify-center items-center gap-2">
              <span>Designed & Developed by 
                <a href="https://sakshamtalwarr.github.io/Portfolio/" target="_blank" rel="noreferrer" className="font-bold text-white ml-1 hover:text-blue-400 transition-colors underline decoration-blue-500/50 underline-offset-4">Saksham</a>
              </span>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span>
                <a href="https://sakshamtalwarr.github.io/Portfolio/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                   Connect for features/issues <ExternalLink size={12} />
                </a>
              </span>
            </p>
            
            <div className="mt-4">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Verified Data Sources</p>
                <div className="flex justify-center gap-4 text-xs text-slate-400 flex-wrap px-4">
                    <a href="https://mohfw.gov.in/" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">MoHFW</a>
                    <a href="https://socialjustice.gov.in/" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">Social Justice Ministry</a>
                    <a href="https://morth.nic.in/" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">MoRTH (Highways)</a>
                    <a href="https://cybercrime.gov.in/" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">CyberCrime.gov</a>
                </div>
            </div>

            <p className="text-xs text-slate-600 mt-6">© {new Date().getFullYear()} SafeGuard India. All rights reserved.</p>
            
            {/* VISITOR COUNTER BADGE */}
            <div className="mt-4 flex justify-center opacity-50 hover:opacity-100 transition-opacity">
               {/* Reliable Visitor Counter Badge */}
{/* Robust Visitor Counter */}
            <div className="mt-6 flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">Live Visits</span>
                <img 
                  src="https://komarev.com/ghpvc/?username=safeguard-india-live&label=VIEWS&color=0e75b6&style=for-the-badge" 
                  alt="SafeGuard Views" 
                  className="h-6 rounded shadow-lg shadow-blue-900/20"
                />
            </div>
            </div>

        </div>
      </footer>
    </div>
  );
};

export default SafeGuardIndia;