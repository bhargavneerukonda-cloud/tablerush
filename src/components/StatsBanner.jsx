import React from 'react';
import { Zap, Clock, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

export default function StatsBanner({ onOpenInfoModal }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#2C1F19] via-[#211814] to-[#181311] border-y border-[#4A362D] py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 text-xs">
        {/* Core Value Statement */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 font-bold text-[#FDFBF7] text-sm">
              <span>Bypass 80-Min Weekend Biryani & Kebab Lines</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-semibold border border-amber-500/30">
                Live Prototype
              </span>
            </div>
            <p className="text-[#A8988D]">
              4–5 dedicated tables reserved at high-demand Indian venues. Clay tandoors & handis fire synced to your arrival ETA.
            </p>
          </div>
        </div>

        {/* 4 Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full lg:w-auto">
          <div className="bg-[#241C18] border border-[#3D2E26] rounded-xl px-3 py-2 flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <div className="text-[#8E7E73] text-[10px] uppercase font-medium">Wait Time</div>
              <div className="text-[#FDFBF7] font-bold text-xs">0 Mins <span className="text-emerald-400 font-normal">(-80m)</span></div>
            </div>
          </div>

          <div className="bg-[#241C18] border border-[#3D2E26] rounded-xl px-3 py-2 flex items-center gap-2.5">
            <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <div className="text-[#8E7E73] text-[10px] uppercase font-medium">Table Turnover</div>
              <div className="text-[#FDFBF7] font-bold text-xs">40m <span className="text-emerald-400 font-normal">(vs 90m)</span></div>
            </div>
          </div>

          <div className="bg-[#241C18] border border-[#3D2E26] rounded-xl px-3 py-2 flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <div className="text-[#8E7E73] text-[10px] uppercase font-medium">Food Arrival</div>
              <div className="text-[#FDFBF7] font-bold text-xs">Piping Hot <span className="text-amber-400 font-normal">~3 mins</span></div>
            </div>
          </div>

          <div 
            onClick={onOpenInfoModal}
            className="bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl px-3 py-2 flex items-center gap-2.5 cursor-pointer transition-colors"
          >
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <div className="text-amber-300 text-[10px] uppercase font-medium">Partner Model</div>
              <div className="text-amber-200 font-bold text-xs flex items-center gap-1">
                Why 4-5 Tables? &rarr;
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
