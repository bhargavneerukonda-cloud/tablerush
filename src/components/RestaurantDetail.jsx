import React, { useState } from 'react';
import { ArrowLeft, Star, Clock, MapPin, ShieldCheck, Flame, ShoppingBag, ArrowRight } from 'lucide-react';
import TableSelector from './TableSelector';
import MenuPreOrder from './MenuPreOrder';

export default function RestaurantDetail({
  restaurant,
  onBack,
  onProceedToBooking
}) {
  const [activeTab, setActiveTab] = useState('table'); // 'table' or 'menu'
  
  // Table selection
  const [selectedTable, setSelectedTable] = useState(restaurant.tables.find(t => t.available) || restaurant.tables[0]);
  const [partySize, setPartySize] = useState(2);
  const [timeSlot, setTimeSlot] = useState('8:00 PM (Peak)');

  // Group Members State
  const [partyMembers, setPartyMembers] = useState([
    { id: 'm1', name: 'Rahul (Host)', isHost: true },
    { id: 'm2', name: 'Priya S.', isHost: false }
  ]);
  const [activeGuestId, setActiveGuestId] = useState('m1');

  // Menu pre-ordering
  const [cart, setCart] = useState([]);
  const [servingPreference, setServingPreference] = useState('starters_on_arrival');
  const [orderNotes, setOrderNotes] = useState('');

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleOpenBooking = () => {
    if (!selectedTable) {
      alert('Please select a reserved table first.');
      return;
    }
    if (cart.length === 0) {
      alert('Please select at least 1 dish to pre-order so the kitchen can sync your meal.');
      return;
    }
    onProceedToBooking({
      restaurant,
      table: selectedTable,
      partySize: Math.max(partySize, partyMembers.length),
      timeSlot,
      cart,
      partyMembers,
      servingPreference,
      orderNotes
    });
  };

  return (
    <div className="min-h-screen pb-28">
      {/* Restaurant Hero Banner */}
      <div className="relative h-72 sm:h-80 w-full overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#191412] via-[#191412]/60 to-[#191412]/20"></div>

        {/* Top Back Navigation & Badges */}
        <div className="absolute top-4 left-4 right-4 max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1A1412]/90 backdrop-blur-md border border-[#3E2E26] text-xs font-semibold text-white hover:bg-[#2A1F1A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>All Restaurants</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-rose-600/90 text-white text-xs font-bold flex items-center gap-1 shadow-md">
              <Flame className="w-3.5 h-3.5 fill-amber-200 text-amber-200" />
              Bypass {restaurant.typicalWaitMinutes}m Standby Line
            </span>
          </div>
        </div>

        {/* Hero Bottom Info */}
        <div className="absolute bottom-6 left-4 right-4 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
                <span>{restaurant.cuisine}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#D8CCC4]">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  {restaurant.neighborhood}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#FDFBF7] tracking-tight">
                {restaurant.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#D8CCC4] mt-1 max-w-2xl leading-relaxed">
                {restaurant.tagline}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="px-3 py-2 rounded-xl bg-[#231B17]/90 backdrop-blur-md border border-[#443329] text-right">
                <div className="flex items-center gap-1 text-amber-400 font-bold text-sm justify-end">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{restaurant.rating}</span>
                </div>
                <div className="text-[10px] text-[#A8988D]">{restaurant.reviewCount} reviews</div>
              </div>
              <div className="px-3 py-2 rounded-xl bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-amber-300 text-right">
                <div className="text-xs font-bold">5 VIP Tables</div>
                <div className="text-[10px] text-amber-400">Reserved for App</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Step Navigation Tabs */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab('table')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'table'
                ? 'bg-amber-500 text-amber-950 shadow-lg shadow-amber-500/20'
                : 'bg-[#231B17] border border-[#3E2E26] text-[#A8988D] hover:text-white'
            }`}
          >
            <span>Step 1: Choose 1 of 5 Royal Tables</span>
            {selectedTable && (
              <span className="px-1.5 py-0.5 rounded bg-amber-950/30 text-[10px]">
                Table #{selectedTable.number}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'menu'
                ? 'bg-amber-500 text-amber-950 shadow-lg shadow-amber-500/20'
                : 'bg-[#231B17] border border-[#3E2E26] text-[#A8988D] hover:text-white'
            }`}
          >
            <span>Step 2: Pre-Order Indian Feast & Courses</span>
            {cartItemCount > 0 && (
              <span className="px-1.5 py-0.5 rounded bg-amber-400 text-amber-950 text-[10px] font-extrabold">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'table' ? (
          <div>
            <TableSelector
              restaurant={restaurant}
              tables={restaurant.tables}
              selectedTable={selectedTable}
              setSelectedTable={setSelectedTable}
              partySize={partySize}
              setPartySize={setPartySize}
              timeSlot={timeSlot}
              setTimeSlot={setTimeSlot}
              restaurantName={restaurant.name}
            />

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setActiveTab('menu')}
                className="py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
              >
                <span>Proceed to Pre-Order Food & Courses</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div>
            <MenuPreOrder
              menu={restaurant.menu}
              cart={cart}
              setCart={setCart}
              servingPreference={servingPreference}
              setServingPreference={setServingPreference}
              orderNotes={orderNotes}
              setOrderNotes={setOrderNotes}
              partyMembers={partyMembers}
              setPartyMembers={setPartyMembers}
              activeGuestId={activeGuestId}
              setActiveGuestId={setActiveGuestId}
            />
          </div>
        )}
      </div>

      {/* Sticky Bottom Bar with Order Summary & Checkout Trigger */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#1A1412]/95 backdrop-blur-md border-t border-[#362721] py-3.5 px-4 sm:px-8 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Reservation Summary */}
          <div className="flex items-center gap-4 text-xs">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#241C18] border border-[#3E2E26] text-[#D8CCC4]">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Table #{selectedTable?.number} ({selectedTable?.zone})</span>
              <span className="text-[#5A453A]">•</span>
              <span className="text-amber-400 font-semibold">{timeSlot}</span>
            </div>

            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span className="text-[#A8988D]">Pre-Order:</span>
              <strong className="text-[#FDFBF7] font-bold">{cartItemCount} items (₹{cartTotal})</strong>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {activeTab === 'table' ? (
              <button
                onClick={() => setActiveTab('menu')}
                className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20"
              >
                <span>Select Pre-Order Dishes &rarr;</span>
              </button>
            ) : (
              <button
                onClick={handleOpenBooking}
                disabled={cart.length === 0}
                className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-950 font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>Confirm VIP Reservation (₹500 Deposit Credited)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
