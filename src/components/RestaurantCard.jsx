import React from 'react';
import { Star, Clock, Users, ArrowRight, Flame } from 'lucide-react';

export default function RestaurantCard({ restaurant, onSelect }) {
  const availableTablesCount = restaurant.tables.filter(t => t.available).length;

  return (
    <div className="group bg-[#231B17]/90 border border-[#3A2B23] hover:border-amber-500/60 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col">
      {/* Image Container with Badges */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#191412] via-[#191412]/30 to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 rounded-full bg-rose-600/90 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1 shadow-md">
            <Flame className="w-3 h-3 text-amber-200 fill-amber-200" />
            Bypass {restaurant.typicalWaitMinutes}m Standby
          </span>
          <span className="px-2.5 py-1 rounded-full bg-[#191412]/85 backdrop-blur-md text-amber-400 border border-amber-500/30 text-[11px] font-semibold">
            {restaurant.cuisine}
          </span>
        </div>

        {/* Rating and Reviews */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#191412]/90 backdrop-blur-md border border-[#443329] text-xs font-bold text-white">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>{restaurant.rating}</span>
          <span className="text-[#A8988D] text-[10px]">({restaurant.reviewCount})</span>
        </div>

        {/* Bottom Banner inside Image: Dedicated VIP Tables */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-white">
            <span className={`w-2 h-2 rounded-full ${availableTablesCount > 0 ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`}></span>
            <span className="font-semibold text-emerald-300">
              {availableTablesCount} of {restaurant.tables.length} VIP Tables Open
            </span>
          </div>
          <span className="text-xs font-semibold text-amber-300 bg-[#191412]/85 px-2 py-0.5 rounded border border-[#3E2E26]">
            {restaurant.priceRange}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-[#FDFBF7] group-hover:text-amber-400 transition-colors">
            {restaurant.name}
          </h3>
          <p className="text-xs text-[#A8988D] mt-1 line-clamp-2 leading-relaxed">
            {restaurant.tagline}
          </p>

          <div className="flex items-center gap-3 text-xs text-[#A8988D] mt-3 pt-3 border-t border-[#33251F]">
            <span className="flex items-center gap-1 text-[#D8CCC4]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              {restaurant.neighborhood}
            </span>
            <span>•</span>
            <span className="text-amber-300 font-medium">Avg {restaurant.avgSpend}</span>
          </div>

          {/* Table Preview Pills */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {restaurant.tables.map(t => (
              <span
                key={t.id}
                className={`text-[10px] px-2 py-0.5 rounded-md font-medium border ${
                  t.available
                    ? 'bg-[#2E221D] text-[#E5D7CE] border-[#443329]'
                    : 'bg-[#1D1613] text-[#6E5E54] border-[#291F1A] line-through'
                }`}
              >
                T{t.number} ({t.seats}p)
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onSelect(restaurant)}
          className="mt-5 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20 group-hover:shadow-amber-600/30 transition-all"
        >
          <span>Reserve Dedicated Table & Pre-Order</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
