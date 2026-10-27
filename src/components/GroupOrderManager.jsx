import React, { useState } from 'react';
import { Users, UserPlus, Link2, Check, Split } from 'lucide-react';

export default function GroupOrderManager({
  partyMembers,
  setPartyMembers,
  activeGuestId,
  setActiveGuestId,
  cart,
  bookingDeposit = 500 // ₹500
}) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [splitMode, setSplitMode] = useState('itemized'); // 'itemized' or 'even'
  const [newGuestName, setNewGuestName] = useState('');
  const [showAddGuest, setShowAddGuest] = useState(false);

  const handleCopyLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddGuest = (e) => {
    e.preventDefault();
    if (!newGuestName.trim()) return;
    const newGuest = {
      id: `guest-${Date.now()}`,
      name: newGuestName.trim(),
      isHost: false
    };
    setPartyMembers([...partyMembers, newGuest]);
    setActiveGuestId(newGuest.id);
    setNewGuestName('');
    setShowAddGuest(false);
  };

  const totalFoodCost = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const evenSplitPerPerson = partyMembers.length > 0 ? (totalFoodCost / partyMembers.length) : totalFoodCost;

  const getGuestSubtotal = (guestId) => {
    return cart
      .filter(item => item.guestId === guestId)
      .reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <div className="bg-[#231B17] border border-[#3E2E26] rounded-2xl p-4 sm:p-5 space-y-4 shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#362721] pb-3.5">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-bold text-[#FDFBF7] uppercase tracking-wider">
              Family & Friends Group Pre-Order (Split Bill)
            </h4>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
              Party of {partyMembers.length}
            </span>
          </div>
          <p className="text-[11px] text-[#A8988D] mt-0.5">
            Friends add their favorite biryanis, kebabs & naans. Table deposit and bills are split automatically.
          </p>
        </div>

        {/* Copy Invite Link */}
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A1412] border border-[#3E2E26] hover:border-amber-500/60 text-xs font-semibold text-[#D8CCC4] hover:text-white transition-colors self-start sm:self-auto"
        >
          {copiedLink ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">WhatsApp / Party Link Copied!</span>
            </>
          ) : (
            <>
              <Link2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Copy Party Link</span>
            </>
          )}
        </button>
      </div>

      {/* Party Members Tabs */}
      <div>
        <div className="text-[11px] font-semibold text-[#A8988D] mb-2 flex items-center justify-between">
          <span>Adding dishes for:</span>
          <span className="text-amber-400 text-[10px]">Tap a member to switch ordering</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {partyMembers.map((member) => {
            const isCurrent = activeGuestId === member.id;
            const guestItemCount = cart.filter(i => i.guestId === member.id).reduce((s, i) => s + i.quantity, 0);

            return (
              <button
                key={member.id}
                type="button"
                onClick={() => setActiveGuestId(member.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  isCurrent
                    ? 'bg-amber-500 text-amber-950 shadow-md shadow-amber-500/20 ring-2 ring-amber-400/50'
                    : 'bg-[#1A1412] border border-[#3E2E26] text-[#D8CCC4] hover:border-[#4E392F]'
                }`}
              >
                <span>{member.name} {member.isHost ? '(Host)' : ''}</span>
                {guestItemCount > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isCurrent ? 'bg-amber-950 text-amber-300' : 'bg-[#2E221D] text-[#D8CCC4]'
                  }`}>
                    {guestItemCount}
                  </span>
                )}
              </button>
            );
          })}

          {/* Add Guest Button */}
          {showAddGuest ? (
            <form onSubmit={handleAddGuest} className="flex items-center gap-1.5">
              <input
                type="text"
                value={newGuestName}
                onChange={(e) => setNewGuestName(e.target.value)}
                placeholder="Member's Name"
                autoFocus
                className="px-2.5 py-1 bg-[#1A1412] border border-amber-500 rounded-lg text-xs text-white placeholder-[#7E6E64] focus:outline-none w-28"
              />
              <button
                type="submit"
                className="px-2 py-1 bg-amber-500 text-amber-950 rounded-lg text-xs font-bold"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowAddGuest(false)}
                className="px-1.5 text-xs text-[#7E6E64] hover:text-white"
              >
                ✕
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setShowAddGuest(true)}
              className="px-2.5 py-1.5 rounded-xl border border-dashed border-[#443329] text-[#A8988D] hover:text-white hover:border-amber-500/50 text-xs font-medium flex items-center gap-1 transition-colors"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Add Person</span>
            </button>
          )}
        </div>
      </div>

      {/* Split Calculation Widget */}
      {cart.length > 0 && (
        <div className="mt-3 p-3 bg-[#1A1412] rounded-xl border border-[#3E2E26] text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#D8CCC4] flex items-center gap-1.5">
              <Split className="w-3.5 h-3.5 text-amber-400" />
              Itemized Indian Feast Split
            </span>
            <div className="flex bg-[#251D19] p-0.5 rounded-lg border border-[#3D2E26]">
              <button
                type="button"
                onClick={() => setSplitMode('itemized')}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                  splitMode === 'itemized' ? 'bg-amber-500 text-amber-950' : 'text-[#A8988D]'
                }`}
              >
                Per-Dish
              </button>
              <button
                type="button"
                onClick={() => setSplitMode('even')}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                  splitMode === 'even' ? 'bg-amber-500 text-amber-950' : 'text-[#A8988D]'
                }`}
              >
                Equal Split
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {partyMembers.map(member => {
              const amount = splitMode === 'even'
                ? evenSplitPerPerson
                : getGuestSubtotal(member.id);

              return (
                <div key={member.id} className="bg-[#241C18] border border-[#3E2E26] rounded-lg p-2">
                  <div className="text-[10px] text-[#A8988D] truncate">{member.name}</div>
                  <div className="text-xs font-bold text-white mt-0.5">₹{Math.round(amount)}</div>
                  <div className="text-[9px] text-emerald-400 mt-0.5">
                    Deposit credit: -₹{Math.round(bookingDeposit / partyMembers.length)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
