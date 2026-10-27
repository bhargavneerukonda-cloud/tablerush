import React, { useState } from 'react';
import { RESTAURANTS, INITIAL_ORDERS } from './data/mockRestaurants';
import Navbar from './components/Navbar';
import StatsBanner from './components/StatsBanner';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import BookingModal from './components/BookingModal';
import ArrivalTracker from './components/ArrivalTracker';
import KitchenDashboard from './components/KitchenDashboard';
import EfficiencyModal from './components/EfficiencyModal';

export default function App() {
  const [restaurants, setRestaurants] = useState(RESTAURANTS);
  const [activeOrders, setActiveOrders] = useState(INITIAL_ORDERS);
  const [currentView, setCurrentView] = useState('browse'); // 'browse', 'restaurant', 'tracker', 'kitchen'
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  // Efficiency/Model Info Modal State
  const [isEfficiencyModalOpen, setIsEfficiencyModalOpen] = useState(false);

  // The primary active order for diner simulation
  const primaryActiveOrder = activeOrders[activeOrders.length - 1] || null;

  // Handle selecting a restaurant from the list
  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentView('restaurant');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle opening the booking checkout modal
  const handleProceedToBooking = (details) => {
    setBookingDetails(details);
    setIsBookingModalOpen(true);
  };

  // Handle confirming a reservation
  const handleConfirmBooking = (newOrder) => {
    // 1. Mark the selected table as reserved in restaurant state
    setRestaurants(prev => prev.map(rest => {
      if (rest.id === newOrder.restaurantId) {
        return {
          ...rest,
          tables: rest.tables.map(t => 
            t.id === newOrder.tableId ? { ...t, available: false } : t
          )
        };
      }
      return rest;
    }));

    // 2. Add to active orders
    setActiveOrders(prev => [...prev, newOrder]);

    // 3. Close modal & switch directly to live arrival tracker
    setIsBookingModalOpen(false);
    setCurrentView('tracker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update order status (from arrival slider or kitchen actions)
  const handleUpdateOrder = (updatedOrder) => {
    setActiveOrders(prev => prev.map(o => o.orderId === updatedOrder.orderId ? updatedOrder : o));
  };

  // Settle bill and release table
  const handleCompleteDining = () => {
    if (!primaryActiveOrder) return;

    // Release table back to available
    setRestaurants(prev => prev.map(rest => {
      if (rest.id === primaryActiveOrder.restaurantId) {
        return {
          ...rest,
          tables: rest.tables.map(t => 
            t.id === primaryActiveOrder.tableId ? { ...t, available: true } : t
          )
        };
      }
      return rest;
    }));

    // Remove or archive active order
    setActiveOrders(prev => prev.filter(o => o.orderId !== primaryActiveOrder.orderId));
    alert('Thank you! Your table deposit was credited to your bill and your dining session is complete. The table is now freed up for the next party!');
    setCurrentView('browse');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#191412] text-[#FDFBF7] flex flex-col selection:bg-amber-500 selection:text-amber-950">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        activeOrder={primaryActiveOrder}
        onOpenInfoModal={() => setIsEfficiencyModalOpen(true)}
        onOpenActiveTracker={() => setCurrentView('tracker')}
      />

      {/* Stats and Value Proposition Banner */}
      {currentView === 'browse' && (
        <StatsBanner onOpenInfoModal={() => setIsEfficiencyModalOpen(true)} />
      )}

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'browse' && (
          <RestaurantList
            restaurants={restaurants}
            onSelectRestaurant={handleSelectRestaurant}
          />
        )}

        {currentView === 'restaurant' && selectedRestaurant && (
          <RestaurantDetail
            restaurant={selectedRestaurant}
            onBack={() => setCurrentView('browse')}
            onProceedToBooking={handleProceedToBooking}
          />
        )}

        {currentView === 'tracker' && (
          <div className="py-6">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-4 flex items-center justify-between">
              <button
                onClick={() => setCurrentView('browse')}
                className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                &larr; Back to Dining Venues
              </button>
              <button
                onClick={() => setCurrentView('kitchen')}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
              >
                <span>Switch to Kitchen Partner View &rarr;</span>
              </button>
            </div>

            {primaryActiveOrder ? (
              <ArrivalTracker
                activeOrder={primaryActiveOrder}
                onUpdateOrder={handleUpdateOrder}
                onViewKitchen={() => setCurrentView('kitchen')}
                onCompleteDining={handleCompleteDining}
              />
            ) : (
              <div className="max-w-md mx-auto text-center py-16 bg-slate-900 rounded-2xl border border-slate-800 p-6">
                <h3 className="font-bold text-white text-base">No Active Reservation</h3>
                <p className="text-xs text-slate-400 mt-2">
                  Select a restaurant and reserve one of the 5 dedicated tables to launch the live arrival synchronizer.
                </p>
                <button
                  onClick={() => setCurrentView('browse')}
                  className="mt-4 px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
                >
                  Browse Restaurants
                </button>
              </div>
            )}
          </div>
        )}

        {currentView === 'kitchen' && (
          <KitchenDashboard
            restaurants={restaurants}
            activeOrders={activeOrders}
            onUpdateOrderStatus={handleUpdateOrder}
            onSwitchToDinerView={() => setCurrentView('browse')}
          />
        )}
      </main>

      {/* Booking Checkout Modal */}
      {isBookingModalOpen && bookingDetails && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          restaurant={bookingDetails.restaurant}
          table={bookingDetails.table}
          partySize={bookingDetails.partySize}
          timeSlot={bookingDetails.timeSlot}
          cart={bookingDetails.cart}
          partyMembers={bookingDetails.partyMembers}
          servingPreference={bookingDetails.servingPreference}
          orderNotes={bookingDetails.orderNotes}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {/* Model & Efficiency Explanation Modal */}
      <EfficiencyModal
        isOpen={isEfficiencyModalOpen}
        onClose={() => setIsEfficiencyModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-[#362721] bg-[#1A1412] py-6 text-center text-xs text-[#8E7E73]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#D8CCC4]">DineAhead</span>
            <span>—</span>
            <span>Iconic Indian Restaurants • Pre-Book & Tandoor Arrival Sync</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-amber-400 font-medium">4–5 Tables Held per Venue</span>
            <span className="text-[#4E392F]">•</span>
            <span className="text-[#A8988D]">Bypass 80m Biryani Queue</span>
            <span className="text-[#4E392F]">•</span>
            <span className="text-emerald-400 font-medium">Piping Hot Naan & Handi Sync</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
