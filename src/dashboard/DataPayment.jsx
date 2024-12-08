import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllPayment, updatePaymentStatus } from "../utils/apiPayment";
import toast from "react-hot-toast";
import { useState } from "react";

export function DataPayment() {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [currentPaymentId, setCurrentPaymentId] = useState(null);

  const { data: paymentData, isLoading: isPaymentLoading } = useQuery({
    queryFn: getAllPayment,
    queryKey: ["payment"],
  });

  const { mutate: updatePayment, isLoading: isUpdatingPayment } = useMutation({
    mutationFn: updatePaymentStatus,
    onSuccess: () => {
      toast.success("Berhasil diupdate.");
      queryClient.invalidateQueries({
        queryKey: ["payment"],
      });
      setShowModal(false);
    },
    onError: (error) => toast.error(error.message),
  });

  const handleStatusUpdate = (paymentId) => {
    setCurrentPaymentId(paymentId);
    setShowModal(true);
  };

  const confirmStatusUpdate = (status) => {
    updatePayment({ paymentId: currentPaymentId, status });
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

  const calculateTotalPrice = (price, startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return price * duration;
  };

  if (isPaymentLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 border-b">
            <tr className="font-mono">
              <th className="p-4 text-sm font-semibold text-left">Customer</th>
              <th className="p-4 text-sm font-semibold text-left">
                Bukti Transaksi
              </th>
              <th className="p-4 text-sm font-semibold text-left">Mobil</th>
              <th className="p-4 text-sm font-semibold text-left">Date</th>
              <th className="p-4 text-sm font-semibold text-left">Durasi</th>
              <th className="p-4 text-sm font-semibold text-left">
                Harga Sewa
              </th>
              <th className="p-4 text-sm font-semibold text-left">
                Total Harga
              </th>
              <th className="p-4 text-sm font-semibold text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentData.map((payment, index) => (
              <tr
                className="font-mono border-b text-xs hover:bg-gray-50"
                key={index}
              >
                <td className="p-4">{payment.booking.user.name}</td>
                <td className="p-4">
                  <a
                    href={`https://restapi-bensrentcar.vercel.app/uploads/${payment.img_transcation}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Lihat Bukti Transaksi
                  </a>
                </td>
                
                <td className="p-4">{payment.booking.car.title}</td>
                <td className="p-4">
                  {new Date(payment.booking.start_date).toLocaleDateString()} -{" "}
                  {new Date(payment.booking.end_date).toLocaleDateString()}
                </td>
                <td className="p-4">{payment.booking.duration} Hari</td>
                <td className="p-4">
                  {formatRupiah(payment.booking.car.price)}
                </td>
                <td className="p-4">
                  {formatRupiah(
                    calculateTotalPrice(
                      payment.booking.car.price,
                      payment.booking.start_date,
                      payment.booking.end_date
                    )
                  )}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleStatusUpdate(payment.payment_id)}
                    className={`${
                      payment.status_pembayaran === "Belum Lunas"
                        ? "bg-blue-600"
                        : payment.status_pembayaran === "Completed"
                        ? "bg-green-500"
                        : "bg-red-600"
                    } text-white font-normal items-center text-xs rounded-md p-2`}
                  >
                    {payment.status_pembayaran}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && (
          <div
            id="popup-modal"
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setShowModal(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-4 md:p-5 text-center">
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Update Status Pelunasan
                  </h3>
                  <button
                    onClick={() => confirmStatusUpdate("Completed")}
                    className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5"
                  >
                    Sudah Lunas
                  </button>
                  <button
                    onClick={() => confirmStatusUpdate("Cancel")}
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DataPayment;
