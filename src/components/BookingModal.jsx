import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Clock, MapPin, Users, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookingModal({
  isOpen,
  onClose,
  restaurant,
  table,
  partySize,
  timeSlot,
  cart,
  partyMembers,
  servingPreference,
  orderNotes,
  onConfirmBooking
}) {
  const [dinerName, setDinerName] = useState('Rahul Sharma');
  const [dinerPhone, setDinerPhone] = useState('+91 98765 43210');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !restaurant || !table) return null;

  const foodSubtotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const estimatedGst = Math.round(foodSubtotal * 0.05); // 5% GST for restaurants
  const reservationDeposit = 500; // ₹500 Credited 100% to bill

  const handleConfirm = () => {
    setIsSubmitting(true);
    
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }

    setTimeout(() => {
      const newOrder = {
        orderId: `TR-IND-${Math.floor(1000 + Math.random() * 9000)}`,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        restaurantAddress: restaurant.address,
        tableId: table.id,
        tableNumber: table.number,
        tableName: table.name,
        guestName: dinerName,
        guestPhone: dinerPhone,
        partySize,
        timeSlot,
        bookingDeposit: reservationDeposit,
        status: 'in_transit',
        etaMinutes: 12,
        trafficDelayed: false,
        delayMinutes: 0,
        courseStage: 'starters_cooking',
        servingPreference,
        items: cart.map(item => ({
          ...item,
          status: 'prep_queued'
        })),
        members: partyMembers || [{ id: 'm1', name: dinerName, share: foodSubtotal }],
        notes: orderNotes || 'None',
        createdAt: new Date().toISOString()
      };

      setIsSubmitting(false);
      onConfirmBooking(newOrder);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#231B17] border border-[#3E2E26] rounded-2xl shadow-2xl p-6 text-[#FDFBF7] my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#A8988D] hover:text-white hover:bg-[#2D221D] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Final Step: Confirm Royal VIP Booking</span>
        </div>
        <h2 className="text-xl font-bold text-[#FDFBF7]">
          Reserve Table #{table.number} at {restaurant.name}
        </h2>
        <p className="text-xs text-[#A8988D] mt-1">
          {table.name} ({table.zone || 'Royal Zone'}) • {partySize} Guests • {timeSlot}
        </p>

        {/* Table & Seating Summary Banner */}
        <div className="mt-4 p-3.5 bg-[#1A1412] rounded-xl border border-[#362721] flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
              T{table.number}
            </div>
            <div>
              <div className="font-bold text-white">{table.name}</div>
              <div className="text-[11px] text-[#A8988D]">{table.vibe}</div>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 text-[11px] font-bold">
            Guaranteed Hold
          </span>
        </div>

        {/* Party Members Badge */}
        {partyMembers && partyMembers.length > 1 && (
          <div className="mt-3 p-2.5 bg-[#1A1412] rounded-lg border border-[#362721] flex items-center justify-between text-xs text-[#D8CCC4]">
            <span className="flex items-center gap-1.5 font-medium">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              Family / Group Order ({partyMembers.length} Guests):
            </span>
            <span className="text-[11px] text-amber-300">
              {partyMembers.map(m => m.name).join(', ')}
            </span>
          </div>
        )}

        {/* Pre-Ordered Food Summary */}
        <div className="mt-4 border-t border-[#362721] pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#D8CCC4]">Pre-Ordered Indian Feast ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
            <span className="text-[11px] text-amber-400 capitalize">
              Pacing: {servingPreference.replace(/_/g, ' ')}
            </span>
          </div>

          <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
            {cart.map(item => (
              <div key={item.id} className="flex items-center justify-between text-xs py-1 px-2 rounded bg-[#1A1412] border border-[#362721]">
                <span className="text-[#D8CCC4] flex items-center gap-1">
                  <strong className="text-amber-400 font-bold">{item.quantity}x</strong> {item.name}
                  {item.orderedBy && <span className="text-[10px] text-[#8E7E73]">({item.orderedBy})</span>}
                </span>
                <span className="font-medium text-[#FDFBF7]">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Guest Information */}
        <div className="mt-4 border-t border-[#362721] pt-4 grid grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-semibold text-[#A8988D] block mb-1">Reservation Name</label>
            <input
              type="text"
              value={dinerName}
              onChange={(e) => setDinerName(e.target.value)}
              className="w-full px-3 py-1.5 bg-[#1A1412] border border-[#362721] rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-[#A8988D] block mb-1">Mobile (for WhatsApp/SMS Sync)</label>
            <input
              type="text"
              value={dinerPhone}
              onChange={(e) => setDinerPhone(e.target.value)}
              className="w-full px-3 py-1.5 bg-[#1A1412] border border-[#362721] rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Pricing & Deposit Guarantee in ₹ */}
        <div className="mt-4 p-3 bg-amber-500/15 border border-amber-500/30 rounded-xl space-y-1.5 text-xs">
          <div className="flex justify-between text-[#D8CCC4]">
            <span>Pre-ordered Feast Subtotal:</span>
            <span className="font-medium">₹{foodSubtotal}</span>
          </div>
          <div className="flex justify-between text-[#D8CCC4]">
            <span>Est. Restaurant GST (5%):</span>
            <span>₹{estimatedGst}</span>
          </div>
          <div className="flex justify-between text-amber-300 font-bold border-t border-amber-500/25 pt-1.5">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Table Hold Deposit (100% Credited to Bill):
            </span>
            <span>₹{reservationDeposit}</span>
          </div>
          <p className="text-[10px] text-amber-200/90 leading-tight">
            * You pay only the ₹500 table credit now. It is automatically deducted from your dining check when you arrive at the restaurant.
          </p>
        </div>

        {/* Submit Button */}
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-[#362721] text-xs font-semibold text-[#D8CCC4] hover:bg-[#2D221D] transition-colors"
          >
            Go Back
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="flex-[2] py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Confirming Booking...</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm Royal Table & Activate ETA Sync</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
