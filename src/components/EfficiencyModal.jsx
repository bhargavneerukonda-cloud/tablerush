import React from 'react';
import { X, Sparkles, TrendingUp, Clock, ShieldCheck, Flame, UtensilsCrossed } from 'lucide-react';

export default function EfficiencyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#231B17] border border-[#3E2E26] rounded-2xl shadow-2xl p-6 sm:p-8 text-[#FDFBF7] my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-[#A8988D] hover:text-white hover:bg-[#2D221D] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>The Indian Restaurant Model & Unit Economics</span>
        </div>
        <h2 className="text-2xl font-black text-[#FDFBF7]">
          The 4–5 Dedicated Table System: <br />
          <span className="bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
            Why It Solves Indian Weekend Rushes
          </span>
        </h2>
        <p className="text-xs text-[#A8988D] mt-2 leading-relaxed">
          Indian dining typically suffers from long 80–100 minute table occupancy. Here is how allocating 4 to 5 tables at busy Indian venues doubles prime-time revenue and guarantees piping-hot food.
        </p>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {/* Pillar 1 */}
          <div className="p-4 rounded-xl bg-[#1A1412] border border-[#362721] flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-white">1. Solves the "Cold Naan & Kebab" Challenge</h3>
              <p className="text-xs text-[#A8988D] mt-1.5 leading-relaxed">
                Tandoori kebabs and naans become rubbery if cooked too early. DineAhead uses a <strong>Two-Stage Bhatti Sync</strong>: handis are spiced and skewers prepared, but the hot tandoor fires only when your car reaches the 5-minute radius.
              </p>
            </div>
            <div className="mt-3 pt-2 text-[10px] text-amber-400 font-semibold border-t border-[#362721]">
              Result: Hot crisp naans & juicy kebabs served within 3 mins.
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-4 rounded-xl bg-[#1A1412] border border-[#362721] flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-white">2. +110% Table Turnover Speed</h3>
              <p className="text-xs text-[#A8988D] mt-1.5 leading-relaxed">
                Standard Indian family dining takes 90 mins (browsing thick menus, waiting for slow-dum biryanis, requesting the bill). With pre-ordered courses and automatic checkout, dine-in time drops to <strong>40 mins</strong>.
              </p>
            </div>
            <div className="mt-3 pt-2 text-[10px] text-emerald-400 font-semibold border-t border-[#362721]">
              Result: The restaurant turns each table 3 times during peak dinner!
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-4 rounded-xl bg-[#1A1412] border border-[#362721] flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-white">3. Zero No-Show Risk (₹500 Deposit)</h3>
              <p className="text-xs text-[#A8988D] mt-1.5 leading-relaxed">
                Popular restaurants cannot afford empty tables during Saturday night rush. A modest ₹500 credit (deducted 100% from the final food check) guarantees guest intent and ensures 99% arrival reliability.
              </p>
            </div>
            <div className="mt-3 pt-2 text-[10px] text-blue-400 font-semibold border-t border-[#362721]">
              Result: 15-minute grace period protects restaurant floor revenue.
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-4 rounded-xl bg-[#1A1412] border border-[#362721] flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-white">4. Why 4–5 Tables Is the Sweet Spot</h3>
              <p className="text-xs text-[#A8988D] mt-1.5 leading-relaxed">
                Top restaurants will never surrender their whole dining room to an app. Reserving 4–5 tables (10–12% of seating) keeps 88% of tables open for traditional walk-in crowds while providing an exclusive VIP fast-lane.
              </p>
            </div>
            <div className="mt-3 pt-2 text-[10px] text-purple-400 font-semibold border-t border-[#362721]">
              Result: Immediate restaurant owner buy-in & massive incremental revenue.
            </div>
          </div>
        </div>

        {/* Close Modal Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-extrabold text-xs transition-colors"
          >
            Got It! Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
