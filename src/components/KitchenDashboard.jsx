import React, { useState } from 'react';
import { 
  ChefHat, 
  Flame, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  Sparkles,
  BarChart3,
  Utensils,
  PauseCircle
} from 'lucide-react';

export default function KitchenDashboard({
  restaurants,
  activeOrders,
  onUpdateOrderStatus,
  onSwitchToDinerView
}) {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(restaurants[0]?.id || 'dawat-e-khaas');
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'analytics'

  const currentRestaurant = restaurants.find(r => r.id === selectedRestaurantId) || restaurants[0];
  const restaurantOrders = activeOrders.filter(o => o.restaurantId === currentRestaurant.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* KDS Header & Venue Switcher */}
      <div className="bg-[#231B17] border border-[#3E2E26] rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30">
                Kitchen Display System (KDS)
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs text-[#A8988D] font-medium">Bhatti & Handi Live Sync</span>
            </div>
            <h1 className="text-xl font-extrabold text-[#FDFBF7] mt-1">
              {currentRestaurant.name}
            </h1>
            <p className="text-xs text-[#A8988D]">
              Managing 5 Dedicated Royal VIP Tables • Peak Indian Dining Rush
            </p>
          </div>
        </div>

        {/* Navigation & Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end flex-wrap">
          {/* Tab Switcher: Orders vs Analytics */}
          <div className="flex bg-[#1A1412] p-1 rounded-xl border border-[#3E2E26]">
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'orders'
                  ? 'bg-amber-500 text-amber-950 shadow-sm'
                  : 'text-[#A8988D] hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Live Tickets ({restaurantOrders.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-amber-500 text-amber-950 shadow-sm'
                  : 'text-[#A8988D] hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Revenue & Turns (₹)</span>
            </button>
          </div>

          <select
            value={selectedRestaurantId}
            onChange={(e) => setSelectedRestaurantId(e.target.value)}
            className="px-3 py-2 bg-[#1A1412] border border-[#3E2E26] rounded-xl text-xs text-[#FDFBF7] focus:outline-none focus:border-amber-500"
          >
            {restaurants.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>

          <button
            onClick={onSwitchToDinerView}
            className="px-3.5 py-2 rounded-xl bg-[#2D221D] hover:bg-[#3D2E26] text-[#FDFBF7] text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 border border-[#443329]"
          >
            <Utensils className="w-3.5 h-3.5 text-amber-400" />
            <span>Diner Mode</span>
          </button>
        </div>
      </div>

      {activeTab === 'analytics' ? (
        /* Revenue & Table Velocity Analytics Dashboard in ₹ */
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#231B17] border border-[#3E2E26] rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#A8988D] font-medium uppercase">Table Turnover Speed</span>
                <span className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400"><TrendingUp className="w-4 h-4" /></span>
              </div>
              <div className="text-2xl font-black text-[#FDFBF7] mt-2">42 Mins</div>
              <div className="text-xs text-emerald-400 mt-1 font-semibold">vs 90m walk-in average (+114% speed)</div>
            </div>

            <div className="bg-[#231B17] border border-[#3E2E26] rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#A8988D] font-medium uppercase">Peak Turns Tonight</span>
                <span className="p-2 rounded-lg bg-amber-500/20 text-amber-400"><Users className="w-4 h-4" /></span>
              </div>
              <div className="text-2xl font-black text-[#FDFBF7] mt-2">15 Parties</div>
              <div className="text-xs text-amber-300 mt-1 font-semibold">Across the 5 dedicated VIP tables</div>
            </div>

            <div className="bg-[#231B17] border border-[#3E2E26] rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#A8988D] font-medium uppercase">Extra Revenue Lift</span>
                <span className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400"><TrendingUp className="w-4 h-4" /></span>
              </div>
              <div className="text-2xl font-black text-emerald-400 mt-2">+{currentRestaurant.revenueLiftTonight || '₹18,500'}</div>
              <div className="text-xs text-[#A8988D] mt-1">Incremental gross profit tonight</div>
            </div>

            <div className="bg-[#231B17] border border-[#3E2E26] rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#A8988D] font-medium uppercase">Freshness / Zero-Waste</span>
                <span className="p-2 rounded-lg bg-blue-500/20 text-blue-400"><Sparkles className="w-4 h-4" /></span>
              </div>
              <div className="text-2xl font-black text-[#FDFBF7] mt-2">99.8%</div>
              <div className="text-xs text-blue-300 mt-1 font-semibold">0 cold naan returns with ETA sync</div>
            </div>
          </div>

          {/* Deep Dive Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#231B17] border border-[#3E2E26] rounded-2xl p-6">
              <h3 className="text-sm font-bold text-[#FDFBF7] mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                Hourly Peak Capacity & Turnover Multiplier
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#D8CCC4] font-semibold">DineAhead Dedicated Tables (5 tables)</span>
                    <span className="text-emerald-400 font-bold">2.9 Turns / Table (7–11 PM Peak)</span>
                  </div>
                  <div className="w-full bg-[#1A1412] h-3 rounded-full overflow-hidden border border-[#362721]">
                    <div className="bg-emerald-500 h-full rounded-full w-[94%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#8E7E73]">Regular Walk-in Tables (Full floor)</span>
                    <span className="text-[#8E7E73] font-medium">1.2 Turns / Table (7–11 PM Peak)</span>
                  </div>
                  <div className="w-full bg-[#1A1412] h-3 rounded-full overflow-hidden border border-[#362721]">
                    <div className="bg-[#3D2E26] h-full rounded-full w-[42%]"></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-[#1A1412] border border-[#3E2E26] text-xs text-[#D8CCC4] space-y-2">
                <div className="font-bold text-amber-400">💡 Why the 5 Table Allocation is a Goldmine for Indian Restaurants:</div>
                <p className="text-[#A8988D] leading-relaxed">
                  Indian dining is traditionally slow (often 90–100 mins with menu browsing, slow-dum prep, and bill delays). By reserving 5 tables with arrival-synced pre-orders, families sit down, receive piping-hot tandoori kebabs in 3 minutes, and complete their dinner in 40 minutes. You seat almost 3 parties per table during the 8–11 PM rush!
                </p>
              </div>
            </div>

            <div className="bg-[#231B17] border border-[#3E2E26] rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#FDFBF7] mb-4 flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-amber-400" />
                  Clay Tandoor & Bhatti Load Balancing
                </h3>

                <div className="p-4 rounded-xl bg-[#1A1412] border border-[#3E2E26] text-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-[#362721] pb-2">
                    <span className="text-[#A8988D]">Advance Ticket Visibility:</span>
                    <span className="text-white font-bold">12–15 Minutes in Advance</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#362721] pb-2">
                    <span className="text-[#A8988D]">Order Ambiguity:</span>
                    <span className="text-emerald-400 font-bold">0% (All courses pre-specified)</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#362721] pb-2">
                    <span className="text-[#A8988D]">No-Show Commitment:</span>
                    <span className="text-amber-400 font-bold">₹500 Pre-Credited Deposit</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                <strong>Executive Chef Quote:</strong> "Our Ustads can maintain the charcoal bhatti at the exact right heat because we know exactly when the party is 4 minutes away."
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Live Kitchen Orders View */
        <div className="space-y-6">
          {/* 5 Dedicated VIP Tables Live Status */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-[#FDFBF7] flex items-center gap-2">
                <span>5 Dedicated Royal VIP Tables Live Grid</span>
                <span className="text-xs text-[#A8988D] font-normal">(Reserved exclusively for arrival-sync diners)</span>
              </h2>
              <span className="text-xs text-emerald-400 font-semibold">
                {5 - restaurantOrders.length} Available for Pre-Book
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {currentRestaurant.tables.map(table => {
                const tableOrder = restaurantOrders.find(o => o.tableId === table.id || o.tableNumber === table.number);

                let status = 'Vacant & Ready';
                let statusClass = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';

                if (tableOrder) {
                  if (tableOrder.trafficDelayed) {
                    status = '⚠️ Traffic Delayed (+10m)';
                    statusClass = 'text-amber-400 border-amber-500/40 bg-amber-500/15 animate-pulse';
                  } else if (tableOrder.etaMinutes > 6) {
                    status = `Guest ETA: ${tableOrder.etaMinutes}m`;
                    statusClass = 'text-blue-400 border-blue-500/30 bg-blue-500/10';
                  } else if (tableOrder.etaMinutes > 0) {
                    status = `🔥 BHATTI FIRING (ETA ${tableOrder.etaMinutes}m)`;
                    statusClass = 'text-rose-400 border-rose-500/40 bg-rose-500/15 animate-pulse';
                  } else {
                    status = '✅ Seated & Dining';
                    statusClass = 'text-purple-400 border-purple-500/30 bg-purple-500/10';
                  }
                }

                return (
                  <div
                    key={table.id}
                    className={`p-4 rounded-xl border bg-[#231B17] flex flex-col justify-between transition-all ${
                      tableOrder ? 'border-amber-500/40 shadow-md' : 'border-[#3E2E26]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-base text-white">Table #{table.number}</span>
                        <span className="text-[11px] text-[#A8988D] flex items-center gap-1">
                          <Users className="w-3 h-3" /> {table.seats}p
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-[#D8CCC4] mt-1">{table.name}</div>
                      <div className="text-[10px] text-[#8E7E73]">{table.zone}</div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#362721]">
                      <span className={`text-[11px] font-bold px-2 py-1 rounded border block text-center ${statusClass}`}>
                        {status}
                      </span>
                      {tableOrder && (
                        <div className="text-[10px] text-[#A8988D] text-center mt-1.5 font-medium">
                          {tableOrder.guestName} ({tableOrder.items.length} dishes)
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Kitchen Tickets Stream */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-[#FDFBF7] flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Active Incoming Tickets & Arrival Firing Pipeline</span>
              </h2>
              <span className="text-xs text-[#A8988D]">Auto-prioritized by guest arrival proximity</span>
            </div>

            {restaurantOrders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {restaurantOrders.map(order => (
                  <div
                    key={order.orderId}
                    className={`bg-[#231B17] border rounded-2xl p-5 shadow-xl relative flex flex-col justify-between ${
                      order.trafficDelayed ? 'border-amber-500 ring-2 ring-amber-500/30' : 'border-[#3E2E26]'
                    }`}
                  >
                    <div>
                      {/* Top Bar of Ticket */}
                      <div className="flex items-start justify-between border-b border-[#362721] pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-white">Table #{order.tableNumber}</span>
                            <span className="text-xs text-[#A8988D]">• {order.tableName}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              {order.orderId}
                            </span>
                          </div>
                          <div className="text-xs text-[#D8CCC4] mt-1 font-semibold">
                            Guest: {order.guestName} ({order.partySize} guests)
                          </div>
                        </div>

                        {/* ETA Countdown Badge */}
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-bold text-[#8E7E73] block">Arrival Stage</span>
                          {order.trafficDelayed ? (
                            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 inline-flex items-center gap-1 mt-0.5 animate-pulse">
                              Traffic Delay (+10m)
                            </span>
                          ) : (
                            <span className={`text-base font-black px-2.5 py-0.5 rounded-lg inline-block mt-0.5 ${
                              order.etaMinutes <= 5 
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse'
                                : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            }`}>
                              {order.etaMinutes === 0 ? 'SEATED NOW' : `${order.etaMinutes}m away`}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Traffic Delay Banner if active */}
                      {order.trafficDelayed && (
                        <div className="my-2.5 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <PauseCircle className="w-4 h-4 text-amber-400" />
                            <strong>Bhatti Coals Throttled:</strong> Holding food stage until diner reaches 4m.
                          </span>
                          <button
                            onClick={() => {
                              onUpdateOrderStatus({ ...order, trafficDelayed: false, etaMinutes: 4 });
                            }}
                            className="px-2 py-1 bg-amber-500 text-amber-950 font-bold rounded text-[10px]"
                          >
                            Resume Fire
                          </button>
                        </div>
                      )}

                      {/* Items list */}
                      <div className="space-y-2 mt-3">
                        {order.items.map(item => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between text-xs p-2 rounded bg-[#1A1412] border border-[#362721]"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded bg-[#251D19] font-bold text-amber-400 flex items-center justify-center text-[11px]">
                                {item.quantity}
                              </span>
                              <span className="text-white font-medium">{item.name}</span>
                              {item.orderedBy && (
                                <span className="text-[10px] text-[#A8988D] font-normal">
                                  ({item.orderedBy})
                                </span>
                              )}
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              item.status === 'firing'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse'
                                : item.status === 'served' || item.status === 'ready'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : item.status === 'hold_delayed'
                                ? 'bg-amber-500/20 text-amber-300'
                                : 'bg-[#2E221D] text-[#8E7E73]'
                            }`}>
                              {item.status.replace(/_/g, ' ')}
                            </span>
                          </div>
                        ))}
                      </div>

                      {order.notes && (
                        <div className="mt-3 text-[11px] text-amber-300/90 bg-amber-500/10 p-2 rounded border border-amber-500/20">
                          <strong>Chef Note:</strong> {order.notes}
                        </div>
                      )}
                    </div>

                    {/* Kitchen Action Buttons */}
                    <div className="mt-5 pt-3 border-t border-[#362721] flex gap-2">
                      <button
                        onClick={() => {
                          const updated = {
                            ...order,
                            items: order.items.map(i => ({ ...i, status: 'firing' }))
                          };
                          onUpdateOrderStatus(updated);
                        }}
                        className="flex-1 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-amber-950 font-bold text-xs border border-amber-500/40 transition-colors"
                      >
                        🔥 Fire Kebabs & Naans Now
                      </button>
                      <button
                        onClick={() => {
                          const updated = {
                            ...order,
                            etaMinutes: 0,
                            status: 'seated',
                            items: order.items.map(i => ({ ...i, status: 'served' }))
                          };
                          onUpdateOrderStatus(updated);
                        }}
                        className="flex-1 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-emerald-950 font-bold text-xs border border-emerald-500/40 transition-colors"
                      >
                        ✅ Mark Served to Table
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-[#231B17] border border-[#3E2E26] rounded-2xl">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-white">All 5 Royal Tables Ready</h4>
                <p className="text-xs text-[#A8988D] mt-1">
                  No active in-transit guests right now. Pre-order in Diner Mode to see tickets arrive here!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
