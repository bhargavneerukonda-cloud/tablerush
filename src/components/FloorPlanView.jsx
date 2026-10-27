import React from 'react';
import { Sparkles, Users, CheckCircle2, Flame } from 'lucide-react';

export default function FloorPlanView({
  restaurant,
  selectedTable,
  onSelectTable,
  partySize
}) {
  return (
    <div className="bg-[#231B17] border border-[#3E2E26] rounded-2xl p-4 sm:p-6 shadow-xl">
      {/* Floorplan Header & Legend */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#362721] pb-4 mb-5">
        <div>
          <h4 className="text-sm font-bold text-[#FDFBF7] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Grand Haveli Dining Map: 5 Dedicated VIP Tables</span>
          </h4>
          <p className="text-xs text-[#A8988D] mt-0.5">
            Select an illuminated VIP royal table. Grey tables are standard walk-in seats facing 80-minute standby.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-amber-500/25 border border-amber-500/80 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            </span>
            <span className="text-amber-300 font-semibold">VIP Royal Reserved</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-[#2D231E] border border-[#44342C]"></span>
            <span className="text-[#8E7E73]">Walk-in Table (70m Wait)</span>
          </div>
        </div>
      </div>

      {/* 2D Architectural Dining Room Canvas */}
      <div className="relative w-full h-[400px] bg-[#1A1412] rounded-xl border border-[#3A2B23] p-4 overflow-hidden select-none">
        {/* Subtle warm spice grid background */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(#f59e0b 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        ></div>

        {/* Architectural Zones */}
        {/* Entrance */}
        <div className="absolute top-2 left-4 px-3 py-1 bg-[#251D19] border border-[#443329] rounded-lg text-[10px] font-bold text-[#D8CCC4] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          Royal Entrance & Floral Baithak
        </div>

        {/* Open Clay Tandoor & Handi Kitchen Pass */}
        <div className="absolute bottom-2 left-1/4 right-1/4 py-1.5 bg-gradient-to-r from-amber-950/60 via-amber-900/40 to-amber-950/60 border border-amber-500/40 rounded-lg text-center text-[10px] font-extrabold text-amber-300 uppercase tracking-wider flex items-center justify-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          Clay Tandoor Bhatti & Slow Dum Handi Pass
        </div>

        {/* Heritage Spice Bar */}
        <div className="absolute top-2 right-4 px-3 py-1 bg-[#251D19] border border-[#3D2E26] rounded-lg text-[10px] font-medium text-[#A8988D]">
          Craft Botanical & Masala Toddy Bar
        </div>

        {/* Standard Walk-in Tables (Greyed Out / Packed) */}
        {restaurant.walkInTables?.map(wTable => (
          <div
            key={wTable.id}
            style={{ left: `${wTable.coords.x}%`, top: `${wTable.coords.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 opacity-40 hover:opacity-75 transition-opacity cursor-not-allowed group"
          >
            <div className="w-11 h-11 rounded-lg bg-[#2B211C] border border-[#3D2E26] flex flex-col items-center justify-center text-[10px] text-[#8E7E73]">
              <span className="font-semibold">W{wTable.number}</span>
              <span className="text-[9px] text-[#6E5E54]">{wTable.seats}p</span>
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block whitespace-nowrap bg-[#251D19] border border-[#443329] text-[#D8CCC4] text-[10px] px-2 py-1 rounded shadow-xl pointer-events-none z-20">
              Walk-in table (Waitlist active)
            </div>
          </div>
        ))}

        {/* The 5 Dedicated TableRush VIP Tables */}
        {restaurant.tables.map(table => {
          const isSelected = selectedTable?.id === table.id;
          const isCompatible = table.seats >= partySize;

          return (
            <div
              key={table.id}
              onClick={() => {
                if (table.available) onSelectTable(table);
              }}
              style={{ left: `${table.coords.x}%`, top: `${table.coords.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 group z-10 ${
                isSelected ? 'scale-110' : 'hover:scale-105'
              }`}
            >
              {/* Warm Pulsing ring if selected */}
              {isSelected && (
                <div className="absolute -inset-2 rounded-2xl bg-amber-500/25 animate-ping pointer-events-none"></div>
              )}

              {/* Table Shape Styling */}
              <div className={`p-2.5 rounded-xl border flex flex-col items-center justify-center shadow-lg transition-all ${
                isSelected
                  ? 'bg-gradient-to-br from-amber-500 to-amber-600 border-amber-300 text-amber-950 font-black ring-4 ring-amber-500/30 shadow-amber-500/40'
                  : table.available
                  ? 'bg-[#291F1A] border-amber-500/60 hover:border-amber-400 text-amber-300 hover:bg-[#322620]'
                  : 'bg-[#1F1714] border-[#31251E] text-[#6E5E54] opacity-50 cursor-not-allowed'
              } ${
                table.shape === 'booth'
                  ? 'w-16 h-14 rounded-lg'
                  : table.shape === 'round'
                  ? 'w-14 h-14 rounded-full'
                  : table.shape === 'bar'
                  ? 'w-16 h-12 rounded-md'
                  : 'w-20 h-14 rounded-xl'
              }`}>
                <div className="flex items-center gap-1 text-xs">
                  <span>T{table.number}</span>
                </div>
                <div className={`text-[10px] flex items-center gap-0.5 ${isSelected ? 'text-amber-950 font-bold' : 'text-[#A8988D]'}`}>
                  <Users className="w-2.5 h-2.5" />
                  <span>{table.seats}p</span>
                </div>
              </div>

              {/* Hover Badge / Zone Indicator */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-[#251D19] border border-amber-500/50 px-2.5 py-1 rounded-lg text-center shadow-2xl pointer-events-none z-30">
                <div className="text-[11px] font-bold text-amber-300">{table.name}</div>
                <div className="text-[9px] text-[#A8988D]">{table.zone} • {table.seats} Guests Max</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Table Inspection Card */}
      {selectedTable && (
        <div className="mt-4 p-3.5 rounded-xl bg-[#1A1412] border border-amber-500/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-sm shrink-0">
              T{selectedTable.number}
            </div>
            <div>
              <div className="text-xs font-bold text-[#FDFBF7] flex items-center gap-2">
                <span>{selectedTable.name}</span>
                <span className="px-1.5 py-0.2 text-[9px] font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded">
                  {selectedTable.zone}
                </span>
              </div>
              <p className="text-[11px] text-[#A8988D] mt-0.5">
                {selectedTable.vibe}
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[10px] text-emerald-400 font-semibold block">Available Tonight</span>
            <span className="text-xs text-[#D8CCC4] font-medium">{selectedTable.seats} Seat Capacity</span>
          </div>
        </div>
      )}
    </div>
  );
}
