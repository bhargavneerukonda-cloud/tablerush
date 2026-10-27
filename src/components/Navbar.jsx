import React from 'react';
import { UtensilsCrossed, ChefHat, Sparkles, Clock, MapPin, HelpCircle } from 'lucide-react';

export default function Navbar({
  currentView,
  setCurrentView,
  activeOrder,
  onOpenInfoModal,
  onOpenActiveTracker
}) {
  return (
    <header className="sticky top-0 z-40 bg-[#1A1412]/95 backdrop-blur-md border-b border-[#362721] shadow-lg shadow-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            onClick={() => setCurrentView('browse')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-600/30 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-5 h-5 text-amber-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-[#FDFBF7] group-hover:text-amber-400 transition-colors">
                  Dine<span className="text-amber-500">Ahead</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded">
                  Royal Reserved
                </span>
              </div>
              <p className="text-[11px] text-[#A8988D] hidden sm:block">Pre-Book 5 VIP Tables & Arrival Synced Indian Feasts</p>
            </div>
          </div>

          {/* Location & Key Guarantee pill */}
          <div className="hidden md:flex items-center gap-2 bg-[#251D19] border border-[#3D2E26] px-3.5 py-1.5 rounded-full text-xs text-[#D8CCC4]">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-medium text-[#FDFBF7]">Delhi NCR • Mumbai • Bengaluru</span>
            <span className="text-[#5A453A]">•</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              4–5 Tables / Venue
            </span>
          </div>

          {/* Right Navigation & View Switchers */}
          <div className="flex items-center gap-3">
            {/* Active order quick pill */}
            {activeOrder && (
              <button
                onClick={onOpenActiveTracker}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold hover:bg-amber-500/30 transition-colors animate-pulse"
              >
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>ETA: {activeOrder.etaMinutes}m Live</span>
              </button>
            )}

            {/* View Switcher: Diner vs Kitchen */}
            <div className="flex bg-[#251D19] p-1 rounded-xl border border-[#3D2E26]">
              <button
                onClick={() => setCurrentView('browse')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  currentView === 'browse' || currentView === 'restaurant'
                    ? 'bg-amber-500 text-amber-950 font-bold shadow-sm'
                    : 'text-[#A8988D] hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Diner</span> Mode
              </button>
              <button
                onClick={() => setCurrentView('kitchen')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all relative ${
                  currentView === 'kitchen'
                    ? 'bg-amber-500 text-amber-950 font-bold shadow-sm'
                    : 'text-[#A8988D] hover:text-white'
                }`}
              >
                <ChefHat className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Kitchen</span> KDS
                <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5"></span>
              </button>
            </div>

            {/* Why 4-5 tables info button */}
            <button
              onClick={onOpenInfoModal}
              title="How the 4-5 table allocation model works"
              className="p-2 rounded-xl text-[#A8988D] hover:text-amber-400 hover:bg-[#251D19] border border-[#3D2E26] transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
