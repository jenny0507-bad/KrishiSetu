import React, { useState, useRef, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import { 
  Droplets, Thermometer, Wind, AlertTriangle, CheckCircle2, 
  TrendingUp, TrendingDown, Calendar, MapPin, Phone, Video, 
  MessageSquare, Mic, Camera, FileText, Play, Languages,
  Tractor, Sprout, Beaker, Recycle, X, Paperclip, Search, Filter, CreditCard, User, Star, Truck, Plus, Send, Bot, Sun, Cloud,
  Briefcase, Clock, ShieldCheck, ChevronLeft, ChevronRight, Users
} from 'lucide-react';
import { MOCK_CROPS, MOCK_WORKERS, MOCK_NEWS, MOCK_VIDEOS, MOCK_PRICE_TRENDS, MOCK_PESTICIDES, MOCK_SHOPS, MOCK_CHATS, CROP_DETAILS, MOCK_CONTRACTORS, MOCK_TRADE_STATS } from '../mockData';
import { UserRole, Message, Worker, Contractor } from '../types';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';

// --- Marketplace Hub ---
const MarketplaceHub: React.FC<{ userRole: UserRole, initialTab?: 'Crops' | 'Machinery' | 'Pesticides' }> = ({ userRole, initialTab = 'Crops' }) => {
  const [activeMarket, setActiveMarket] = useState<'Crops' | 'Machinery' | 'Pesticides'>(initialTab);

  return (
    <div className="space-y-6">
      {/* Marketplace Sub-Nav Bar */}
      <div className="flex items-center gap-2 p-2 glass-card rounded-[32px] sticky top-20 z-30 shadow-md">
        {[
          { id: 'Crops', icon: Sprout, label: 'Crops' },
          { id: 'Machinery', icon: Tractor, label: 'Machinery' },
          { id: 'Pesticides', icon: Beaker, label: 'Pesticides' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveMarket(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-all ${activeMarket === tab.id ? 'bg-agri-green text-white shadow-lg' : 'hover:bg-black/5 opacity-60'}`}
          >
            <tab.icon size={18} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeMarket}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {activeMarket === 'Crops' && <Marketplace userRole={userRole} />}
          {activeMarket === 'Machinery' && <Machinery />}
          {activeMarket === 'Pesticides' && <Pesticides />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// --- Marketplace ---
const Marketplace: React.FC<{ userRole: UserRole }> = ({ userRole }) => {
  const [showVerification, setShowVerification] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Crops', 'Seeds', 'Spices', 'Grains', 'Vegetables'];

  const handleBuy = () => {
    if (userRole === 'Buyer') {
      setShowVerification(true);
    } else {
      alert('Only Buyers can purchase crops. Please switch your role in Profile.');
    }
  };

  const filteredCrops = activeCategory === 'All' 
    ? MOCK_CROPS 
    : MOCK_CROPS.filter(crop => crop.category === activeCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Crop Marketplace</h2>
        <button className="p-2 bg-agri-green text-white rounded-full"><Plus size={20} /></button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-agri-green text-white' : 'bg-black/5 opacity-60'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredCrops.map(crop => (
          <div key={crop.id} className="glass-card rounded-[32px] overflow-hidden flex flex-col shadow-sm group">
            <div className="relative h-48">
              <img src={crop.image} alt={crop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-agri-green shadow-sm">
                Grade {crop.grade}
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{crop.name}</h3>
                  <div className="flex items-center gap-4 text-xs opacity-60">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {crop.location}</span>
                    <span className="flex items-center gap-1"><Recycle size={12} /> {crop.quantity}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-agri-green">₹{crop.price}</p>
                  <p className="text-[10px] opacity-50 uppercase font-bold">Market Price</p>
                </div>
              </div>

              <div className="p-4 bg-agri-green/5 rounded-2xl border border-agri-green/10 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Bot size={16} className="text-agri-green" />
                  <span className="text-xs font-bold text-agri-green uppercase tracking-wider">AI Market Insights</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] opacity-50 uppercase font-bold">Best Sell Price</p>
                    <p className="font-bold text-agri-green">₹{(crop.price * 1.05).toFixed(0)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] opacity-50 uppercase font-bold">Price Prediction</p>
                    <p className="font-bold text-blue-600 flex items-center gap-1">
                      <TrendingUp size={14} /> +4.2%
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={handleBuy}
                  className="flex-1 py-3 bg-agri-green text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-transform"
                >
                  Buy Now
                </button>
                <button 
                  className="flex-1 py-3 border-2 border-agri-green text-agri-green rounded-2xl font-bold active:scale-95 transition-transform"
                >
                  Sell Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showVerification && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
          <div className="glass-card w-full max-w-sm rounded-[40px] p-8 text-center">
            <div className="w-20 h-20 bg-agri-green/10 text-agri-green rounded-3xl flex items-center justify-center mx-auto mb-6">
              <FileText size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Verify Account</h3>
            <p className="opacity-70 mb-8 text-sm">Buyers must upload legal verification documents before purchasing crops.</p>
            <div className="space-y-3 mb-8">
              <button className="w-full py-4 border-2 border-dashed border-agri-green/30 rounded-2xl flex items-center justify-center gap-2 text-agri-green font-bold text-sm">
                <Plus size={18} /> Upload GST/ID Proof
              </button>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowVerification(false)} className="flex-1 py-4 bg-black/5 rounded-2xl font-bold">Cancel</button>
              <button onClick={() => setShowVerification(false)} className="flex-1 py-4 bg-agri-green text-white rounded-2xl font-bold">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Worker Profile ---
const WorkerProfile: React.FC<{ worker: Worker, onBack: () => void }> = ({ worker, onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-agri-green font-bold hover:opacity-70 transition-opacity mb-4"
      >
        <ChevronLeft size={20} /> Back to Workers
      </button>

      <div className="glass-card rounded-[40px] p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-agri-green/5 rounded-full -mr-20 -mt-20 blur-3xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-32 h-32 rounded-[32px] bg-agri-green/5 flex items-center justify-center text-6xl shadow-inner border-4 border-white">
            {worker.photo}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2 justify-center md:justify-start">
              <h2 className="text-3xl font-bold">{worker.name}</h2>
              {worker.verified && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/10 text-blue-600 rounded-full text-xs font-bold">
                  <ShieldCheck size={14} /> Verified
                </span>
              )}
            </div>
            <p className="text-agri-green font-bold text-lg mb-4">{worker.skill}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
              <div className="flex items-center gap-1 text-yellow-500 font-bold">
                <Star size={18} fill="currentColor" /> {worker.rating}
              </div>
              <div className="flex items-center gap-1 opacity-60 text-sm">
                <MapPin size={18} /> {worker.location}
              </div>
              <div className="flex items-center gap-1 opacity-60 text-sm">
                <Clock size={18} /> {worker.distance} away
              </div>
            </div>

            <div className="flex gap-3 justify-center md:justify-start">
              <button className="px-8 py-3 bg-agri-green text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-all flex items-center gap-2">
                <Phone size={20} /> Call Now
              </button>
              <button className="px-8 py-3 bg-white border border-agri-green/20 text-agri-green rounded-2xl font-bold shadow-sm active:scale-95 transition-all flex items-center gap-2">
                <MessageSquare size={20} /> Message
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-[32px] text-center">
          <p className="text-3xl font-bold text-agri-green">{worker.experience}y</p>
          <p className="text-xs opacity-60 uppercase font-bold mt-1">Experience</p>
        </div>
        <div className="glass-card p-6 rounded-[32px] text-center">
          <p className="text-3xl font-bold text-agri-green">{worker.completedProjects}</p>
          <p className="text-xs opacity-60 uppercase font-bold mt-1">Jobs Done</p>
        </div>
        <div className="glass-card p-6 rounded-[32px] text-center">
          <p className="text-3xl font-bold text-agri-green">₹{worker.wage}</p>
          <p className="text-xs opacity-60 uppercase font-bold mt-1">Daily Wage</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-8 rounded-[32px] space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <User size={20} className="text-agri-green" /> About
          </h3>
          <p className="opacity-70 leading-relaxed">{worker.bio}</p>
          
          <div className="pt-4 border-t border-black/5">
            <h4 className="font-bold text-sm mb-3">Languages</h4>
            <div className="flex flex-wrap gap-2">
              {worker.languages.map(lang => (
                <span key={lang} className="px-3 py-1 bg-black/5 rounded-full text-xs font-medium">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card p-8 rounded-[32px] space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Briefcase size={20} className="text-agri-green" /> Work Status
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-white/50 rounded-2xl border border-black/5">
              <span className="font-medium">Availability</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${worker.availability ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {worker.availability ? 'Available Now' : 'Busy'}
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-white/50 rounded-2xl border border-black/5">
              <span className="font-medium">Preferred Work</span>
              <span className="text-sm opacity-70">{worker.skill}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-white/50 rounded-2xl border border-black/5">
              <span className="font-medium">Identity Status</span>
              <span className="text-sm text-blue-600 font-bold">Aadhar Verified</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Contractor Profile ---
const ContractorProfile: React.FC<{ contractor: Contractor, onBack: () => void, onWorkerClick: (worker: Worker) => void }> = ({ contractor, onBack, onWorkerClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-agri-green font-bold hover:opacity-70 transition-opacity mb-4"
      >
        <ChevronLeft size={20} /> Back to Contractors
      </button>

      <div className="glass-card rounded-[40px] p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-agri-green/5 rounded-full -mr-20 -mt-20 blur-3xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-32 h-32 rounded-[32px] bg-agri-green/5 flex items-center justify-center text-6xl shadow-inner border-4 border-white">
            {contractor.photo}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2 justify-center md:justify-start">
              <h2 className="text-3xl font-bold">{contractor.name}</h2>
              {contractor.verified && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/10 text-blue-600 rounded-full text-xs font-bold">
                  <ShieldCheck size={14} /> Verified Contractor
                </span>
              )}
            </div>
            <p className="text-agri-green font-bold text-lg mb-4">{contractor.companyName}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
              <div className="flex items-center gap-1 text-yellow-500 font-bold">
                <Star size={18} fill="currentColor" /> {contractor.rating}
              </div>
              <div className="flex items-center gap-1 opacity-60 text-sm">
                <MapPin size={18} /> {contractor.location}
              </div>
              <div className="flex items-center gap-1 opacity-60 text-sm">
                <Users size={18} /> Team Size: {contractor.teamSize}
              </div>
            </div>

            <div className="flex gap-3 justify-center md:justify-start">
              <button className="px-8 py-3 bg-agri-green text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-all flex items-center gap-2">
                <Phone size={20} /> Contact Company
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2 px-2">
          <Users size={20} className="text-agri-green" /> Managed Team ({contractor.teamSize} Workers)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contractor.team.map(worker => (
            <div 
              key={worker.id} 
              onClick={() => onWorkerClick(worker)}
              className="glass-card rounded-[32px] p-4 flex items-center gap-4 shadow-sm cursor-pointer hover:scale-[1.02] transition-transform border border-white/20"
            >
              <div className="w-16 h-16 rounded-2xl bg-agri-green/5 flex items-center justify-center text-3xl shadow-inner">
                {worker.photo}
              </div>
              <div className="flex-1">
                <h4 className="font-bold">{worker.name}</h4>
                <p className="text-xs opacity-60">{worker.skill}</p>
                <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold mt-1">
                  <Star size={12} fill="currentColor" /> {worker.rating}
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-agri-green">ID: {worker.id}</p>
                <ChevronLeft size={16} className="rotate-180 opacity-30 ml-auto mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-8 rounded-[32px] space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <User size={20} className="text-agri-green" /> Company Profile
        </h3>
        <p className="opacity-70 leading-relaxed">{contractor.bio}</p>
      </div>
    </motion.div>
  );
};

// --- Workers ---
const Workers: React.FC = () => {
  const [showRating, setShowRating] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [viewingProfile, setViewingProfile] = useState<Worker | null>(null);
  const [viewingContractor, setViewingContractor] = useState<Contractor | null>(null);
  const [activeTab, setActiveTab] = useState<'Individual' | 'Contractors'>('Individual');

  if (viewingProfile) {
    return <WorkerProfile worker={viewingProfile} onBack={() => setViewingProfile(null)} />;
  }

  if (viewingContractor) {
    return (
      <ContractorProfile 
        contractor={viewingContractor} 
        onBack={() => setViewingContractor(null)} 
        onWorkerClick={(worker) => setViewingProfile(worker)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Hire Workforce</h2>
        <div className="flex gap-2">
          <button className="p-2 glass-card rounded-full"><Search size={20} /></button>
          <button className="p-2 glass-card rounded-full"><Filter size={20} /></button>
        </div>
      </div>

      <div className="flex gap-2 p-1 bg-black/5 rounded-2xl w-fit">
        {(['Individual', 'Contractors'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${activeTab === tab ? 'bg-white shadow-sm text-agri-green' : 'opacity-50'}`}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div className="space-y-4">
        {activeTab === 'Individual' ? (
          MOCK_WORKERS.map(worker => (
            <div 
              key={worker.id} 
              onClick={() => setViewingProfile(worker)}
              className="glass-card rounded-[32px] p-4 flex items-center gap-4 shadow-sm cursor-pointer hover:scale-[1.01] transition-transform"
            >
              <div className="w-20 h-20 rounded-2xl bg-agri-green/5 flex items-center justify-center text-4xl shadow-inner">
                {worker.photo}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg">{worker.name}</h3>
                    {worker.verified && <ShieldCheck size={16} className="text-blue-500" />}
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 font-bold">
                    <Star size={14} fill="currentColor" /> {worker.rating}
                  </div>
                </div>
                <p className="text-sm opacity-70 mb-2">{worker.skill}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-agri-green">₹{worker.wage}/day</span>
                  <span className="text-xs opacity-50">{worker.distance} away</span>
                </div>
              </div>
              <button 
                onClick={(e) => { 
                  e.stopPropagation();
                  setSelectedWorker(worker); 
                  setShowRating(true); 
                }}
                className="p-3 bg-agri-green/10 text-agri-green rounded-2xl active:scale-95 transition-transform"
              >
                <Star size={20} />
              </button>
            </div>
          ))
        ) : (
          MOCK_CONTRACTORS.map(contractor => (
            <div 
              key={contractor.id} 
              onClick={() => setViewingContractor(contractor)}
              className="glass-card rounded-[32px] p-6 flex items-center gap-6 shadow-sm cursor-pointer hover:scale-[1.01] transition-transform border-l-4 border-agri-green"
            >
              <div className="w-24 h-24 rounded-3xl bg-agri-green/5 flex items-center justify-center text-5xl shadow-inner">
                {contractor.photo}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xl">{contractor.name}</h3>
                    <p className="text-agri-green font-bold text-sm">{contractor.companyName}</p>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 font-bold">
                    <Star size={16} fill="currentColor" /> {contractor.rating}
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-1 text-xs opacity-60">
                    <Users size={14} /> {contractor.teamSize} Workers
                  </div>
                  <div className="flex items-center gap-1 text-xs opacity-60">
                    <MapPin size={14} /> {contractor.location}
                  </div>
                  {contractor.verified && (
                    <div className="flex items-center gap-1 text-xs text-blue-600 font-bold">
                      <ShieldCheck size={14} /> Verified
                    </div>
                  )}
                </div>
              </div>
              <ChevronLeft size={24} className="rotate-180 opacity-20" />
            </div>
          ))
        )}
      </div>

      {showRating && selectedWorker && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
          <div className="glass-card w-full max-sm rounded-[40px] p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Rate {selectedWorker.name}</h3>
            <p className="opacity-70 mb-6">How was your experience?</p>
            <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3, 4, 5].map(star => (
                <button key={star} className="text-yellow-500"><Star size={32} fill={star <= 4 ? "currentColor" : "none"} /></button>
              ))}
            </div>
            <textarea className="w-full p-4 bg-black/5 rounded-2xl mb-6 h-24 outline-none" placeholder="Write a review..."></textarea>
            <div className="flex gap-3">
              <button onClick={() => setShowRating(false)} className="flex-1 py-4 bg-black/5 rounded-2xl font-bold">Cancel</button>
              <button 
                onClick={() => setShowRating(false)}
                className="flex-1 py-4 bg-agri-green text-white rounded-2xl font-bold"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- AI Assistant ---
const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', senderId: 'ai', text: 'Namaste! I am your Krishi AI assistant. How can I help you today?', timestamp: Date.now(), type: 'text' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async (isImageGen = false) => {
    if (!input.trim() && !selectedImage) return;

    const userMsg: Message = { 
      id: Date.now().toString(), 
      senderId: 'user', 
      text: input, 
      image: selectedImage || undefined,
      timestamp: Date.now(), 
      type: 'text' 
    };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    const currentImage = selectedImage;
    setInput('');
    setSelectedImage(null);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      
      if (isImageGen) {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: [{ text: `Generate an agricultural image: ${currentInput}` }],
        });
        
        let imageUrl = '';
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            imageUrl = `data:image/png;base64,${part.inlineData.data}`;
            break;
          }
        }

        const aiMsg: Message = { 
          id: (Date.now() + 1).toString(), 
          senderId: 'ai', 
          text: `Here is the image for: ${currentInput}`, 
          image: imageUrl,
          timestamp: Date.now(), 
          type: 'text' 
        };
        setMessages(prev => [...prev, aiMsg]);
      } else {
        const parts: any[] = [{ text: currentInput }];
        if (currentImage) {
          parts.push({
            inlineData: {
              mimeType: "image/jpeg",
              data: currentImage.split(',')[1]
            }
          });
        }

        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: { parts },
          config: {
            systemInstruction: "You are KrishiSetu AI, a helpful agriculture expert. Provide advice on crops, soil, pests, and market trends. Keep answers simple and farmer-friendly. If an image is provided, analyze it for crop diseases or pests."
          }
        });
        
        const aiMsg: Message = { 
          id: (Date.now() + 1).toString(), 
          senderId: 'ai', 
          text: response.text || "I'm sorry, I couldn't process that.", 
          timestamp: Date.now(), 
          type: 'text' 
        };
        setMessages(prev => [...prev, aiMsg]);
      }
    } catch (error) {
      console.error(error);
      const errorMsg: Message = { id: Date.now().toString(), senderId: 'ai', text: "Error connecting to AI. Please try again.", timestamp: Date.now(), type: 'text' };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col">
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 p-2">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.senderId === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-[24px] ${msg.senderId === 'user' ? 'bg-agri-green text-white rounded-tr-none' : 'glass-card rounded-tl-none'}`}>
              {msg.image && (
                <img src={msg.image} alt="AI generated/uploaded" className="w-full rounded-xl mb-3 shadow-lg" referrerPolicy="no-referrer" />
              )}
              <div className="prose prose-sm dark:prose-invert">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="glass-card p-4 rounded-[24px] rounded-tl-none flex gap-1">
              <div className="w-2 h-2 bg-agri-green rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-agri-green rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-agri-green rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>
      
      {selectedImage && (
        <div className="p-2 flex items-center gap-2">
          <div className="relative">
            <img src={selectedImage} alt="Selected" className="w-16 h-16 rounded-xl object-cover" />
            <button onClick={() => setSelectedImage(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><X size={12} /></button>
          </div>
        </div>
      )}

      <div className="p-4 glass-card rounded-[32px] mt-2 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <input 
            type="file" 
            accept="image/*,video/*,.pdf,.doc,.docx" 
            hidden 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
          />
          <button onClick={() => fileInputRef.current?.click()} className="p-2 text-agri-green hover:bg-agri-green/10 rounded-full transition-colors">
            <Paperclip size={24} />
          </button>
          <button className="p-2 text-agri-green hover:bg-agri-green/10 rounded-full transition-colors"><Mic size={24} /></button>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-transparent outline-none font-medium" 
            placeholder="Ask AI about crops, diseases, or market..." 
          />
          <button onClick={() => handleSend(false)} className="p-3 bg-agri-green text-white rounded-full shadow-lg active:scale-95 transition-all">
            <Send size={20} />
          </button>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => handleSend(true)}
            className="flex-1 py-2 bg-accent-color text-white rounded-xl font-bold text-xs shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            <Camera size={16} /> Analyze Health
          </button>
          <button className="flex-1 py-2 bg-blue-500 text-white rounded-xl font-bold text-xs shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2">
            <Video size={16} /> Video Consult
          </button>
        </div>
      </div>
    </div>
  );
};

// --- News & Analytics ---
const News: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Crop Prices', 'Government Schemes', 'Weather Alerts', 'Technology', 'Market Trends'];

  const filteredNews = activeCategory === 'All' 
    ? MOCK_NEWS 
    : MOCK_NEWS.filter(n => n.category === activeCategory);

  return (
    <div className="space-y-8">
      {/* Analytics */}
      <div className="glass-card rounded-[32px] p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Price Analytics (Wheat)</h3>
          <div className="flex items-center gap-2 px-3 py-1 bg-agri-green/10 text-agri-green rounded-full text-[10px] font-bold">
            <Bot size={12} /> AI Predicted
          </div>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_PRICE_TRENDS}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1a5d1a" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#1a5d1a" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
              <Tooltip 
                contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
              />
              <Area type="monotone" dataKey="price" stroke="#2E7D32" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
              <Area type="monotone" dataKey="predicted" stroke="#F9A825" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2 text-xs font-bold"><div className="w-3 h-3 bg-agri-green rounded-full"></div> Actual</div>
          <div className="flex items-center gap-2 text-xs font-bold"><div className="w-3 h-3 bg-wheat rounded-full"></div> Predicted</div>
        </div>
      </div>

      {/* News Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xl font-bold">Latest Updates</h3>
          <button className="text-agri-green text-xs font-bold">View All</button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-agri-green text-white' : 'bg-black/5 opacity-60'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredNews.map(news => (
            <div key={news.id} className="glass-card rounded-[32px] overflow-hidden shadow-sm hover:scale-[1.01] transition-transform cursor-pointer">
              <div className="flex flex-col sm:flex-row">
                <img src={news.image} alt={news.title} className="w-full sm:w-32 h-32 object-cover" referrerPolicy="no-referrer" />
                <div className="p-4 flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-[10px] font-bold text-agri-green uppercase tracking-wider">{news.category}</p>
                    <p className="text-[10px] opacity-40 font-bold">{news.date}</p>
                  </div>
                  <h4 className="font-bold text-sm mb-2 leading-tight">{news.title}</h4>
                  <p className="text-xs opacity-60 line-clamp-2 mb-3">{news.summary}</p>
                  <div className="flex items-center gap-2 p-2 bg-agri-green/5 rounded-xl border border-agri-green/10">
                    <Bot size={14} className="text-agri-green" />
                    <p className="text-[10px] font-bold text-agri-green">AI Summary: Click to read key takeaways</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education Library */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Education Library</h3>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
          {MOCK_VIDEOS.map(video => (
            <div key={video.id} className="min-w-[240px] glass-card rounded-[32px] overflow-hidden relative group">
              <img src={video.thumbnail} alt={video.title} className="h-32 w-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="text-white fill-white" size={40} />
              </div>
              <div className="p-4">
                <h4 className="font-bold text-sm mb-1">{video.title}</h4>
                <div className="flex items-center gap-2 text-[10px] font-bold opacity-50">
                  <Languages size={12} /> {video.language}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Profile ---
// --- Trade Stats ---
const TradeStats: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Trade Analytics</h3>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 text-xs">
            <div className="w-2 h-2 rounded-full bg-agri-green" /> Selling
          </div>
          <div className="flex items-center gap-1 text-xs">
            <div className="w-2 h-2 rounded-full bg-blue-500" /> Purchasing
          </div>
        </div>
      </div>
      
      <div className="h-64 w-full glass-card rounded-[32px] p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MOCK_TRADE_STATS}>
            <defs>
              <linearGradient id="colorSelling" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.5}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorPurchasing" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000010" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#666' }} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#666' }}
              tickFormatter={(value) => `₹${value/1000}k`}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => [`₹${value.toLocaleString()}`, '']}
            />
            <Area 
              type="monotone" 
              dataKey="selling" 
              stroke="#10b981" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorSelling)" 
            />
            <Area 
              type="monotone" 
              dataKey="purchasing" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorPurchasing)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-4 rounded-2xl bg-agri-green/5 border border-agri-green/10">
          <p className="text-xs opacity-60 mb-1">Total Sales</p>
          <p className="text-xl font-bold text-agri-green">₹3,37,000</p>
          <div className="flex items-center gap-1 text-[10px] text-agri-green mt-1">
            <TrendingUp size={10} /> +12.5%
          </div>
        </div>
        <div className="glass-card p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
          <p className="text-xs opacity-60 mb-1">Total Purchases</p>
          <p className="text-xl font-bold text-blue-600">₹2,19,000</p>
          <div className="flex items-center gap-1 text-[10px] text-blue-600 mt-1">
            <TrendingUp size={10} /> +8.2%
          </div>
        </div>
      </div>
    </div>
  );
};

const Profile: React.FC<{ userRole: UserRole }> = ({ userRole }) => {
  const contractor = MOCK_CONTRACTORS[0]; // Assuming logged in as this contractor for demo

  return (
    <div className="space-y-8 pb-24">
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="w-32 h-32 rounded-[40px] border-4 border-white shadow-xl bg-agri-green/10 flex items-center justify-center text-6xl">
            {userRole === 'Contractor' ? '👨‍💼' : '👨‍🌾'}
          </div>
          <div className="absolute bottom-0 right-0 p-2 bg-agri-green text-white rounded-2xl shadow-lg">
            <Camera size={20} />
          </div>
        </div>
        <h2 className="text-2xl font-bold mt-4">{userRole === 'Contractor' ? contractor.name : 'Rajesh Kumar'}</h2>
        <div className="flex items-center gap-2 mt-2">
          <p className="px-4 py-1 bg-agri-green/10 text-agri-green rounded-full text-sm font-bold">{userRole}</p>
          {userRole === 'Contractor' && contractor.verified && (
            <span className="flex items-center gap-1 text-xs text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full">
              <ShieldCheck size={14} /> Verified
            </span>
          )}
        </div>
        {userRole === 'Contractor' && (
          <p className="text-sm opacity-60 mt-2 font-medium">{contractor.companyName}</p>
        )}
      </div>

      {userRole === 'Contractor' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">My Workforce</h3>
            <span className="text-xs bg-agri-green/10 text-agri-green px-3 py-1 rounded-full font-bold">
              {contractor.teamSize} Workers
            </span>
          </div>
          <div className="space-y-3">
            {contractor.team.map(worker => (
              <div key={worker.id} className="p-4 glass-card rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-agri-green/10 flex items-center justify-center text-2xl">
                  {worker.photo}
                </div>
                <div className="flex-1">
                  <p className="font-bold">{worker.name}</p>
                  <p className="text-xs opacity-60">{worker.skill}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-agri-green">₹{worker.wage}</p>
                  <p className="text-[10px] opacity-40">per day</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <TradeStats />

      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-4 rounded-[32px] text-center">
          <p className="text-2xl font-bold text-agri-green">12</p>
          <p className="text-xs opacity-60">Crops Sold</p>
        </div>
        <div className="glass-card p-4 rounded-[32px] text-center">
          <p className="text-2xl font-bold text-agri-green">₹45k</p>
          <p className="text-xs opacity-60">Earnings</p>
        </div>
      </div>

      <div className="space-y-3">
        {[
          { icon: CreditCard, label: 'Payment Methods', color: 'text-blue-500' },
          { icon: Calendar, label: 'My Bookings', color: 'text-orange-500' },
          { icon: MapPin, label: 'Saved Locations', color: 'text-red-500' },
          { icon: FileText, label: 'Verification Docs', color: 'text-purple-500' },
          { icon: User, label: 'Account Settings', color: 'text-gray-500' }
        ].map(item => (
          <button key={item.label} className="w-full p-5 glass-card rounded-[28px] flex items-center gap-4 active:scale-[0.98] transition-transform">
            <div className={`p-3 rounded-2xl bg-white shadow-sm ${item.color}`}>
              <item.icon size={24} />
            </div>
            <span className="font-bold">{item.label}</span>
            <ChevronRight className="ml-auto opacity-30" />
          </button>
        ))}
      </div>

      <button className="w-full py-5 bg-red-50 text-red-600 rounded-[28px] font-bold shadow-sm border border-red-100">
        Logout
      </button>
    </div>
  );
};

// --- Soil Health ---
const SoilHealth: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Soil Test Services</h2>
      <div className="glass-card rounded-[32px] p-6 bg-agri-green/5">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-agri-green text-white rounded-2xl"><Beaker size={32} /></div>
          <div>
            <h3 className="font-bold text-lg">Soil Digital Twin</h3>
            <p className="text-sm opacity-70">AI-powered soil analysis</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {['Nitrogen', 'Phosphorus', 'Potassium'].map(n => (
            <div key={n} className="p-3 bg-white rounded-2xl text-center shadow-sm">
              <p className="text-[10px] opacity-50 uppercase font-bold">{n}</p>
              <p className="font-bold text-agri-green">Optimal</p>
            </div>
          ))}
        </div>
        <button className="w-full py-4 bg-agri-green text-white rounded-2xl font-bold shadow-lg">
          Book New Soil Test (₹499)
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg">Verified Labs Nearby</h3>
        {[
          { name: 'AgriLab Solutions', location: '2.4 km away', price: '₹450' },
          { name: 'Krishi Vigyan Kendra', location: '5.1 km away', price: 'Free' }
        ].map(lab => (
          <div key={lab.name} className="p-4 glass-card rounded-2xl flex items-center justify-between">
            <div>
              <p className="font-bold">{lab.name}</p>
              <p className="text-xs opacity-50">{lab.location}</p>
            </div>
            <span className="font-bold text-agri-green">{lab.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Machinery ---
const Machinery: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Company' | 'Local'>('All');
  const [category, setCategory] = useState<'All' | 'Tractors' | 'Harvesters' | 'Tools'>('All');
  const [distance, setDistance] = useState(50);

  const machineryItems = [
    { name: 'John Deere Tractor', price: '₹800/hr', type: 'Company', category: 'Tractors', distance: 12, img: 'https://images.unsplash.com/photo-1594494424758-a23a58c40012?auto=format&fit=crop&w=400&q=80' },
    { name: 'Sonalika Tiller', price: '₹400/hr', type: 'Company', category: 'Tools', distance: 5, img: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=400&q=80' },
    { name: 'Local Seed Drill', price: '₹300/hr', type: 'Local', category: 'Tools', distance: 2, img: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=400&q=80' },
    { name: 'Mahindra Harvester', price: '₹1500/hr', type: 'Company', category: 'Harvesters', distance: 25, img: 'https://images.unsplash.com/photo-1594494424758-a23a58c40012?auto=format&fit=crop&w=400&q=80' },
    { name: 'Desi Plough', price: '₹150/hr', type: 'Local', category: 'Tools', distance: 1, img: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=400&q=80' }
  ];

  const filteredItems = machineryItems.filter(item => {
    const typeMatch = filter === 'All' || item.type === filter;
    const categoryMatch = category === 'All' || item.category === category;
    const distanceMatch = item.distance <= distance;
    return typeMatch && categoryMatch && distanceMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-agri-green to-accent-color">Machinery Marketplace</h2>
          <div className="flex gap-2">
            <button className="p-3 glass-card rounded-2xl text-agri-green"><Search size={20} /></button>
            <button className="p-3 glass-card rounded-2xl text-agri-green"><Filter size={20} /></button>
          </div>
        </div>

        {/* Sub-Navigation Bar */}
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2">
          {['All', 'Tractors', 'Harvesters', 'Tools'].map(cat => (
            <button 
              key={cat}
              onClick={() => setCategory(cat as any)}
              className={`px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all ${category === cat ? 'bg-agri-green text-white shadow-lg scale-105' : 'glass-card opacity-60 hover:opacity-100'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card p-6 rounded-[32px] flex flex-col gap-3">
            <p className="text-xs font-bold uppercase opacity-40">Provider Type</p>
            <div className="flex gap-2">
              {['All', 'Company', 'Local'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all ${filter === f ? 'bg-agri-green text-white shadow-md' : 'bg-black/5 opacity-60'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="glass-card p-6 rounded-[32px] flex flex-col gap-3">
            <div className="flex justify-between">
              <p className="text-xs font-bold uppercase opacity-40">Distance Range</p>
              <span className="text-xs font-bold text-agri-green">{distance} km</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="100" 
              value={distance} 
              onChange={(e) => setDistance(parseInt(e.target.value))}
              className="w-full h-2 bg-black/5 rounded-lg appearance-none cursor-pointer accent-agri-green"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(m => (
          <div key={m.name} className="glass-card rounded-[32px] overflow-hidden shadow-sm flex flex-col">
            <div className="relative">
              <img src={m.img} alt={m.name} className="h-48 w-full object-cover" referrerPolicy="no-referrer" />
              <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold ${m.type === 'Company' ? 'bg-blue-500 text-white' : 'bg-orange-500 text-white'}`}>
                {m.type}
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-lg">{m.name}</h4>
                <div className="flex items-center gap-1 text-xs opacity-60">
                  <MapPin size={14} /> {m.distance} km
                </div>
              </div>
              <p className="text-agri-green font-bold text-xl mb-4">{m.price}</p>
              <div className="mt-auto flex gap-2">
                <button className="flex-1 py-3 bg-agri-green text-white rounded-2xl font-bold shadow-md active:scale-95 transition-all">Rent Now</button>
                <button className="p-3 bg-agri-green/10 text-agri-green rounded-2xl active:scale-95 transition-all">
                  <MessageSquare size={20} />
                </button>
                <button className="p-3 bg-black/5 rounded-2xl active:scale-95 transition-all"><Phone size={20} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Crop Intelligence ---
const CropIntelligence: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const data = [
    { name: 'Week 1', health: 80, moisture: 40, growth: 20 },
    { name: 'Week 2', health: 85, moisture: 45, growth: 35 },
    { name: 'Week 3', health: 75, moisture: 35, growth: 50 },
    { name: 'Week 4', health: 90, moisture: 50, growth: 70 },
  ];

  const filteredCrops = MOCK_CROPS.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Crop Intelligence & A-Z Catalog</h2>
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={20} />
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 glass-card rounded-2xl outline-none focus:ring-2 ring-agri-green/20 transition-all"
            placeholder="Search A-Z Crop Catalog..."
          />
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {selectedCrop ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <button 
              onClick={() => setSelectedCrop(null)}
              className="flex items-center gap-2 text-agri-green font-bold hover:opacity-70 transition-opacity"
            >
              <X size={20} /> Back to Catalog
            </button>

            <div className="glass-card rounded-[40px] p-8 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-agri-green/5 rounded-full -mr-20 -mt-20 blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 bg-agri-green/10 rounded-[32px] flex items-center justify-center text-4xl">
                    {selectedCrop === 'Wheat' ? '🌾' : selectedCrop === 'Rice' ? '🍚' : '🌿'}
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold mb-2">{selectedCrop}</h3>
                    <p className="opacity-60 font-medium">Detailed Agricultural Profile & A-Z Guide</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: 'Sowing', value: CROP_DETAILS[selectedCrop]?.sowing || 'N/A', icon: Sprout, color: 'text-green-500' },
                    { label: 'Harvest', value: CROP_DETAILS[selectedCrop]?.harvest || 'N/A', icon: Calendar, color: 'text-orange-500' },
                    { label: 'Water', value: CROP_DETAILS[selectedCrop]?.water || 'N/A', icon: Droplets, color: 'text-blue-500' },
                    { label: 'Yield', value: CROP_DETAILS[selectedCrop]?.yield || 'N/A', icon: TrendingUp, color: 'text-purple-500' },
                  ].map(stat => (
                    <div key={stat.label} className="p-4 bg-white/50 rounded-3xl border border-white/20 shadow-sm">
                      <stat.icon className={`${stat.color} mb-2`} size={20} />
                      <p className="text-[10px] uppercase font-bold opacity-40 mb-1">{stat.label}</p>
                      <p className="font-bold text-sm">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="glass-card rounded-[32px] p-6 bg-white/40">
                    <h4 className="font-bold mb-4 flex items-center gap-2"><Sprout size={18} /> Popular Varieties</h4>
                    <div className="flex flex-wrap gap-2">
                      {(CROP_DETAILS[selectedCrop]?.varieties || []).map((v: string) => (
                        <span key={v} className="px-4 py-2 bg-accent-color/10 text-accent-color rounded-2xl text-xs font-bold border border-accent-color/20">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="glass-card rounded-[32px] p-6 bg-white/40">
                    <h4 className="font-bold mb-4 flex items-center gap-2"><Beaker size={18} /> Soil & Nutrients</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm opacity-60">Soil Type</span>
                        <span className="font-bold">{CROP_DETAILS[selectedCrop]?.soil || 'Loamy'}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(CROP_DETAILS[selectedCrop]?.nutrients || []).map((n: string) => (
                          <span key={n} className="px-3 py-1 bg-agri-green/10 text-agri-green rounded-full text-[10px] font-bold">{n}</span>
                        ))}
                      </div>
                      <div className="h-32 w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={[
                            { name: 'N', value: 80 },
                            { name: 'P', value: 65 },
                            { name: 'K', value: 75 },
                            { name: 'pH', value: 60 },
                          ]}>
                            <Bar dataKey="value" fill="#2E7D32" radius={[5, 5, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card rounded-[32px] p-6 bg-white/40">
                    <h4 className="font-bold mb-4 flex items-center gap-2"><AlertTriangle size={18} /> Pests & Threats</h4>
                    <div className="space-y-4">
                      {(CROP_DETAILS[selectedCrop]?.pests || []).map((p: string) => (
                        <div key={p} className="flex items-center justify-between p-3 bg-red-50 rounded-2xl">
                          <span className="text-sm font-medium text-red-700">{p}</span>
                          <AlertTriangle size={14} className="text-red-500" />
                        </div>
                      ))}
                      <div className="h-32 w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={data}>
                            <Area type="monotone" dataKey="health" stroke="#ef4444" fill="#fee2e2" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredCrops.map(crop => (
                <button 
                  key={crop.id}
                  onClick={() => setSelectedCrop(crop.name.split(' ').pop() || crop.name)}
                  className="glass-card p-4 rounded-[32px] flex flex-col items-center text-center hover:scale-105 transition-transform group"
                >
                  <div className="w-16 h-16 bg-agri-green/10 rounded-2xl flex items-center justify-center text-3xl mb-3 group-hover:bg-agri-green group-hover:text-white transition-colors">
                    {crop.category === 'Spice' ? '🌶️' : crop.category === 'Seed' ? '🌱' : '🌾'}
                  </div>
                  <h4 className="font-bold text-sm mb-1">{crop.name}</h4>
                  <p className="text-[10px] opacity-50 uppercase font-bold">{crop.category}</p>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-card rounded-[32px] p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="text-agri-green" /> Market Performance
                </h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                      <Line type="monotone" dataKey="health" stroke="#2E7D32" strokeWidth={3} dot={{ r: 6 }} />
                      <Line type="monotone" dataKey="growth" stroke="#F9A825" strokeWidth={3} dot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="glass-card rounded-[32px] p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Droplets className="text-blue-500" /> Regional Moisture
                </h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                      <Bar dataKey="moisture" fill="#2196F3" radius={[10, 10, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Pesticides ---
const Pesticides: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Pesticide Suppliers</h2>
      <div className="grid grid-cols-1 gap-4">
        {MOCK_PESTICIDES.map(item => (
          <div key={item.id} className="glass-card rounded-[32px] overflow-hidden shadow-sm">
            <div className="flex">
              <img src={item.image} alt={item.name} className="w-32 h-32 object-cover" />
              <div className="p-4 flex-1">
                <h4 className="font-bold text-lg text-agri-green">{item.name}</h4>
                <p className="text-xs text-soil-brown/60 mb-2">{item.company}</p>
                <p className="text-sm font-bold text-agri-green mb-2">₹{item.price}</p>
                <button className="px-4 py-2 bg-agri-green/10 text-agri-green rounded-xl font-bold text-xs">Buy Now</button>
              </div>
            </div>
            <div className="p-4 bg-black/5 border-t border-black/5">
              <p className="text-[10px] uppercase font-bold text-soil-brown/40 mb-1">Usage Instructions</p>
              <p className="text-xs opacity-70">{item.usage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Shops ---
const Shops: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Nearby Agri Shops</h2>
      <div className="space-y-4">
        {MOCK_SHOPS.map(shop => (
          <div key={shop.id} className="glass-card p-4 rounded-3xl flex gap-4 shadow-sm">
            <img src={shop.image} alt={shop.name} className="w-24 h-24 rounded-2xl object-cover" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-lg text-agri-green">{shop.name}</h4>
                <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
                  <Star size={14} fill="currentColor" /> {shop.rating}
                </div>
              </div>
              <p className="text-sm text-soil-brown/60 flex items-center gap-1 mt-1">
                <MapPin size={14} /> {shop.location}
              </p>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 py-2 bg-agri-green text-white rounded-xl font-bold text-xs">Directions</button>
                <button className="p-2 bg-agri-green/10 text-agri-green rounded-xl"><Phone size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Chat ---
const Chat: React.FC = () => {
  const [activeChat, setActiveChat] = useState<any>(null);

  if (activeChat) {
    return (
      <div className="h-[calc(100vh-180px)] flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setActiveChat(null)} className="p-2 glass-card rounded-full"><X size={20} /></button>
          <div className="flex-1">
            <h3 className="font-bold text-lg">{activeChat.name}</h3>
            <p className="text-xs text-green-500 font-bold">Online</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 glass-card rounded-full text-agri-green"><Phone size={20} /></button>
            <button className="p-2 glass-card rounded-full text-agri-green"><Video size={20} /></button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 p-2">
          <div className="flex justify-start">
            <div className="max-w-[85%] p-4 glass-card rounded-[24px] rounded-tl-none">
              <p className="text-sm">{activeChat.lastMsg}</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[85%] p-4 bg-agri-green text-white rounded-[24px] rounded-tr-none">
              <p className="text-sm">Yes, it is available. How much do you need?</p>
            </div>
          </div>
        </div>
        <div className="p-4 glass-card rounded-[32px] mt-4 flex items-center gap-2">
          <button className="p-2 text-agri-green"><Paperclip size={24} /></button>
          <button className="p-2 text-agri-green"><Mic size={24} /></button>
          <input className="flex-1 bg-transparent outline-none font-medium" placeholder="Type a message..." />
          <button className="p-2 bg-agri-green text-white rounded-full"><TrendingUp size={20} className="rotate-90" /></button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Messages</h2>
      <div className="space-y-3">
        {MOCK_CHATS.map(chat => (
          <button 
            key={chat.id} 
            onClick={() => setActiveChat(chat)}
            className="w-full p-4 glass-card rounded-3xl flex items-center gap-4 shadow-sm active:scale-[0.98] transition-transform"
          >
            <div className="w-14 h-14 bg-agri-green/10 rounded-2xl flex items-center justify-center text-agri-green font-bold text-xl">
              {chat.name[0]}
            </div>
            <div className="flex-1 text-left">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-bold">{chat.name}</h4>
                <span className="text-[10px] opacity-40">{chat.time}</span>
              </div>
              <p className="text-xs opacity-60 line-clamp-1">{chat.lastMsg}</p>
            </div>
            {chat.unread > 0 && (
              <div className="w-5 h-5 bg-agri-green text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {chat.unread}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Payments ---
const Payments: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Payments</h2>
      <div className="p-6 bg-agri-green text-white rounded-[32px] shadow-xl">
        <p className="text-sm opacity-80 mb-1">Total Balance</p>
        <h3 className="text-3xl font-bold mb-6">₹12,450.00</h3>
        <div className="flex gap-3">
          <button className="flex-1 py-3 bg-white/20 rounded-2xl font-bold text-sm">Withdraw</button>
          <button className="flex-1 py-3 bg-white/20 rounded-2xl font-bold text-sm">Add Money</button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg">Recent Transactions</h3>
        {[
          { id: '1', title: 'Crop Sale - Wheat', amount: '+₹8,500', date: 'Oct 12', type: 'credit' },
          { id: '2', title: 'Worker Payment - Ram', amount: '-₹450', date: 'Oct 11', type: 'debit' },
          { id: '3', title: 'Soil Test Booking', amount: '-₹499', date: 'Oct 10', type: 'debit' }
        ].map(tx => (
          <div key={tx.id} className="p-4 glass-card rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${tx.type === 'credit' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {tx.type === 'credit' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
              </div>
              <div>
                <p className="font-bold text-sm">{tx.title}</p>
                <p className="text-[10px] opacity-40">{tx.date}</p>
              </div>
            </div>
            <span className={`font-bold ${tx.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
              {tx.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Shipping ---
const Shipping: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Shipping & Logistics</h2>
      <div className="glass-card rounded-[32px] p-6 bg-blue-500/5 border-blue-500/10">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-blue-500 text-white rounded-2xl"><Truck size={32} /></div>
          <div>
            <h3 className="font-bold text-lg">Track Shipment</h3>
            <p className="text-sm opacity-70">Enter your order ID</p>
          </div>
        </div>
        <div className="flex gap-2 mb-6">
          <input className="flex-1 p-4 bg-white rounded-2xl outline-none shadow-sm" placeholder="Order ID #12345" />
          <button className="p-4 bg-blue-500 text-white rounded-2xl shadow-lg"><Search size={24} /></button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg">Available Transporters</h3>
        {[
          { name: 'Gati Logistics', type: 'Truck', price: '₹15/km', rating: 4.8 },
          { name: 'Kisan Transport', type: 'Tractor/Trolley', price: '₹10/km', rating: 4.5 }
        ].map(t => (
          <div key={t.name} className="p-4 glass-card rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-black/5 rounded-xl"><Truck size={20} /></div>
              <div>
                <p className="font-bold">{t.name}</p>
                <p className="text-xs opacity-50">{t.type} • {t.rating} ⭐</p>
              </div>
            </div>
            <span className="font-bold text-agri-green">{t.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Weather Analysis ---
const WeatherAnalysis: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="glass-card rounded-[40px] p-8 bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-sm opacity-80 font-bold uppercase tracking-wider mb-1">Current Weather</p>
            <h3 className="text-4xl font-bold">28°C</h3>
            <p className="text-lg">Sunny • Chandigarh</p>
          </div>
          <Sun size={48} className="animate-pulse" />
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Rainfall', value: '0mm', icon: Droplets },
            { label: 'Humidity', value: '45%', icon: Thermometer },
            { label: 'Wind', value: '12km/h', icon: Wind },
            { label: 'UV Index', value: 'High', icon: Sun }
          ].map(stat => (
            <div key={stat.label} className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30">
              <stat.icon size={16} className="mb-1 opacity-70" />
              <p className="text-[10px] opacity-70 uppercase font-bold">{stat.label}</p>
              <p className="font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-[32px] p-6 bg-amber-50 border border-amber-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-amber-500 text-white rounded-xl"><Bot size={20} /></div>
          <h3 className="font-bold text-lg text-amber-900">AI Farming Insights</h3>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-2xl border border-amber-200 shadow-sm">
            <p className="text-xs font-bold text-amber-600 uppercase mb-1">Best Harvest Window</p>
            <p className="font-bold text-amber-900">12–15 October</p>
            <p className="text-xs opacity-70 mt-1">Conditions are optimal for dry harvest. Low humidity expected.</p>
          </div>
          <div className="p-4 bg-red-50 rounded-2xl border border-red-100 shadow-sm">
            <p className="text-xs font-bold text-red-600 uppercase mb-1">Worst Time to Harvest</p>
            <p className="font-bold text-red-900">16 October</p>
            <p className="text-xs opacity-70 mt-1">Heavy rain expected. High risk of crop damage if harvested.</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-xl px-2">7-Day Forecast</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {[
            { day: 'Mon', temp: 28, icon: Sun, color: 'text-yellow-500' },
            { day: 'Tue', temp: 29, icon: Sun, color: 'text-yellow-500' },
            { day: 'Wed', temp: 27, icon: Cloud, color: 'text-gray-400' },
            { day: 'Thu', temp: 26, icon: Droplets, color: 'text-blue-400' },
            { day: 'Fri', temp: 25, icon: Droplets, color: 'text-blue-400' },
            { day: 'Sat', temp: 27, icon: Cloud, color: 'text-gray-400' },
            { day: 'Sun', temp: 28, icon: Sun, color: 'text-yellow-500' },
          ].map(item => (
            <div key={item.day} className="min-w-[80px] p-4 glass-card rounded-3xl flex flex-col items-center gap-2 text-center">
              <span className="text-xs font-bold opacity-50 uppercase">{item.day}</span>
              <item.icon size={24} className={item.color} />
              <span className="font-bold">{item.temp}°</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Crop Analytics ---
const CropAnalytics: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Price Analytics</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-agri-green text-white rounded-full text-xs font-bold">Monthly</button>
          <button className="px-3 py-1 bg-black/5 rounded-full text-xs font-bold opacity-60">Yearly</button>
        </div>
      </div>

      <div className="glass-card rounded-[40px] p-6">
        <h3 className="font-bold mb-6 flex items-center gap-2">
          <TrendingUp size={20} className="text-agri-green" />
          Wheat Price Trend (Punjab)
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={[
              { month: 'Oct', past: 1900, present: 2150, predicted: 2200 },
              { month: 'Nov', past: 1950, present: 2200, predicted: 2350 },
              { month: 'Dec', past: 2000, present: 2250, predicted: 2400 },
              { month: 'Jan', past: 2100, present: 2300, predicted: 2500 },
              { month: 'Feb', past: 2150, present: 2400, predicted: 2600 },
              { month: 'Mar', past: 2200, present: 2500, predicted: 2750 },
            ]}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000010" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#666'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#666'}} />
              <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
              <Area type="monotone" dataKey="present" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
              <Line type="monotone" dataKey="predicted" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2 text-xs font-bold">
            <div className="w-3 h-3 bg-agri-green rounded-full"></div> Present Price
          </div>
          <div className="flex items-center gap-2 text-xs font-bold">
            <div className="w-3 h-3 bg-amber-500 rounded-full"></div> AI Predicted
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Past Avg', value: '₹2,050', color: 'text-gray-500' },
          { label: 'Current', value: '₹2,150', color: 'text-agri-green' },
          { label: 'Predicted', value: '₹2,450', color: 'text-amber-600' }
        ].map(stat => (
          <div key={stat.label} className="p-4 glass-card rounded-3xl text-center">
            <p className="text-[10px] opacity-50 uppercase font-bold mb-1">{stat.label}</p>
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Help Center ---
const HelpCenter: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Crop Growing', 'Irrigation', 'Pest Control', 'App Tutorial'];
  const videos = [
    { id: 'v1', title: 'How to grow organic Wheat', category: 'Crop Growing', lang: 'Hindi', thumb: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80' },
    { id: 'v2', title: 'Modern Irrigation Techniques', category: 'Irrigation', lang: 'English', thumb: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=400&q=80' },
    { id: 'v3', title: 'Pest Control Guide', category: 'Pest Control', lang: 'Gujarati', thumb: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=400&q=80' },
    { id: 'v4', title: 'Using KrishiSetu App', category: 'App Tutorial', lang: 'Hindi', thumb: 'https://images.unsplash.com/photo-1512428559083-a40ce12b26f5?auto=format&fit=crop&w=400&q=80' },
  ];

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={20} />
        <input 
          type="text" 
          placeholder="Search tutorials..." 
          className="w-full p-4 pl-12 glass-card rounded-2xl outline-none focus:border-agri-green transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-agri-green text-white' : 'bg-black/5 opacity-60'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {videos.map(video => (
          <div key={video.id} className="glass-card rounded-[32px] overflow-hidden group cursor-pointer">
            <div className="relative h-40">
              <img src={video.thumb} alt={video.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-4 bg-white/20 backdrop-blur-md rounded-full text-white"><Play size={32} fill="currentColor" /></div>
              </div>
              <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 text-white text-[10px] rounded-lg font-bold">
                {video.lang}
              </div>
            </div>
            <div className="p-4">
              <p className="text-[10px] font-bold text-agri-green uppercase mb-1">{video.category}</p>
              <h4 className="font-bold leading-tight">{video.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Features = {
  MarketplaceHub,
  Marketplace,
  Workers,
  AIAssistant,
  News,
  Profile,
  SoilHealth,
  Machinery,
  CropIntelligence,
  Pesticides,
  Shops,
  Chat,
  Payments,
  Shipping,
  WeatherAnalysis,
  CropAnalytics,
  HelpCenter
};


export default Features;
