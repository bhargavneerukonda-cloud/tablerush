import React, { useState } from 'react';
import { Search, Sparkles, AlertCircle } from 'lucide-react';
import RestaurantCard from './RestaurantCard';

export default function RestaurantList({ restaurants, onSelectRestaurant }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');

  const cuisines = [
    'All',
    'Royal Mughlai & Dum Pukht',
    'North Indian & Tandoor',
    'Coastal South Indian',
    'Modern Regional Indian'
  ];

  const filteredRestaurants = restaurants.filter(r => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.menu.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCuisine = selectedCuisine === 'All' || r.cuisine === selectedCuisine;

    return matchesSearch && matchesCuisine;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Title Section */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>India's Most In-Demand Dining Venues • Guaranteed Table Hold</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#FDFBF7] tracking-tight">
          Skip the 80-Minute Weekend Lines. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
            Your Table & Sizzling Kebabs Await.
          </span>
        </h1>
        <p className="mt-3 text-sm text-[#A8988D]">
          Top iconic Indian restaurants hold 4 to 5 exclusive tables for DineAhead guests.
          Clay tandoors and slow-dum handis fire synced precisely to your arrival ETA.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between mb-8">
        {/* Search input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-[#8E7E73] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Biryani, Dal Makhani, Kebabs, or City..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#231B17] border border-[#3E2E26] focus:border-amber-500 rounded-xl text-xs text-[#FDFBF7] placeholder-[#7E6E64] focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
          />
        </div>

        {/* Cuisine Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {cuisines.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCuisine(c)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCuisine === c
                  ? 'bg-amber-500 text-amber-950 font-bold shadow-md shadow-amber-600/20'
                  : 'bg-[#231B17] border border-[#3E2E26] text-[#A8988D] hover:text-[#FDFBF7] hover:border-amber-500/40'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Restaurants Grid */}
      {filteredRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map(restaurant => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onSelect={onSelectRestaurant}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#231B17]/60 rounded-2xl border border-[#3A2B23]">
          <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
          <h4 className="text-base font-bold text-white">No Venues Found</h4>
          <p className="text-xs text-[#A8988D] mt-1">Try a different search term or select "All".</p>
        </div>
      )}
    </div>
  );
}
