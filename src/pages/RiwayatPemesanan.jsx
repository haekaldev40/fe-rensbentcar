import { useState, useEffect } from "react";
import { getHistoryBookings } from "../utils/apiBooking";
import { useAuthContext } from "../hooks/useAuthContext";

const formatRupiah = (number) => {
  if (number == null) return "Rp 0";
  return number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};
export function RiwayatPemesanan() {
  const { user } = useAuthContext();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistoryBookings(user.data.user_id);
        console.log(data);
        setHistory(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchHistory();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {history.length === 0 ? (
        <p>Tidak ada riwayat booking.</p>
      ) : (
        <div className="flex flex-col container mx-auto ">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-[1200px] mx-auto  text-left text-sm font-light text-surface dark:text-white">
                  <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Tanggal Mulai
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Tanggal Akhir
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Durasi
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Total Price
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Status
                      </th>
                    </tr>
                  </thead>
                  {history.map((booking) => (
                    <tbody key={booking.booking_id}>
                      <tr className="border-b border-neutral-200 dark:border-white/10">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {booking.car.title}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {new Date(booking.start_date).toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {new Date(booking.end_date).toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {booking.duration} Hari
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {formatRupiah(booking.total_price)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span
                            className={`px-2 py-1 text-white font-medium text-[10px] rounded-xl ${
                              booking.status_pelunasan === "Completed"
                                ? "bg-green-500" : booking.status_pelunasan === "Cancel" ? "bg-red-500" : "bg-yellow-500"
                            }`}
                          >
                            {booking.status_pelunasan}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RiwayatPemesanan;