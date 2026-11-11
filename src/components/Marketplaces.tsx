import React from 'react';
import { motion } from 'motion/react';
import { Search, Plus, MapPin, Star, Tractor, Hammer, Droplets, Wrench, Truck } from 'lucide-react';
import { Crop, Machinery, AgriService } from '../types';

export const CropMarketplace = ({ crops }: { crops: Crop[] }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-agri-green">Crop Marketplace</h2>
      <button className="p-3 bg-agri-green text-white rounded-2xl shadow-lg"><Plus size={24} /></button>
    </div>
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-soil-brown/40" size={20} />
      <input type="text" placeholder="Search crops, seeds, spices..." className="w-full pl-12 pr-4 py-4 glass-card rounded-2xl focus:outline-none" />
    </div>
    <div className="grid grid-cols-1 gap-4">
      {crops.map(crop => (
        <motion.div whileTap={{ scale: 0.98 }} key={crop.id} className="glass-card overflow-hidden rounded-3xl shadow-sm">
          <img src={crop.image} alt={crop.name} className="w-full h-48 object-cover" />
          <div className="p-5">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-bold text-agri-green">{crop.name}</h3>
                <p className="text-sm text-soil-brown/60 flex items-center gap-1"><MapPin size={14} /> {crop.location}</p>
              </div>
              <span className="text-2xl font-bold text-agri-green">₹{crop.price}</span>
            </div>
            <div className="flex gap-4 mt-4 text-sm">
              <div className="flex-1 p-3 bg-agri-green/5 rounded-2xl">
                <p className="text-soil-brown/50 text-[10px] uppercase font-bold">Quantity</p>
                <p className="font-bold">{crop.quantity}</p>
              </div>
              <div className="flex-1 p-3 bg-agri-green/5 rounded-2xl">
                <p className="text-soil-brown/50 text-[10px] uppercase font-bold">Category</p>
                <p className="font-bold">{crop.category || 'Crop'}</p>
              </div>
            </div>
            <button className="w-full mt-5 py-4 bg-agri-green text-white rounded-2xl font-bold shadow-md">View Details</button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export const MachineryMarketplace = ({ machinery }: { machinery: Machinery[] }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-agri-green">Machinery Marketplace</h2>
    <div className="grid grid-cols-1 gap-4">
      {machinery.map(item => (
        <div key={item.id} className="glass-card overflow-hidden rounded-3xl shadow-sm">
          <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
          <div className="p-5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-agri-green">{item.name}</h3>
              <span className="text-xl font-bold text-agri-green">₹{item.price.toLocaleString()}</span>
            </div>
            <p className="text-sm text-soil-brown/60 mb-4">{item.type} • {item.location}</p>
            <button className="w-full py-4 bg-agri-green text-white rounded-2xl font-bold shadow-md">Contact Seller</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const ServiceMarketplace = ({ services }: { services: AgriService[] }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-agri-green">Agri Services</h2>
    <div className="space-y-4">
      {services.map(service => (
        <div key={service.id} className="glass-card p-4 rounded-3xl flex gap-4 shadow-sm">
          <img src={service.image} alt={service.name} className="w-24 h-24 rounded-2xl object-cover" />
          <div className="flex-1">
            <h4 className="font-bold text-lg text-agri-green">{service.name}</h4>
            <p className="text-xs text-soil-brown/60 mb-2">{service.company}</p>
            <p className="text-sm font-bold text-agri-green mb-3">₹{service.price}</p>
            <button className="w-full py-2 bg-agri-green/10 text-agri-green rounded-xl font-bold text-xs">Book Now</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
