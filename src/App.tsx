import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, ShoppingBag, Users, Bot, Newspaper, User, 
  Cloud, Mic, LogIn, Globe, ChevronRight, CheckCircle2,
  Sun, Moon, Coffee, Bell, Search, Filter, Plus, TrendingUp, HelpCircle,
  MessageSquare, Phone, Video, CreditCard, Droplets,
  Sprout, Beaker, Tractor, Wrench, MapIcon, BookOpen, Truck, Briefcase
} from 'lucide-react';
import Logo from './components/Logo';
import { AppMode, UserRole } from './types';
import Features from './components/Features';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [activeTab, setActiveTab] = useState('Home');
  const [appMode, setAppMode] = useState<AppMode>('light');
  const [language, setLanguage] = useState('English');
  const [showRoleSelection, setShowRoleSelection] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowRoleSelection(true);
  };

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    setShowRoleSelection(false);
  };

  const toggleMode = () => {
    if (appMode === 'light') setAppMode('dark');
    else if (appMode === 'dark') setAppMode('warm');
    else setAppMode('light');
  };

  const playVoiceHelp = () => {
    const messages: Record<string, string> = {
      English: "Voice help icon is on the right side of the app. Click it if you cannot read the text.",
      Hindi: "आवाज सहायता आइकन ऐप के दाईं ओर है। यदि आप टेक्स्ट नहीं पढ़ सकते हैं तो उस पर क्लिक करें।",
      Gujarati: "વોઈસ હેલ્પ આઈકોન એપની જમણી બાજુએ છે. જો તમે લખાણ વાંચી શકતા નથી તો તેના પર ક્લિક કરો."
    };
    const utterance = new SpeechSynthesisUtterance(messages[language] || messages.English);
    window.speechSynthesis.speak(utterance);
  };

  if (loading) {
    return (
      <div className={`mobile-container items-center justify-center bg-agri-green/10 ${appMode}`}>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Logo size="xl" className="animate-float" />
          <div className="mt-8 flex gap-2 justify-center">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-3 h-3 rounded-full bg-agri-green"
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className={`mobile-container p-6 ${appMode}`}>
        <div className="flex justify-end mb-8">
          <button 
            onClick={playVoiceHelp}
            className="p-4 bg-agri-green text-white rounded-full shadow-lg active:scale-95 transition-transform"
          >
            <Mic size={32} />
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <Logo size="lg" className="mb-12" />
          
          <div className="w-full space-y-4">
            <button 
              onClick={handleLogin}
              className="w-full p-4 glass-card rounded-2xl flex items-center justify-center gap-3 font-semibold text-lg hover:bg-agri-green/5 transition-colors"
            >
              <Globe size={24} className="text-blue-600" />
              Sign in with Gmail
            </button>
            <button 
              onClick={handleLogin}
              className="w-full p-4 glass-card rounded-2xl flex items-center justify-center gap-3 font-semibold text-lg hover:bg-agri-green/5 transition-colors"
            >
              <User size={24} className="text-agri-green" />
              Guest Login
            </button>
            <button 
              onClick={handleLogin}
              className="w-full p-4 bg-agri-green text-white rounded-2xl flex items-center justify-center gap-3 font-semibold text-lg shadow-lg active:scale-95 transition-transform"
            >
              <LogIn size={24} />
              Create Account
            </button>
          </div>
        </div>

        <div className="mt-12 flex justify-center gap-4">
          {['English', 'Hindi', 'Gujarati'].map(lang => (
            <button 
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${language === lang ? 'bg-agri-green text-white' : 'bg-white/50 text-agri-green'}`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (showRoleSelection) {
    const roles = [
      { name: 'Farmer', icon: Sprout, desc: 'Sell crops, hire workers' },
      { name: 'Buyer', icon: ShoppingBag, desc: 'Buy fresh crops directly' },
      { name: 'Worker', icon: Users, desc: 'Find agricultural work' },
      { name: 'Contractor', icon: Briefcase, desc: 'Manage labor & machinery' },
      { name: 'Shipping', icon: Tractor, desc: 'Transport agricultural goods' }
    ];

    return (
      <div className={`mobile-container p-6 ${appMode}`}>
        <h2 className="text-2xl font-bold text-center mb-8 mt-12">Select Your Role</h2>
        <div className="grid grid-cols-1 gap-4">
          {roles.map(role => (
            <motion.button
              key={role.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRoleSelect(role.name as UserRole)}
              className="p-6 glass-card rounded-3xl flex items-center gap-6 text-left hover:border-agri-green transition-all"
            >
              <div className="p-4 bg-agri-green/10 rounded-2xl text-agri-green">
                <role.icon size={40} />
              </div>
              <div>
                <h3 className="text-xl font-bold">{role.name}</h3>
                <p className="text-sm opacity-70">{role.desc}</p>
              </div>
              <ChevronRight className="ml-auto opacity-30" />
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`app-container ${appMode} relative overflow-hidden`}>
      <div className="flex flex-col md:flex-row min-h-screen relative z-10">
        {/* Sidebar for Desktop */}
        <aside className="hidden md:flex w-72 flex-col glass-card border-r border-[var(--border-color)] sticky top-0 h-screen p-6 z-50 bg-white dark:bg-slate-900">
          <Logo size="sm" className="mb-10" />
          <nav className="flex-1 space-y-3 overflow-y-auto no-scrollbar pr-2">
            {[
              { name: 'Home', icon: Home, color: 'text-blue-500', bg: 'hover:bg-blue-50' },
              { name: 'Sell Crops', icon: ShoppingBag, color: 'text-emerald-500', bg: 'hover:bg-emerald-50' },
              { name: 'Workers', icon: Users, color: 'text-purple-500', bg: 'hover:bg-purple-50' },
              { name: 'Machinery', icon: Tractor, color: 'text-orange-500', bg: 'hover:bg-orange-50' },
              { name: 'AI Assistant', icon: Bot, color: 'text-amber-500', bg: 'hover:bg-amber-50' },
              { name: 'Market News', icon: Newspaper, color: 'text-indigo-500', bg: 'hover:bg-indigo-50' },
              { name: 'Weather', icon: Cloud, color: 'text-sky-500', bg: 'hover:bg-sky-50' },
              { name: 'Analytics', icon: TrendingUp, color: 'text-rose-500', bg: 'hover:bg-rose-50' },
              { name: 'Help Center', icon: HelpCircle, color: 'text-red-500', bg: 'hover:bg-red-50' },
              { name: 'Profile', icon: User, color: 'text-pink-500', bg: 'hover:bg-pink-50' }
            ].map(tab => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === tab.name ? 'bg-agri-green text-white shadow-lg' : `${tab.bg} ${tab.color} opacity-80 hover:opacity-100`}`}
              >
                <tab.icon size={20} className={activeTab === tab.name ? 'text-white' : tab.color} />
                <span className="font-bold">{tab.name}</span>
              </button>
            ))}
          </nav>
          <div className="mt-auto p-4 glass-card rounded-2xl bg-accent-color/10 border-accent-color/20">
            <p className="text-xs font-bold text-accent-color uppercase mb-1">Support</p>
            <p className="text-sm opacity-70">Need help? Call 1800-AGRI-HELP</p>
          </div>
        </aside>

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="p-4 flex items-center justify-between glass-card sticky top-0 z-40">
            <div className="md:hidden"><Logo size="sm" /></div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-agri-green">{activeTab}</h1>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setActiveTab('Chat')} className="p-2 rounded-full hover:bg-black/5 relative">
                <MessageSquare size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-agri-green rounded-full border-2 border-white"></span>
              </button>
              <button onClick={toggleMode} className="p-2 rounded-full hover:bg-black/5">
                {appMode === 'light' ? <Sun size={20} /> : appMode === 'dark' ? <Moon size={20} /> : <Coffee size={20} />}
              </button>
              <div className="flex items-center gap-1 bg-blue-500/10 text-blue-600 px-3 py-1 rounded-full text-sm font-bold">
                <Cloud size={16} />
                28°C
              </div>
              <button className="p-2 rounded-full hover:bg-black/5 relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto no-scrollbar p-4 md:p-8 pb-24 md:pb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-7xl mx-auto w-full"
              >
                {activeTab === 'Home' && <Dashboard setActiveTab={setActiveTab} />}
                {activeTab === 'Sell Crops' && <Features.MarketplaceHub userRole={userRole} initialTab="Crops" />}
                {activeTab === 'Workers' && <Features.Workers />}
                {activeTab === 'AI Assistant' && <Features.AIAssistant />}
                {activeTab === 'Market News' && <Features.News />}
                {activeTab === 'Weather' && <Features.WeatherAnalysis />}
                {activeTab === 'Analytics' && <Features.CropAnalytics />}
                {activeTab === 'Help Center' && <Features.HelpCenter />}
                {activeTab === 'Profile' && <Features.Profile userRole={userRole} />}
                {activeTab === 'Soil Health' && <Features.SoilHealth />}
                {activeTab === 'Machinery' && <Features.MarketplaceHub userRole={userRole} initialTab="Machinery" />}
                {activeTab === 'Crop Intel' && <Features.CropIntelligence />}
                {activeTab === 'Pesticides' && <Features.MarketplaceHub userRole={userRole} initialTab="Pesticides" />}
                {activeTab === 'Shops' && <Features.Shops />}
                {activeTab === 'Chat' && <Features.Chat />}
                {activeTab === 'Payments' && <Features.Payments />}
                {activeTab === 'Shipping' && <Features.Shipping />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Bottom Nav for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-card flex justify-around p-3 border-t border-black/5 z-50">
        {[
          { name: 'Home', icon: Home },
          { name: 'Sell Crops', icon: ShoppingBag },
          { name: 'Workers', icon: Users },
          { name: 'Machinery', icon: Tractor },
          { name: 'AI Assistant', icon: Bot },
          { name: 'Profile', icon: User }
        ].map(tab => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === tab.name ? 'text-agri-green scale-110' : 'opacity-40'}`}
          >
            <tab.icon size={24} />
            <span className="text-[10px] font-bold">{tab.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

const Dashboard: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
  return (
    <div className="space-y-8">
      {/* Welcome & Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-8 bg-gradient-to-br from-agri-green to-emerald-700 text-white rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col justify-center min-h-[200px]">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Namaste, Rajesh! 👋</h2>
            <p className="text-lg opacity-90 mb-6">Your farm is looking great today. Here's your daily summary.</p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/30 backdrop-blur-md p-4 rounded-3xl border border-white/40 shadow-sm">
                <p className="text-xs opacity-90 font-bold uppercase tracking-wider mb-1">Market Status</p>
                <p className="text-xl font-bold">Bullish 📈</p>
              </div>
              <div className="bg-white/30 backdrop-blur-md p-4 rounded-3xl border border-white/40 shadow-sm">
                <p className="text-xs opacity-90 font-bold uppercase tracking-wider mb-1">Soil Moisture</p>
                <p className="text-xl font-bold">Optimal ✅</p>
              </div>
              <div className="bg-white/30 backdrop-blur-md p-4 rounded-3xl border border-white/40 shadow-sm">
                <p className="text-xs opacity-90 font-bold uppercase tracking-wider mb-1">Next Harvest</p>
                <p className="text-xl font-bold">12 Days 🌾</p>
              </div>
            </div>
          </div>
          <div className="absolute top-[-40px] right-[-40px] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-20px] left-[20%] w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl"></div>
        </div>

        <div className="glass-card p-8 rounded-[40px] flex flex-col justify-center items-center text-center bg-gradient-to-br from-accent-color/10 to-amber-500/10 border-accent-color/20">
          <div className="w-20 h-20 bg-accent-color/10 rounded-3xl flex items-center justify-center text-accent-color mb-4">
            <TrendingUp size={40} />
          </div>
          <h3 className="text-2xl font-bold mb-1">₹12,450</h3>
          <p className="opacity-60 font-medium">Wallet Balance</p>
          <button onClick={() => setActiveTab('Payments')} className="mt-6 px-8 py-3 bg-accent-color text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-all">
            Manage Funds
          </button>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold px-2">Quick Services</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
          {[
            { name: 'Crop Intel', icon: Sprout, tab: 'Crop Intel', color: 'bg-green-500' },
            { name: 'Soil Health', icon: Beaker, tab: 'Soil Health', color: 'bg-blue-500' },
            { name: 'Machinery', icon: Tractor, tab: 'Machinery', color: 'bg-orange-500' },
            { name: 'Pesticides', icon: Droplets, tab: 'Pesticides', color: 'bg-purple-500' },
            { name: 'Shops', icon: MapIcon, tab: 'Shops', color: 'bg-red-500' },
            { name: 'Weather', icon: Cloud, tab: 'Weather', color: 'bg-blue-400' },
            { name: 'Analytics', icon: TrendingUp, tab: 'Analytics', color: 'bg-emerald-500' },
            { name: 'Help Center', icon: HelpCircle, tab: 'Help Center', color: 'bg-red-400' },
            { name: 'Payments', icon: CreditCard, tab: 'Payments', color: 'bg-indigo-500' },
            { name: 'Shipping', icon: Truck, tab: 'Shipping', color: 'bg-cyan-500' }
          ].map(action => (
            <button 
              key={action.name} 
              onClick={() => setActiveTab(action.tab)}
              className="p-4 glass-card rounded-3xl flex flex-col items-center gap-2 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className={`p-3 ${action.color} text-white rounded-2xl shadow-lg transition-transform`}>
                <action.icon size={20} />
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-center leading-tight">{action.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Market Price Overview */}
        <div className="glass-card rounded-[40px] p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl">Market Trends</h3>
            <button onClick={() => setActiveTab('Market News')} className="text-agri-green font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Wheat', price: '₹2,150', trend: '+2.4%', color: 'text-green-600', bg: 'bg-green-100/50', iconBg: 'bg-green-500' },
              { name: 'Rice', price: '₹4,200', trend: '-1.2%', color: 'text-red-600', bg: 'bg-red-100/50', iconBg: 'bg-red-500' },
              { name: 'Cotton', price: '₹6,100', trend: '+0.8%', color: 'text-blue-600', bg: 'bg-blue-100/50', iconBg: 'bg-blue-500' }
            ].map(item => (
              <div key={item.name} className={`flex items-center justify-between p-4 ${item.bg} rounded-3xl border border-black/5 shadow-sm`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${item.iconBg} text-white rounded-2xl flex items-center justify-center font-bold shadow-sm text-lg`}>
                    {item.name[0]}
                  </div>
                  <span className="font-bold text-lg">{item.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{item.price}</p>
                  <p className={`text-sm font-bold ${item.color}`}>{item.trend}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shortcuts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button 
            onClick={() => setActiveTab('AI Assistant')}
            className="p-8 bg-amber-50 border border-amber-200 rounded-[40px] text-left relative overflow-hidden group shadow-sm hover:shadow-md transition-all"
          >
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-orange-500 mb-4 shadow-sm group-hover:scale-110 transition-transform">
              <Bot size={32} />
            </div>
            <h4 className="font-bold text-xl mb-1">AI Assistant</h4>
            <p className="text-sm opacity-70">Ask farming tips & generate images</p>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-orange-500/5 rounded-full"></div>
          </button>
          <button 
            onClick={() => setActiveTab('Sell Crops')}
            className="p-8 bg-emerald-50 border border-emerald-200 rounded-[40px] text-left relative overflow-hidden group shadow-sm hover:shadow-md transition-all"
          >
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-emerald-600 mb-4 shadow-sm group-hover:scale-110 transition-transform">
              <ShoppingBag size={32} />
            </div>
            <h4 className="font-bold text-xl mb-1">Sell Crops</h4>
            <p className="text-sm opacity-70">List your harvest for buyers</p>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-500/5 rounded-full"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
