import React, { useState } from 'react';
import { Users, Clock, CheckCircle2, LayoutGrid, Map } from 'lucide-react';
import FloorPlanView from './FloorPlanView';

export default function TableSelector({
  restaurant,
  tables,
  selectedTable,
  setSelectedTable,
  partySize,
  setPartySize,
  timeSlot,
  setTimeSlot,
  restaurantName
}) {
  const [viewStyle, setViewStyle] = useState('floorplan'); // 'floorplan' or 'grid'

  const timeSlots = [
    '7:00 PM',
    '7:30 PM',
    '8:00 PM (Peak)',
    '8:30 PM (Peak)',
    '9:00 PM (Peak)',
    '9:30 PM',
    '10:00 PM'
  ];

  return (
    <div className="space-y-6">
      {/* Table Selection Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-[#FDFBF7] flex items-center gap-2">
            <span>1. Choose from 5 Dedicated VIP Royal Tables</span>
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
              Guaranteed Hold
            </span>
          </h3>
          <p className="text-xs text-[#A8988D] mt-0.5">
            Held exclusively for DineAhead guests at {restaurantName}.
          </p>
        </div>

        {/* View Switcher: 2D Floorplan vs Cards */}
        <div className="flex bg-[#231B17] p-1 rounded-xl border border-[#3E2E26] self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewStyle('floorplan')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewStyle === 'floorplan'
                ? 'bg-amber-500 text-amber-950 shadow-sm'
                : 'text-[#A8988D] hover:text-white'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Haveli Floorplan</span>
          </button>
          <button
            type="button"
            onClick={() => setViewStyle('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewStyle === 'grid'
                ? 'bg-amber-500 text-amber-950 shadow-sm'
                : 'text-[#A8988D] hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Table Cards</span>
          </button>
        </div>
      </div>

      {/* Switch between Floorplan and Grid */}
      {viewStyle === 'floorplan' ? (
        <FloorPlanView
          restaurant={restaurant}
          selectedTable={selectedTable}
          onSelectTable={setSelectedTable}
          partySize={partySize}
        />
      ) : (
        /* Tables Grid Layout */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {tables.map((table) => {
            const isSelected = selectedTable?.id === table.id;
            const isCompatible = table.seats >= partySize;

            return (
              <div
                key={table.id}
                onClick={() => {
                  if (table.available) {
                    setSelectedTable(table);
                  }
                }}
                className={`relative rounded-xl p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                  !table.available
                    ? 'bg-[#1E1714] border-[#2D211B] opacity-50 cursor-not-allowed'
                    : isSelected
                    ? 'bg-amber-500/15 border-amber-500 ring-2 ring-amber-500/40 shadow-lg shadow-amber-500/10'
                    : 'bg-[#231B17] border-[#3E2E26] hover:border-[#523E34] hover:bg-[#2A201B]'
                }`}
              >
                {/* Selected Badge */}
                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-amber-500 text-amber-950 rounded-full flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30">
                      Table #{table.number}
                    </span>
                    <span className="text-[11px] font-semibold text-[#D8CCC4] flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#A8988D]" />
                      Up to {table.seats}
                    </span>
                  </div>

                  <div className="mt-2.5 font-bold text-sm text-[#FDFBF7]">
                    {table.name}
                  </div>

                  <p className="text-[11px] text-[#A8988D] mt-1 leading-relaxed">
                    {table.vibe}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-[#362721] flex items-center justify-between text-[10px]">
                  <span className={`font-semibold flex items-center gap-1 ${table.available ? 'text-emerald-400' : 'text-rose-400'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${table.available ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
                    {table.available ? 'Available Now' : 'Reserved'}
                  </span>
                  {!isCompatible && table.available && (
                    <span className="text-amber-400 font-medium">Too small for {partySize}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Party Size & Time Slot Pickers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* Party Size */}
        <div className="bg-[#231B17] border border-[#3E2E26] rounded-xl p-4">
          <label className="text-xs font-bold text-[#D8CCC4] block mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-400" />
              Party Size
            </span>
            <span className="text-[11px] text-[#A8988D] font-normal">Tables auto-match capacity</span>
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => {
                  setPartySize(num);
                  if (selectedTable && selectedTable.seats < num) {
                    const candidate = tables.find(t => t.available && t.seats >= num);
                    if (candidate) setSelectedTable(candidate);
                  }
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                  partySize === num
                    ? 'bg-amber-500 text-amber-950 shadow'
                    : 'bg-[#1A1412] border border-[#362721] text-[#D8CCC4] hover:border-[#4E392F]'
                }`}
              >
                {num} {num === 1 ? 'Guest' : 'Guests'}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slot */}
        <div className="bg-[#231B17] border border-[#3E2E26] rounded-xl p-4">
          <label className="text-xs font-bold text-[#D8CCC4] block mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              Arrival Slot (Tonight)
            </span>
            <span className="text-[11px] text-amber-400 font-medium">GPS arrival synced</span>
          </label>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setTimeSlot(slot)}
                className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  timeSlot === slot
                    ? 'bg-amber-500 text-amber-950 font-bold shadow'
                    : 'bg-[#1A1412] border border-[#362721] text-[#D8CCC4] hover:border-[#4E392F]'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
