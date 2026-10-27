import React, { useState } from 'react';
import { Plus, Minus, Clock, Utensils, Sparkles, ChefHat, MessageSquare, Users } from 'lucide-react';
import GroupOrderManager from './GroupOrderManager';

export default function MenuPreOrder({
  menu,
  cart,
  setCart,
  servingPreference,
  setServingPreference,
  orderNotes,
  setOrderNotes,
  partyMembers,
  setPartyMembers,
  activeGuestId,
  setActiveGuestId
}) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isGroupMode, setIsGroupMode] = useState(false);

  const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];

  const filteredItems = activeCategory === 'All'
    ? menu
    : menu.filter(item => item.category === activeCategory);

  const activeGuest = partyMembers?.find(m => m.id === activeGuestId) || partyMembers?.[0];

  const getItemQuantityForGuest = (itemId) => {
    if (!isGroupMode) {
      const found = cart.find(c => c.id === itemId);
      return found ? found.quantity : 0;
    }
    const found = cart.find(c => c.id === itemId && c.guestId === activeGuestId);
    return found ? found.quantity : 0;
  };

  const addItem = (item) => {
    setCart(prev => {
      const guestId = isGroupMode ? activeGuestId : 'default';
      const guestName = isGroupMode ? (activeGuest?.name || 'Guest') : 'Table Guest';

      const exists = prev.find(c => c.id === item.id && (isGroupMode ? c.guestId === guestId : true));
      if (exists) {
        return prev.map(c => 
          (c.id === item.id && (isGroupMode ? c.guestId === guestId : true)) 
            ? { ...c, quantity: c.quantity + 1 } 
            : c
        );
      }
      return [...prev, { ...item, quantity: 1, guestId, orderedBy: guestName }];
    });
  };

  const removeItem = (itemId) => {
    setCart(prev => {
      const guestId = isGroupMode ? activeGuestId : 'default';
      const exists = prev.find(c => c.id === itemId && (isGroupMode ? c.guestId === guestId : true));
      if (!exists) return prev;
      if (exists.quantity === 1) {
        return prev.filter(c => !(c.id === itemId && (isGroupMode ? c.guestId === guestId : true)));
      }
      return prev.map(c => 
        (c.id === itemId && (isGroupMode ? c.guestId === guestId : true)) 
          ? { ...c, quantity: c.quantity - 1 } 
          : c
      );
    });
  };

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-[#FDFBF7] flex items-center gap-2">
            <span>2. Pre-Order Dishes (Tandoor & Handi Synced)</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
              Cooked Fresh on Arrival
            </span>
          </h3>
          <p className="text-xs text-[#A8988D] mt-0.5">
            Select items now so the clay tandoor and slow-dum handis fire right as your car enters the 5-minute radius.
          </p>
        </div>

        {/* Group Ordering Mode Toggle */}
        <button
          type="button"
          onClick={() => setIsGroupMode(!isGroupMode)}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all self-start sm:self-auto ${
            isGroupMode
              ? 'bg-amber-500 text-amber-950 shadow-md shadow-amber-500/20'
              : 'bg-[#231B17] border border-[#3E2E26] text-[#D8CCC4] hover:text-white'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>{isGroupMode ? '✓ Family/Group Order Active' : 'Invite Family/Friends & Split Bill'}</span>
        </button>
      </div>

      {/* Group Order Collaboration Manager */}
      {isGroupMode && partyMembers && (
        <GroupOrderManager
          partyMembers={partyMembers}
          setPartyMembers={setPartyMembers}
          activeGuestId={activeGuestId}
          setActiveGuestId={setActiveGuestId}
          cart={cart}
        />
      )}

      {/* Serving Timing Strategy Selector */}
      <div className="bg-[#231B17] border border-[#3E2E26] rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <ChefHat className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-[#FDFBF7]">How should the Ustad & Kitchen pace your royal feast?</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label
            onClick={() => setServingPreference('starters_on_arrival')}
            className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
              servingPreference === 'starters_on_arrival'
                ? 'bg-amber-500/15 border-amber-500 text-white shadow-sm'
                : 'bg-[#1A1412] border-[#362721] text-[#A8988D] hover:border-[#4E392F]'
            }`}
          >
            <div className="text-xs font-bold flex items-center justify-between">
              <span>Classic Dawat (Recommended)</span>
              {servingPreference === 'starters_on_arrival' && <span className="w-2 h-2 rounded-full bg-amber-400"></span>}
            </div>
            <p className="text-[11px] text-[#A8988D] mt-1">
              Hot Kebabs & Lassi land 2m after seating; Biryani & Naans fired 15m later.
            </p>
          </label>

          <label
            onClick={() => setServingPreference('express_together')}
            className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
              servingPreference === 'express_together'
                ? 'bg-amber-500/15 border-amber-500 text-white shadow-sm'
                : 'bg-[#1A1412] border-[#362721] text-[#A8988D] hover:border-[#4E392F]'
            }`}
          >
            <div className="text-xs font-bold flex items-center justify-between">
              <span>Express Feast (All Together)</span>
              {servingPreference === 'express_together' && <span className="w-2 h-2 rounded-full bg-amber-400"></span>}
            </div>
            <p className="text-[11px] text-[#A8988D] mt-1">
              Kebabs, Biryanis and hot Naans served together as you sit. Finish in 30 mins flat.
            </p>
          </label>

          <label
            onClick={() => setServingPreference('on_guest_call')}
            className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
              servingPreference === 'on_guest_call'
                ? 'bg-amber-500/15 border-amber-500 text-white shadow-sm'
                : 'bg-[#1A1412] border-[#362721] text-[#A8988D] hover:border-[#4E392F]'
            }`}
          >
            <div className="text-xs font-bold flex items-center justify-between">
              <span>Leisurely Baithak Pace</span>
              {servingPreference === 'on_guest_call' && <span className="w-2 h-2 rounded-full bg-amber-400"></span>}
            </div>
            <p className="text-[11px] text-[#A8988D] mt-1">
              Drinks & Kebabs first; tap "Fire Biryani & Naans" from your phone when ready.
            </p>
          </label>
        </div>
      </div>

      {/* Category Pills & Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-amber-500 text-amber-950 font-bold'
                  : 'bg-[#231B17] border border-[#3E2E26] text-[#A8988D] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isGroupMode && activeGuest && (
          <div className="text-xs text-amber-400 font-semibold hidden sm:block">
            Ordering for: <strong>{activeGuest.name}</strong>
          </div>
        )}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredItems.map(item => {
          const qty = getItemQuantityForGuest(item.id);

          return (
            <div
              key={item.id}
              className={`bg-[#231B17] border rounded-xl p-3.5 flex gap-3.5 transition-all ${
                qty > 0 ? 'border-amber-500/70 bg-amber-500/10' : 'border-[#3E2E26] hover:border-[#523E34]'
              }`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 rounded-lg object-cover shrink-0 border border-[#3E2E26]"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-bold text-sm text-[#FDFBF7]">{item.name}</h4>
                    <span className="font-extrabold text-sm text-amber-400 shrink-0">
                      ₹{item.price}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#A8988D] line-clamp-2 mt-1">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] text-[#D8CCC4] flex items-center gap-1 bg-[#1A1412] px-2 py-0.5 rounded border border-[#362721]">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {item.prepMinutes}m tandoor/dum
                    </span>
                    {item.dietary?.map((tag, i) => (
                      <span key={i} className="text-[10px] text-amber-300 bg-[#2E221D] px-1.5 py-0.5 rounded border border-[#443329]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Add / Remove Controls */}
                <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-[#362721]">
                  <span className="text-[10px] text-[#7E6E64]">
                    {isGroupMode ? `for ${activeGuest?.name}` : 'for table'}
                  </span>

                  {qty > 0 ? (
                    <div className="flex items-center gap-2 bg-[#1A1412] px-2 py-1 rounded-lg border border-amber-500/50">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-6 h-6 rounded bg-[#2D221D] hover:bg-[#3D2E26] flex items-center justify-center text-white transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-amber-400 w-5 text-center">{qty}</span>
                      <button
                        onClick={() => addItem(item)}
                        className="w-6 h-6 rounded bg-amber-500 hover:bg-amber-400 flex items-center justify-center text-amber-950 font-bold transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addItem(item)}
                      className="px-3 py-1 rounded-lg bg-[#2E221D] hover:bg-amber-500 hover:text-amber-950 text-[#FDFBF7] text-xs font-bold flex items-center gap-1.5 transition-all border border-[#443329]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add to Feast
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Special Cooking Notes */}
      <div className="bg-[#231B17] border border-[#3E2E26] rounded-xl p-4">
        <label className="text-xs font-bold text-[#D8CCC4] mb-2 flex items-center gap-1.5">
          <MessageSquare className="w-4 h-4 text-amber-400" />
          Special Kitchen Notes & Indian Spice Preferences
        </label>
        <input
          type="text"
          value={orderNotes}
          onChange={(e) => setOrderNotes(e.target.value)}
          placeholder="e.g. Medium spicy, extra sirka onions & mint chutney, crispy chur chur naan, less ghee on dal..."
          className="w-full px-3 py-2 bg-[#1A1412] border border-[#3E2E26] rounded-lg text-xs text-[#FDFBF7] placeholder-[#7E6E64] focus:outline-none focus:border-amber-500 transition-colors"
        />
      </div>
    </div>
  );
}
