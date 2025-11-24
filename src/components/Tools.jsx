import { 
  Phone, ShieldAlert, MessageCircle, Navigation, Volume2, VolumeX, 
  Save, CheckCircle, MapPin, ExternalLink, Copy, AlertTriangle,
  Ambulance, HeartHandshake, Flame,
  UserPlus, User, Edit2, Trash2 // <--- ADD THESE NEW ONES
} from 'lucide-react';
import React, { useState, useRef } from 'react';

// --- SOS Component ---


// --- SOS Component (Upgraded) ---
export const SOSWhatsApp = () => {
  const [contact, setContact] = useState(() => localStorage.getItem('emergency_contact') || '');
  const [name, setName] = useState(() => localStorage.getItem('emergency_name') || '');
  const [isEditing, setIsEditing] = useState(!contact); // Edit mode if no contact saved
  const [saved, setSaved] = useState(false);

  const saveDetails = () => {
    if (!contact || contact.length < 10) return alert("Please enter a valid number");
    localStorage.setItem('emergency_contact', contact);
    localStorage.setItem('emergency_name', name || 'Trusted Contact');
    setSaved(true);
    setIsEditing(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const clearDetails = () => {
    localStorage.removeItem('emergency_contact');
    localStorage.removeItem('emergency_name');
    setContact('');
    setName('');
    setIsEditing(true);
  };

  const sendSOS = () => {
    if (!contact) return alert('Please save a contact first.');
    const trigger = (lat, long) => {
        const link = lat ? `http://googleusercontent.com/maps.google.com/?q=${lat},${long}` : 'Unknown Location';
        const msg = encodeURIComponent(`SOS! I need help! My location: ${link}`);
        window.open(`https://wa.me/${contact}?text=${msg}`, '_blank');
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) => trigger(p.coords.latitude, p.coords.longitude),
        () => trigger(null, null)
      );
    } else { trigger(null, null); }
  };

  return (
    <div className="glass-card rounded-3xl p-8 h-full flex flex-col justify-center min-h-[320px] relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 relative z-10">
        <div className="bg-green-500/20 p-3 rounded-full text-green-400 shadow-sm">
          <MessageCircle size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white leading-none">Quick SOS</h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">WhatsApp Alert</p>
        </div>
      </div>

      {isEditing ? (
        // EDIT MODE: Inputs
        <div className="flex flex-col gap-3 mb-6 relative z-10 animate-fadeIn">
          <div className="relative">
            <User size={18} className="absolute left-4 top-4 text-slate-500" />
            <input 
              type="text" placeholder="Name (e.g. Dad, Mom)" value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-11 p-4 border border-slate-600 rounded-2xl bg-slate-800 text-white focus:ring-2 focus:ring-green-500/50 outline-none transition-all placeholder-slate-500"
            />
          </div>
          <div className="relative">
             <Phone size={18} className="absolute left-4 top-4 text-slate-500" />
            <input 
              type="number" placeholder="Number (e.g. 9198...)" value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full pl-11 p-4 border border-slate-600 rounded-2xl bg-slate-800 text-white focus:ring-2 focus:ring-green-500/50 outline-none transition-all placeholder-slate-500"
            />
          </div>
          <button onClick={saveDetails} className="bg-slate-700 text-white p-4 rounded-2xl hover:bg-green-600 hover:text-white transition-all font-bold flex items-center justify-center gap-2 border border-slate-600 mt-2">
            <Save size={20} /> Save Trusted Contact
          </button>
        </div>
      ) : (
        // SAVED MODE: Display Name
        <div className="bg-slate-800/50 rounded-2xl p-4 mb-6 border border-slate-700 relative z-10 animate-fadeIn flex justify-between items-center group">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-lg">
                    {name ? name[0].toUpperCase() : <User size={20}/>}
                </div>
                <div>
                    <p className="text-slate-200 font-bold text-lg">{name || 'Trusted Contact'}</p>
                    <p className="text-slate-400 text-sm tracking-widest">{contact}</p>
                </div>
            </div>
            <div className="flex gap-2">
                <button onClick={() => setIsEditing(true)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"><Edit2 size={18}/></button>
                <button onClick={clearDetails} className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors"><Trash2 size={18}/></button>
            </div>
        </div>
      )}

      {/* SOS Button */}
      <button 
        onClick={sendSOS} 
        disabled={isEditing}
        className={`w-full font-bold py-5 rounded-2xl shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 text-lg relative z-10 ${isEditing ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500 text-white shadow-green-900/30 hover:-translate-y-1'}`}
      >
        <MessageCircle size={24} /> 
        {isEditing ? 'Save Contact First' : `Alert ${name || 'Contact'}`}
      </button>

      {/* Decorative Background */}
      <div className="absolute -right-6 -bottom-6 opacity-5 z-0 rotate-12 pointer-events-none">
        <MessageCircle size={140} />
      </div>
    </div>
  );
};

// --- Siren Component ---
export const SirenTool = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const intervalRef = useRef(null);

  const toggleSiren = () => {
    if (isPlaying) {
      if (oscillatorRef.current) oscillatorRef.current.stop();
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsPlaying(false);
    } else {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
      const osc = audioContextRef.current.createOscillator();
      const gain = audioContextRef.current.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, audioContextRef.current.currentTime);
      osc.frequency.linearRampToValueAtTime(1200, audioContextRef.current.currentTime + 0.5);
      intervalRef.current = setInterval(() => {
        if(osc && audioContextRef.current) {
            osc.frequency.setValueAtTime(800, audioContextRef.current.currentTime);
            osc.frequency.linearRampToValueAtTime(1200, audioContextRef.current.currentTime + 0.5);
        }
      }, 600);
      osc.connect(gain);
      gain.connect(audioContextRef.current.destination);
      osc.start();
      oscillatorRef.current = osc;
      setIsPlaying(true);
    }
  };

  return (
    <button onClick={toggleSiren} className={`fixed bottom-8 right-8 z-50 rounded-full p-6 shadow-2xl transition-all duration-300 border-4 border-slate-800 ${isPlaying ? 'bg-red-600 animate-pulse scale-110 shadow-red-900/50' : 'bg-slate-800 hover:bg-slate-700 hover:scale-105 shadow-black/50'}`}>
      {isPlaying ? <Volume2 className="text-white" size={32} /> : <VolumeX className="text-white" size={32} />}
    </button>
  );
};

// --- Location Component ---
export const LocationTool = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const getLocation = () => {
    setLoading(true); setLocation(null);
    navigator.geolocation.getCurrentPosition(
      (p) => {
        const mapsLink = `http://googleusercontent.com/maps.google.com/?q=${p.coords.latitude},${p.coords.longitude}`;
        setLocation({ mapsLink }); setLoading(false);
      },
      () => { alert('GPS Error'); setLoading(false); }
    );
  };

  return (
    <div className="glass-card rounded-3xl p-8 mb-0">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-red-500/20 p-3 rounded-full text-red-400 shadow-sm"><MapPin size={28} /></div>
        <h2 className="text-2xl font-bold text-white">My Coordinates</h2>
      </div>
      {!location ? (
        <button onClick={getLocation} disabled={loading} className="w-full bg-slate-700 text-white border border-slate-600 px-8 py-5 rounded-2xl font-bold hover:bg-slate-600 transition-all active:scale-95 disabled:opacity-50 text-lg shadow-lg">
          {loading ? 'Locating...' : 'Get Current Location'}
        </button>
      ) : (
        <div className="animate-fadeIn">
          <div className="flex flex-col gap-4">
            <a href={location.mapsLink} target="_blank" className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-2xl font-bold shadow-lg hover:bg-blue-500 active:scale-95 transition-all text-lg">
              <ExternalLink size={20} /> Open Maps
            </a>
            <button onClick={() => { navigator.clipboard.writeText(location.mapsLink); setCopied(true); }} className="w-full flex items-center justify-center gap-2 bg-slate-800 border border-slate-600 text-slate-300 px-6 py-4 rounded-2xl font-bold hover:bg-slate-700 transition-all active:scale-95">
              {copied ? <CheckCircle size={20} /> : <Copy size={20} />} {copied ? 'Copied' : 'Copy Link'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Nearby Component ---
export const NearbyServices = () => {
    const openMap = (q) => window.open(`http://googleusercontent.com/maps.google.com/search?q=${q}+near+me`, '_blank');
    return (
        <div className="glass-card rounded-3xl p-8 mb-0">
            <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-500/20 p-3 rounded-full text-blue-400 shadow-sm"><Navigation size={28} /></div>
                <h2 className="text-2xl font-bold text-white">Find Nearby</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <button onClick={() => openMap('Hospital')} className="flex flex-col items-center justify-center gap-3 p-5 bg-red-900/30 text-red-300 border border-red-500/30 rounded-2xl hover:bg-red-900/50 transition-colors font-bold active:scale-95 hover:shadow-lg"><Ambulance size={28}/> Hospitals</button>
                <button onClick={() => openMap('Police Station')} className="flex flex-col items-center justify-center gap-3 p-5 bg-blue-900/30 text-blue-300 border border-blue-500/30 rounded-2xl hover:bg-blue-900/50 transition-colors font-bold active:scale-95 hover:shadow-lg"><ShieldAlert size={28}/> Police</button>
                <button onClick={() => openMap('Pharmacy')} className="flex flex-col items-center justify-center gap-3 p-5 bg-green-900/30 text-green-300 border border-green-500/30 rounded-2xl hover:bg-green-900/50 transition-colors font-bold active:scale-95 hover:shadow-lg"><HeartHandshake size={28}/> Pharmacy</button>
                <button onClick={() => openMap('Fire Station')} className="flex flex-col items-center justify-center gap-3 p-5 bg-orange-900/30 text-orange-300 border border-orange-500/30 rounded-2xl hover:bg-orange-900/50 transition-colors font-bold active:scale-95 hover:shadow-lg"><Flame size={28}/> Fire Stn</button>
            </div>
        </div>
    )
}