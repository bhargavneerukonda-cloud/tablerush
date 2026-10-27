import React, { useState } from 'react';
import { 
  Navigation, 
  ChefHat, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Flame, 
  Sparkles, 
  Receipt, 
  Utensils, 
  Car,
  GlassWater
} from 'lucide-react';

export default function ArrivalTracker({ activeOrder, onUpdateOrder, onViewKitchen, onCompleteDining }) {
  if (!activeOrder) return null;

  const [eta, setEta] = useState(activeOrder.etaMinutes ?? 10);
  const [trafficDelayed, setTrafficDelayed] = useState(activeOrder.trafficDelayed || false);
  const [activeCourseStage, setActiveCourseStage] = useState(activeOrder.courseStage || 'starters_cooking');
  const [staffServiceAlert, setStaffServiceAlert] = useState(null);

  const handleSetDistance = (newEta, delayed = false) => {
    setEta(newEta);
    setTrafficDelayed(delayed);

    let stage = activeCourseStage;
    if (newEta === 0 && stage === 'starters_cooking') {
      stage = 'starters_served';
    }

    const updatedOrder = {
      ...activeOrder,
      etaMinutes: newEta,
      trafficDelayed: delayed,
      courseStage: stage,
      status: newEta > 6 ? 'in_transit' : newEta > 1 ? 'near_restaurant' : 'seated',
      items: activeOrder.items.map(item => {
        if (delayed) {
          return { ...item, status: 'hold_delayed' };
        }
        if (newEta <= 5 && item.course === 'Starters') {
          return { ...item, status: 'firing' };
        }
        if (newEta <= 2 && item.course === 'Mains' && activeOrder.servingPreference === 'express_together') {
          return { ...item, status: 'firing' };
        }
        if (newEta === 0 && item.course === 'Starters') {
          return { ...item, status: 'served' };
        }
        return item;
      })
    };
    onUpdateOrder(updatedOrder);
  };

  const handleFireMains = () => {
    setActiveCourseStage('mains_cooking');
    const updated = {
      ...activeOrder,
      courseStage: 'mains_cooking',
      items: activeOrder.items.map(i => i.course === 'Mains' ? { ...i, status: 'firing' } : i)
    };
    onUpdateOrder(updated);
  };

  const handleRequestService = (serviceType) => {
    setStaffServiceAlert(serviceType);
    setTimeout(() => setStaffServiceAlert(null), 4000);
  };

  const getStageDescription = () => {
    if (trafficDelayed) {
      return {
        title: "City Traffic Delay Compensator Engaged",
        sub: `Slow-moving traffic detected (+10 mins). Table #${activeOrder.tableNumber} is safely held for you.`,
        kitchenAction: "⏸️ USTAD HOLD ACTIVE: Charcoal bhatti & dum handi throttled to keep food juicy and hot!",
        badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse"
      };
    }

    if (eta > 6) {
      return {
        title: "En Route to Restaurant",
        sub: `GPS calculates you are approx. ${eta} minutes away. Table #${activeOrder.tableNumber} is locked and dressed with brassware.`,
        kitchenAction: "Kitchen Mise-En-Place Ready: Table reserved, handi spiced, skewers ready.",
        badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30"
      };
    } else if (eta > 1) {
      return {
        title: "Approaching Hotspot (Tandoor Fire Triggered!)",
        sub: `You are ${eta} mins away. The Ustad just dropped your galouti kebabs & tikkas on the burning coals.`,
        kitchenAction: "🔥 TANDOOR & GRILL ACTIVE: Starters dropped on coals. Fresh plating in 3 mins.",
        badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30 animate-pulse"
      };
    } else {
      return {
        title: "Arrived & Seated at Royal Table",
        sub: `Welcome to Table #${activeOrder.tableNumber}! Your sizzling kebabs and cool lassi are landing at your table right now.`,
        kitchenAction: "✅ Plating complete. Fresh & piping-hot feast served to Table.",
        badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      };
    }
  };

  const stageInfo = getStageDescription();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Simulation Banner Notice */}
      <div className="bg-amber-500/15 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500 text-amber-950 font-bold shrink-0">
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide">
              Live Arrival & Tandoor Fire Simulator
            </h4>
            <p className="text-xs text-[#D8CCC4] mt-0.5">
              Simulate city traffic delays, arrival milestones, and in-dining course progression below.
            </p>
          </div>
        </div>
        <button
          onClick={onViewKitchen}
          className="px-3 py-1.5 rounded-lg bg-[#1A1412] border border-[#3E2E26] hover:border-amber-500 text-xs font-bold text-[#FDFBF7] flex items-center gap-1.5 transition-colors shrink-0"
        >
          <ChefHat className="w-4 h-4 text-amber-400" />
          <span>View Kitchen KDS</span>
        </button>
      </div>

      {/* Main Status Card */}
      <div className="bg-[#231B17] border border-[#3E2E26] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#362721] pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${stageInfo.badgeColor}`}>
                {stageInfo.title}
              </span>
              <span className="text-xs text-[#A8988D]">Order #{activeOrder.orderId}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#FDFBF7] mt-2">
              {activeOrder.restaurantName}
            </h2>
            <div className="flex items-center gap-3 text-xs text-[#A8988D] mt-1">
              <span className="flex items-center gap-1 text-[#D8CCC4]">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                Table #{activeOrder.tableNumber} ({activeOrder.tableName || 'Royal Reserved'})
              </span>
              <span>•</span>
              <span>Party of {activeOrder.partySize}</span>
              <span>•</span>
              <span className="text-amber-400 font-semibold">{activeOrder.timeSlot}</span>
            </div>
          </div>

          {/* Big ETA Display */}
          <div className="bg-[#1A1412] border border-[#362721] px-5 py-3 rounded-2xl text-center shrink-0">
            <div className="text-xs text-[#A8988D] uppercase font-semibold">Live Guest ETA</div>
            <div className={`text-3xl font-black mt-0.5 ${trafficDelayed ? 'text-rose-400' : 'text-amber-400'}`}>
              {eta === 0 ? 'SEATED' : `${eta} MINS`}
            </div>
            <div className="text-[10px] text-emerald-400 font-medium">
              {trafficDelayed ? 'Delay Guard Engaged' : 'Synced with Tandoor'}
            </div>
          </div>
        </div>

        {/* Live Synchronized Kitchen Action Box */}
        <div className="mt-5 p-4 rounded-xl bg-[#1A1412] border border-[#3E2E26] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              trafficDelayed 
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
            }`}>
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span>Kitchen & Tandoor Bhatti Status</span>
                {eta <= 5 && !trafficDelayed && <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>}
              </div>
              <p className="text-xs text-amber-300 mt-0.5 font-medium">
                {stageInfo.kitchenAction}
              </p>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-[10px] text-[#8E7E73] uppercase font-bold">Food Freshness Guard</span>
            <div className="text-xs font-semibold text-emerald-400">100% Hot & Crisp Naans</div>
          </div>
        </div>

        {/* Real-World Traffic Delay Controls */}
        <div className="mt-5 pt-4 border-t border-[#362721]">
          <div className="text-xs font-bold text-[#D8CCC4] mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Car className="w-4 h-4 text-amber-400" />
              Indian City Traffic & Arrival Simulation:
            </span>
            <span className="text-[11px] text-[#A8988D]">Test real-world delay handling</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => handleSetDistance(15, false)}
              className={`py-2 px-2.5 rounded-lg text-xs font-semibold border transition-all ${
                eta > 8 && !trafficDelayed
                  ? 'bg-amber-500 text-amber-950 font-bold border-amber-500'
                  : 'bg-[#1A1412] border-[#362721] text-[#A8988D] hover:text-white'
              }`}
            >
              1. En Route (15m)
            </button>

            <button
              onClick={() => handleSetDistance(eta + 10, true)}
              className={`py-2 px-2.5 rounded-lg text-xs font-semibold border transition-all ${
                trafficDelayed
                  ? 'bg-rose-600 text-white font-bold border-rose-500 shadow-md shadow-rose-600/20'
                  : 'bg-[#1A1412] border-[#362721] text-rose-400 hover:bg-[#251D19]'
              }`}
            >
              ⚠️ Traffic Delay (+10m)
            </button>

            <button
              onClick={() => handleSetDistance(4, false)}
              className={`py-2 px-2.5 rounded-lg text-xs font-semibold border transition-all ${
                eta <= 5 && eta > 0 && !trafficDelayed
                  ? 'bg-amber-500 text-amber-950 font-bold border-amber-500'
                  : 'bg-[#1A1412] border-[#362721] text-[#A8988D] hover:text-white'
              }`}
            >
              2. 4m (Drop in Tandoor)
            </button>

            <button
              onClick={() => handleSetDistance(0, false)}
              className={`py-2 px-2.5 rounded-lg text-xs font-semibold border transition-all ${
                eta === 0
                  ? 'bg-emerald-500 text-emerald-950 font-bold border-emerald-500'
                  : 'bg-[#1A1412] border-[#362721] text-[#A8988D] hover:text-white'
              }`}
            >
              3. Seated at Baithak
            </button>
          </div>
        </div>
      </div>

      {/* In-Dining Table Assistant (Activated when Seated) */}
      {eta === 0 && (
        <div className="bg-[#231B17] border border-amber-500/50 rounded-2xl p-6 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#362721] pb-3.5">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-[#FDFBF7] uppercase tracking-wider">
                  In-Dining Table Assistant (Table #{activeOrder.tableNumber})
                </h3>
              </div>
              <p className="text-xs text-[#A8988D] mt-0.5">
                Pace your courses and request Indian hospitality service with 1 tap.
              </p>
            </div>

            {/* Service Alert Toast */}
            {staffServiceAlert && (
              <div className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold animate-pulse">
                ✓ Server alerted: {staffServiceAlert}
              </div>
            )}
          </div>

          {/* Course Progression Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Starters Card */}
            <div className="p-3.5 rounded-xl bg-[#1A1412] border border-emerald-500/30">
              <div className="text-[10px] text-emerald-400 font-bold uppercase">Course 1: Kebabs & Starters</div>
              <div className="text-xs font-bold text-white mt-1">Served & Enjoying</div>
              <p className="text-[11px] text-[#A8988D] mt-0.5">Served within 2 mins of sitting down.</p>
            </div>

            {/* Mains Card */}
            <div className="p-3.5 rounded-xl bg-[#1A1412] border border-amber-500/30 flex flex-col justify-between">
              <div>
                <div className="text-[10px] text-amber-400 font-bold uppercase">Course 2: Handi Biryani & Naans</div>
                <div className="text-xs font-bold text-white mt-1">
                  {activeCourseStage === 'mains_cooking' ? '🔥 Tandoor Baking Naans' : 'Ready to Fire'}
                </div>
              </div>
              {activeCourseStage !== 'mains_cooking' && (
                <button
                  type="button"
                  onClick={handleFireMains}
                  className="mt-3 py-1.5 px-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Fire Biryani & Naans Now</span>
                </button>
              )}
            </div>

            {/* Table Calls Remote */}
            <div className="p-3.5 rounded-xl bg-[#1A1412] border border-[#3E2E26] flex flex-col justify-between">
              <div>
                <div className="text-[10px] text-[#8E7E73] font-bold uppercase">Table Calls</div>
                <div className="text-xs font-bold text-white mt-1">Instant Server Pings</div>
              </div>
              <div className="flex gap-1.5 mt-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => handleRequestService('Hot Butter Naan Basket')}
                  className="flex-1 py-1.5 px-2 bg-[#2D221D] hover:bg-[#3D2E26] text-[#FDFBF7] rounded-lg text-[11px] font-semibold border border-[#443329]"
                >
                  Hot Naans
                </button>
                <button
                  type="button"
                  onClick={() => handleRequestService('Extra Sirka Pyaaz & Green Chutney')}
                  className="flex-1 py-1.5 px-2 bg-[#2D221D] hover:bg-[#3D2E26] text-[#FDFBF7] rounded-lg text-[11px] font-semibold border border-[#443329]"
                >
                  Sirka Pyaaz
                </button>
                <button
                  type="button"
                  onClick={() => handleRequestService('Chilled Masala Chaas / Water')}
                  className="flex-1 py-1.5 px-2 bg-[#2D221D] hover:bg-[#3D2E26] text-[#FDFBF7] rounded-lg text-[11px] font-semibold border border-[#443329]"
                >
                  Chaas
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pre-Ordered Menu Live Status Ticket */}
      <div className="bg-[#231B17] border border-[#3E2E26] rounded-2xl p-6">
        <h3 className="text-sm font-bold text-[#FDFBF7] flex items-center justify-between mb-4">
          <span className="flex items-center gap-2">
            <Utensils className="w-4 h-4 text-amber-400" />
            Live Kitchen Course Status for Your Table
          </span>
          <span className="text-xs text-emerald-400 font-semibold">
            ₹{activeOrder.bookingDeposit} Deposit Pre-Credited to Bill
          </span>
        </h3>

        <div className="space-y-3">
          {activeOrder.items.map((item) => {
            let statusBadge = {
              text: 'Prep Queued',
              color: 'bg-[#2B211C] text-[#8E7E73] border-[#3E2E26]'
            };

            if (trafficDelayed) {
              statusBadge = { text: '⏸️ Bhatti Coals Throttled', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
            } else if (eta <= 5 && item.course === 'Starters') {
              statusBadge = { text: '🔥 Sizzling on Bhatti', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse' };
            } else if (activeCourseStage === 'mains_cooking' && item.course === 'Mains') {
              statusBadge = { text: '🔥 Dum Cooking in Kitchen', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse' };
            } else if (eta === 0 && item.course === 'Starters') {
              statusBadge = { text: '✅ Plated & Served', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
            }

            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#1A1412] border border-[#362721] text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-[#251D19] flex items-center justify-center font-bold text-amber-400">
                    {item.quantity}x
                  </span>
                  <div>
                    <div className="font-bold text-[#FDFBF7] flex items-center gap-2">
                      <span>{item.name}</span>
                      {item.orderedBy && (
                        <span className="text-[10px] text-[#A8988D] font-normal">
                          ({item.orderedBy})
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-[#8E7E73]">{item.course} • Est. Fire: {item.prepMinutes || 8}m</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${statusBadge.color}`}>
                    {statusBadge.text}
                  </span>
                  <span className="font-bold text-[#FDFBF7]">₹{item.price * item.quantity}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bill Settlement & Fast Turnover Simulation */}
      {eta === 0 && (
        <div className="bg-gradient-to-br from-[#2D1F17] to-[#1A1412] border border-amber-500/30 rounded-2xl p-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                <Receipt className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#FDFBF7]">Experience Fast-Track Royal Dining</h4>
                <p className="text-xs text-[#D8CCC4]">
                  Total time from arrival to dessert: <strong className="text-emerald-400 font-bold">~38 minutes</strong> (Zero wait lines, zero waiting for bill calculation).
                </p>
              </div>
            </div>
            <button
              onClick={onCompleteDining}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all shrink-0"
            >
              <span>1-Tap Checkout & Release Table</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
