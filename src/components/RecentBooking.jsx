import { useEffect, useState } from "react";
import { getRecentBookings } from "../utils/apiGetTotalAll";

export function RecentBooking() {
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentBookings = async () => {
      try {
        const recent = await getRecentBookings();
        setRecentBookings(recent);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRecentBookings();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <>
      <div className="grid grid-cols-1 gap-4 border border-gray-200 mt-10 rounded-lg shadow-lg">
        <table className="">
          <thead className="text-left p-2">
            <tr className="font-mono">
              <th className="p-5 text-sm font-semibold">Customer</th>
              <th className=" p-5 text-sm font-semibold">Mobil</th>
              <th className="p-5 text-sm font-semibold">Date</th>
              <th className="p-3 text-sm font-semibold">Status Pembayaran</th>
            </tr>
          </thead>
          <tbody className="">
            {recentBookings.map((booking) => (
              <tr key={booking.booking_id} className="font-mono border-b">
                <td className="p-5">{booking.user.name}</td>
                <td className="p-5">{booking.car.title}</td>
                <td className="p-5">
                  {new Date(booking.start_date).toLocaleDateString()} -{" "}
                  {new Date(booking.end_date).toLocaleDateString()}
                </td>
                <td className="p-2">
                  <span
                    className={` text-white font-normal items-center text-xs rounded-md p-2 ${
                      booking.status_pelunasan === "Completed"
                        ? "bg-green-500" : booking.status_pelunasan === "Cancel" ? "bg-red-500" 
                        : "bg-red-500"
                    }`}
                  >
                    {booking.status_pelunasan}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
