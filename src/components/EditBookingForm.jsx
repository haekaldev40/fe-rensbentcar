import React, { useState, useEffect } from "react";

export function EditBookingForm({ booking, onSave, onClose }) {
  const [returnDate, setReturnDate] = useState("");
  const [charge, setCharge] = useState(0);

  useEffect(() => {
    if (returnDate && new Date(returnDate) > new Date(booking.end_date)) {
      const extraDays = (new Date(returnDate) - new Date(booking.end_date)) / (1000 * 3600 * 24);
      const chargeAmount = (booking.total_price * 0.2) * extraDays;
      setCharge(chargeAmount);
    } else {
      setCharge(0);
    }
  }, [returnDate, booking.end_date, booking.total_price]);

  const handleSave = () => {
    onSave({
      ...booking,
      return_date: returnDate,
      charge: charge,
    });
  };

  const formatRupiah = (number) => {
    if (number == null) return "Rp 0";
    return number.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-xs">

        <div className="mb-2">
          <label className="block text-gray-700 text-xs font-bold mb-1">Customer:</label>
          <input 
            type="text" 
            value={booking.user.name} 
            disabled 
            className="w-full p-1 border rounded bg-gray-100 text-xs"
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-700 text-xs font-bold mb-1">Mobil:</label>
          <input 
            type="text" 
            value={booking.car.title} 
            disabled 
            className="w-full p-1 border rounded bg-gray-100 text-xs"
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-700 text-xs font-bold mb-1">Tanggal Mulai:</label>
          <input 
            type="text" 
            value={new Date(booking.start_date).toLocaleDateString()} 
            disabled 
            className="w-full p-1 border rounded bg-gray-100 text-xs"
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-700 text-xs font-bold mb-1">Tanggal Akhir:</label>
          <input 
            type="text" 
            value={new Date(booking.end_date).toLocaleDateString()} 
            disabled 
            className="w-full p-1 border rounded bg-gray-100 text-xs"
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-700 text-xs font-bold mb-1">Tanggal Pengembalian:</label>
          <input 
            type="date" 
            value={returnDate} 
            onChange={(e) => setReturnDate(e.target.value)} 
            className="w-full p-1 border rounded text-xs"
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-700 text-xs font-bold mb-1">Biaya Charge:</label>
          <input 
            type="text" 
            value={charge ? formatRupiah(charge) : "-"} 
            disabled 
            className="w-full p-1 border rounded bg-gray-100 text-xs"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button 
            onClick={onClose} 
            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded-lg text-xs"
          >
            Close
          </button>
          <button 
            onClick={handleSave} 
            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
