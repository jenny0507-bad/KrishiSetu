import { Crop, Worker, NewsItem, Video, PriceTrend, Contractor } from './types';

export const MOCK_CONTRACTORS: Contractor[] = [
  {
    id: 'c1',
    name: 'Vikram Singh',
    photo: '👨‍💼',
    companyName: 'Singh Agro Services',
    rating: 4.9,
    verified: true,
    experience: 15,
    bio: 'Leading agricultural contractor in North India. We provide end-to-end farming solutions with a highly skilled team.',
    location: 'Chandigarh',
    phone: '+91 99999 88888',
    teamSize: 5,
    team: [
      { id: 'w101', name: 'Amit Kumar', photo: '👨‍🌾', skill: 'Tractor Driver', wage: 600, distance: '0 km', rating: 4.7, availability: true, experience: 5, bio: 'Expert tractor operator.', completedProjects: 50, location: 'Chandigarh', phone: 'N/A', languages: ['Hindi'], verified: true },
      { id: 'w102', name: 'Sita Ram', photo: '👨‍🌾', skill: 'Manual Labor', wage: 400, distance: '0 km', rating: 4.5, availability: true, experience: 8, bio: 'Experienced in all manual tasks.', completedProjects: 120, location: 'Chandigarh', phone: 'N/A', languages: ['Hindi'], verified: true },
      { id: 'w103', name: 'Rahul Dev', photo: '👨‍🌾', skill: 'Irrigation Expert', wage: 500, distance: '0 km', rating: 4.8, availability: true, experience: 6, bio: 'Specialist in drip irrigation.', completedProjects: 45, location: 'Chandigarh', phone: 'N/A', languages: ['Hindi'], verified: true },
      { id: 'w104', name: 'Sunita B.', photo: '👩‍🌾', skill: 'Seed Specialist', wage: 450, distance: '0 km', rating: 4.9, availability: true, experience: 7, bio: 'Expert in seed selection.', completedProjects: 80, location: 'Chandigarh', phone: 'N/A', languages: ['Hindi'], verified: true },
      { id: 'w105', name: 'Vijay P.', photo: '👨‍🌾', skill: 'Pest Control', wage: 550, distance: '0 km', rating: 4.6, availability: true, experience: 4, bio: 'Trained in organic pest control.', completedProjects: 30, location: 'Chandigarh', phone: 'N/A', languages: ['Hindi'], verified: true },
    ]
  }
];

export const MOCK_CROPS: Crop[] = [
  { id: '1', name: 'Premium Wheat', price: 2150, quantity: '500 kg', location: 'Punjab', grade: 'A', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80', category: 'Grain' },
  { id: '2', name: 'Basmati Rice', price: 4200, quantity: '200 kg', location: 'Haryana', grade: 'A', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80', category: 'Grain' },
  { id: '3', name: 'Organic Turmeric', price: 150, quantity: '50 kg', location: 'Erode', grade: 'A', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80', category: 'Spice' },
  { id: '4', name: 'Black Pepper', price: 550, quantity: '30 kg', location: 'Kerala', grade: 'A', image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=800&q=80', category: 'Spice' },
  { id: '5', name: 'Cumin Seeds', price: 320, quantity: '100 kg', location: 'Gujarat', grade: 'B', image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80', category: 'Seed' },
  { id: '6', name: 'Red Chilli', price: 180, quantity: '80 kg', location: 'Andhra', grade: 'A', image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80', category: 'Spice' },
  { id: '7', name: 'Cardamom', price: 1200, quantity: '10 kg', location: 'Karnataka', grade: 'A', image: 'https://images.unsplash.com/photo-1599330103223-936660d8058c?auto=format&fit=crop&w=800&q=80', category: 'Spice' },
  { id: '8', name: 'Mustard Seeds', price: 90, quantity: '200 kg', location: 'Rajasthan', grade: 'B', image: 'https://images.unsplash.com/photo-1511067007398-7e4b90cfa4bc?auto=format&fit=crop&w=800&q=80', category: 'Seed' },
  { id: '9', name: 'Coriander', price: 110, quantity: '40 kg', location: 'MP', grade: 'A', image: 'https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?auto=format&fit=crop&w=800&q=80', category: 'Spice' },
  { id: '10', name: 'Fenugreek', price: 85, quantity: '60 kg', location: 'Rajasthan', grade: 'A', image: 'https://images.unsplash.com/photo-1589135339644-84d41270f913?auto=format&fit=crop&w=800&q=80', category: 'Seed' },
  { id: '11', name: 'Saffron', price: 250000, quantity: '1 kg', location: 'Kashmir', grade: 'A', image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=800&q=80', category: 'Spice' },
  { id: '12', name: 'Cloves', price: 800, quantity: '20 kg', location: 'Tamil Nadu', grade: 'A', image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=800&q=80', category: 'Spice' },
  { id: '13', name: 'Cinnamon', price: 400, quantity: '50 kg', location: 'Kerala', grade: 'A', image: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80', category: 'Spice' },
];

export const CROP_DETAILS: Record<string, any> = {
  'Wheat': {
    sowing: 'Oct - Dec',
    harvest: 'Feb - May',
    soil: 'Loamy',
    climate: 'Cool & Moist',
    water: 'Moderate',
    nutrients: ['Nitrogen', 'Phosphorus', 'Potassium'],
    pests: ['Rust', 'Aphids', 'Smut'],
    yield: '3-4 tons/hectare',
    varieties: ['Sonalika', 'Kalyan Sona', 'WL 711']
  },
  'Rice': {
    sowing: 'Jun - Jul',
    harvest: 'Nov - Dec',
    soil: 'Clayey',
    climate: 'Hot & Humid',
    water: 'High',
    nutrients: ['Nitrogen', 'Zinc'],
    pests: ['Stem Borer', 'Leaf Folder'],
    yield: '4-6 tons/hectare',
    varieties: ['Basmati', 'IR64', 'Jaya']
  },
  'Turmeric': {
    sowing: 'May - Jun',
    harvest: 'Jan - Mar',
    soil: 'Sandy Loam',
    climate: 'Warm & Humid',
    water: 'Moderate',
    nutrients: ['Organic Matter', 'Potash'],
    pests: ['Rhizome Fly', 'Leaf Spot'],
    yield: '20-25 tons/hectare (fresh)',
    varieties: ['Erode', 'Salem', 'Sangli']
  },
  'Saffron': {
    sowing: 'Aug - Sep',
    harvest: 'Oct - Nov',
    soil: 'Well-drained Clay',
    climate: 'Cold & Sunny',
    water: 'Low',
    nutrients: ['Nitrogen', 'Organic Manure'],
    pests: ['Mites', 'Thrips'],
    yield: '2-3 kg/hectare',
    varieties: ['Mongra', 'Lacha', 'Guchhi']
  },
  'Cumin': {
    sowing: 'Oct - Nov',
    harvest: 'Feb - Mar',
    soil: 'Sandy Loam',
    climate: 'Dry & Cool',
    water: 'Low',
    nutrients: ['Phosphorus', 'Nitrogen'],
    pests: ['Wilt', 'Blight'],
    yield: '500-800 kg/hectare',
    varieties: ['GC 4', 'RZ 19']
  },
  'Black Pepper': {
    sowing: 'May - Jun',
    harvest: 'Dec - Jan',
    soil: 'Red Laterite',
    climate: 'Hot & Humid',
    water: 'High',
    nutrients: ['Nitrogen', 'Potash'],
    pests: ['Pollu Beetle', 'Quick Wilt'],
    yield: '2-3 kg/vine',
    varieties: ['Panniyur-1', 'Karimunda']
  },
  'Mustard Seeds': {
    sowing: 'Sep - Oct',
    harvest: 'Feb - Mar',
    soil: 'Sandy Loam',
    climate: 'Cool & Dry',
    water: 'Low',
    nutrients: ['Sulfur', 'Nitrogen'],
    pests: ['Aphids', 'Sawfly'],
    yield: '1-2 tons/hectare',
    varieties: ['Pusa Bold', 'Varuna']
  },
  'Cloves': {
    sowing: 'Jun - Jul',
    harvest: 'Dec - Jan',
    soil: 'Rich Loam',
    climate: 'Warm & Humid',
    water: 'Moderate',
    nutrients: ['Organic Manure', 'NPK'],
    pests: ['Stem Borer', 'Scale Insects'],
    yield: '2-4 kg/tree',
    varieties: ['Zanzibar', 'Amboyna']
  }
};

export const MOCK_WORKERS: Worker[] = [
  { 
    id: '1', 
    name: 'Ram Singh', 
    photo: '👨‍🌾', 
    skill: 'Harvesting', 
    wage: 450, 
    distance: '2.5 km', 
    rating: 4.8, 
    availability: true,
    experience: 12,
    bio: 'Expert in wheat and rice harvesting with over 10 years of experience in Punjab fields. Known for punctuality and efficient work.',
    completedProjects: 145,
    location: 'Amritsar, Punjab',
    phone: '+91 98765 43210',
    languages: ['Hindi', 'Punjabi'],
    verified: true
  },
  { 
    id: '2', 
    name: 'Laxmi Devi', 
    photo: '👩‍🌾', 
    skill: 'Sowing', 
    wage: 400, 
    distance: '1.2 km', 
    rating: 4.9, 
    availability: true,
    experience: 8,
    bio: 'Specialized in traditional and modern sowing techniques. Very careful with seed spacing and depth for optimal growth.',
    completedProjects: 98,
    location: 'Karnal, Haryana',
    phone: '+91 98765 43211',
    languages: ['Hindi', 'Haryanvi'],
    verified: true
  },
  { 
    id: '3', 
    name: 'Karan Kumar', 
    photo: '👨‍🔧', 
    skill: 'Pesticide Spraying', 
    wage: 550, 
    distance: '4.8 km', 
    rating: 4.5, 
    availability: false,
    experience: 5,
    bio: 'Certified pesticide applicator. Trained in safety protocols and efficient chemical usage to minimize waste.',
    completedProjects: 67,
    location: 'Ludhiana, Punjab',
    phone: '+91 98765 43212',
    languages: ['Hindi', 'English'],
    verified: true
  },
  { 
    id: '4', 
    name: 'Priya S.', 
    photo: '👩‍🌾', 
    skill: 'Weeding', 
    wage: 350, 
    distance: '3.1 km', 
    rating: 4.7, 
    availability: true,
    experience: 3,
    bio: 'Hardworking and dedicated to maintaining clean fields. Experienced in organic weeding methods.',
    completedProjects: 42,
    location: 'Rohtak, Haryana',
    phone: '+91 98765 43213',
    languages: ['Hindi'],
    verified: false
  },
];

export const MOCK_MACHINERY = [
  { id: '1', name: 'John Deere 5050D', type: 'Tractor', price: 850000, location: 'Local Shop', distance: 2.5, image: 'https://images.unsplash.com/photo-1594913785162-e6786b42dea3?auto=format&fit=crop&w=800&q=80', company: 'John Deere' },
  { id: '2', name: 'Mahindra Arjun 555', type: 'Tractor', price: 780000, location: 'District Center', distance: 15.0, image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80', company: 'Mahindra' },
  { id: '3', name: 'Kubota Combine Harvester', type: 'Harvester', price: 1500000, location: 'Agro Mart', distance: 5.2, image: 'https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&w=800&q=80', company: 'Kubota' },
  { id: '4', name: 'Sonalika Rotavator', type: 'Rotavator', price: 120000, location: 'Local Shop', distance: 1.8, image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80', company: 'Sonalika' },
];

export const MOCK_NEWS: NewsItem[] = [
  { id: '1', title: 'New MSP Announced', summary: 'Government increases MSP for Rabi crops by 5-7% to support farmers.', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80', date: 'Oct 12, 2023' },
  { id: '2', title: 'Organic Farming Trend', summary: 'Demand for organic wheat rises in urban markets, fetching 20% premium.', image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=400&q=80', date: 'Oct 10, 2023' },
];

export const MOCK_VIDEOS: Video[] = [
  { id: '1', title: 'Modern Drip Irrigation', thumbnail: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=400&q=80', language: 'Hindi' },
  { id: '2', title: 'Soil Health Management', thumbnail: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=400&q=80', language: 'Gujarati' },
];

export const MOCK_PRICE_TRENDS: PriceTrend[] = [
  { month: 'Jun', price: 1800, predicted: 1850 },
  { month: 'Jul', price: 1950, predicted: 2000 },
  { month: 'Aug', price: 1900, predicted: 1950 },
  { month: 'Sep', price: 2100, predicted: 2150 },
  { month: 'Oct', price: 2250, predicted: 2300 },
  { month: 'Nov', price: 2400, predicted: 2450 },
];

export const MOCK_TRADE_STATS = [
  { month: 'Oct', selling: 45000, purchasing: 32000 },
  { month: 'Nov', selling: 52000, purchasing: 28000 },
  { month: 'Dec', selling: 48000, purchasing: 35000 },
  { month: 'Jan', selling: 61000, purchasing: 41000 },
  { month: 'Feb', selling: 55000, purchasing: 38000 },
  { month: 'Mar', selling: 72000, purchasing: 45000 },
];

export const MOCK_WEATHER_FORECAST = [
  { day: 'Mon', temp: 28, condition: 'Sunny', rain: 0, humidity: 45, wind: 12 },
  { day: 'Tue', temp: 29, condition: 'Sunny', rain: 0, humidity: 42, wind: 10 },
  { day: 'Wed', temp: 27, condition: 'Cloudy', rain: 10, humidity: 55, wind: 15 },
  { day: 'Thu', temp: 26, condition: 'Rainy', rain: 80, humidity: 85, wind: 20 },
  { day: 'Fri', temp: 25, condition: 'Rainy', rain: 60, humidity: 80, wind: 18 },
  { day: 'Sat', temp: 27, condition: 'Partly Cloudy', rain: 20, humidity: 65, wind: 14 },
  { day: 'Sun', temp: 28, condition: 'Sunny', rain: 0, humidity: 50, wind: 12 },
];

export const MOCK_NEWS_CATEGORIES = [
  { id: 'prices', title: 'Crop Prices', icon: 'TrendingUp' },
  { id: 'schemes', title: 'Government Schemes', icon: 'FileText' },
  { id: 'weather', title: 'Weather Alerts', icon: 'Cloud' },
  { id: 'tech', title: 'Agri Technology', icon: 'Cpu' },
  { id: 'trends', title: 'Market Trends', icon: 'BarChart' },
];

export const MOCK_HELP_VIDEOS = [
  { id: 'v1', title: 'How to grow organic Wheat', category: 'Crop Growing', language: 'Hindi', thumbnail: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80' },
  { id: 'v2', title: 'Modern Irrigation Techniques', category: 'Irrigation', language: 'English', thumbnail: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=400&q=80' },
  { id: 'v3', title: 'Pest Control Guide', category: 'Pest Control', language: 'Gujarati', thumbnail: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=400&q=80' },
  { id: 'v4', title: 'Using KrishiSetu App', category: 'App Tutorial', language: 'Hindi', thumbnail: 'https://images.unsplash.com/photo-1512428559083-a40ce12b26f5?auto=format&fit=crop&w=400&q=80' },
];

export const MOCK_PESTICIDES = [
  { id: '1', name: 'Neem Shield', company: 'Organic Agri', price: 450, image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=400&q=80', usage: 'Mix 5ml per liter of water. Spray every 15 days.' },
  { id: '2', name: 'Bio-Grow', company: 'Green Earth', price: 800, image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=400&q=80', usage: 'Apply directly to soil near roots. Use during sowing.' },
];

export const MOCK_SHOPS = [
  { id: '1', name: 'Kisan Seva Kendra', location: '1.2 km away', rating: 4.5, image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=400&q=80' },
  { id: '2', name: 'Agro Mart', location: '3.5 km away', rating: 4.2, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80' },
];

export const MOCK_CHATS = [
  { id: '1', name: 'Suresh (Buyer)', lastMsg: 'Is the wheat still available?', time: '10:30 AM', unread: 2 },
  { id: '2', name: 'Ram Singh (Worker)', lastMsg: 'I will be there by 8 AM.', time: 'Yesterday', unread: 0 },
];

