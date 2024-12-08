import React, { useState } from "react";
import { EditBookingForm } from "../components/EditBookingForm"; // Import the new form component
import { useAuthContext } from "../hooks/useAuthContext";
import { useHistoryBookings } from "../hooks/useBooking";
import { CiEdit } from "react-icons/ci";
import toast from "react-hot-toast";

export function DataPengembalian() {
  const { user } = useAuthContext();
  const { data: bookingHistory, isLoading, error, refetch } = useHistoryBookings(user);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleEditClick = (booking) => {
    // Jika booking yang sama diklik, toggle (tutup jika sudah terbuka)
    if (selectedBooking && selectedBooking.booking_id === booking.booking_id) {
      setSelectedBooking(null);
    } else {
      setSelectedBooking(booking);
    }
  };
  const handleCloseForm = () => {
    setSelectedBooking(null);
  };

  const handleSaveForm = async (updatedBooking) => {
    console.log("Updating booking:", updatedBooking);
    

    try {
      // Assuming you have an API endpoint to update the booking
      const response = await fetch(`https://restapi-bensrentcar.vercel.app/bookingsv2/${updatedBooking.booking_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBooking),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update booking');
      }
  
      const result = await response.json();
      console.log('Booking updated successfully:', result);

      toast.success("Data Berhasil Diubah!")
      refetch();
      // Refresh booking history or update the state with the updated booking
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  
    handleCloseForm();
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 border-b">
            <tr className="font-mono">
              <th className="p-4 text-sm font-semibold text-left">Mobil</th>
              <th className="p-4 text-sm font-semibold text-left">Peminjaman</th>
              <th className="p-4 text-sm font-semibold text-left">Pengembalian</th>
              <th className="p-4 text-sm font-semibold text-left">
                Biaya Charge
              </th>
              <th className="p-4 text-sm font-semibold text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookingHistory.map((booking, index) => (
              <tr
                className="font-mono border-b text-xs hover:bg-gray-50"
                key={index}
              >
                <td className="p-4">{booking.car.title}</td>
                <td className="p-4">
                  {new Date(booking.start_date).toLocaleDateString()} -{" "}
                  {new Date(booking.end_date).toLocaleDateString()}
                </td>
                <td className="p-4">  {booking.return_date ? new Date(booking.return_date).toLocaleDateString() : "-"}</td>
                <td className="p-4">{formatRupiah(booking.charge)}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      className="p-2 bg-blue-500 hover:bg-blue-700 text-white rounded"
                      onClick={() => handleEditClick(booking)}
                    >
                      <CiEdit />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedBooking && (
        <EditBookingForm
          booking={selectedBooking}
          onSave={handleSaveForm}
          onClose={handleCloseForm}
        />
      )}
    </>
  );
}

export default DataPengembalian;