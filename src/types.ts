export type AppMode = 'light' | 'dark' | 'warm';
export type UserRole = 'Farmer' | 'Buyer' | 'Worker' | 'Contractor' | 'Shipping' | null;

export interface WeatherData {
  temp: number;
  condition: string;
  location: string;
}

export interface Crop {
  id: string;
  name: string;
  price: number;
  quantity: string;
  location: string;
  grade: 'A' | 'B' | 'C';
  image: string;
  category?: string;
}

export interface Machinery {
  id: string;
  name: string;
  type: string;
  price: number;
  location: string;
  image: string;
}

export interface AgriService {
  id: string;
  name: string;
  company: string;
  price: string;
  image: string;
}

export interface Worker {
  id: string;
  name: string;
  photo: string;
  skill: string;
  wage: number;
  distance: string;
  rating: number;
  availability: boolean;
  experience: number;
  bio: string;
  completedProjects: number;
  location: string;
  phone: string;
  languages: string[];
  verified: boolean;
}

export interface Contractor {
  id: string;
  name: string;
  photo: string;
  companyName: string;
  rating: number;
  verified: boolean;
  experience: number;
  bio: string;
  location: string;
  phone: string;
  teamSize: number;
  team: Worker[];
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  category?: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  language: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  type: 'text' | 'voice' | 'image';
  image?: string;
}

export interface PriceTrend {
  month: string;
  price: number;
  predicted?: number;
}
