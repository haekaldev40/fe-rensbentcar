import { useLocation, useNavigate } from "react-router-dom";

const formatRupiah = (number) => {
  if (number == null) return "Rp 0";
  return number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

const BookingDetailItem = ({ label, value }) => {
  return (
    <div className="flex flex-col mt-4 max-w-3xl md:flex-row md:justify-between md:items-center md:mx-6">
      <h1 className="text-gray-500 text-lg font-light md:text-sm lg:text-base">
        {label}
      </h1>
      <p className="font-bold text-sm lg:text-base">{value}</p>
    </div>
  );
};

export function DetailBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking, carTitle, bookingId, carImg } = location.state || {};

  console.log("Received booking data:", booking); // Logging untuk debugging
  console.log("Received carTitle:", carTitle);
  console.log("Received bookingId:", bookingId);
  console.log("Received bookingId:", carImg);
  

  if (!booking || !booking.data) {
    return <div>Detail booking tidak tersedia.</div>;
  }

  const {
    start_date,
    end_date,
    duration,
    total_price,
    status_pelunasan,
  } = booking.data;

  const handlePayment = () => {
    console.log("Navigating to payment with booking:", booking.data); // Logging untuk debugging
    navigate("/payment", {
      state: { booking: booking.data, carTitle, bookingId, carImg },
    });
  };

  return (
    // <div className="container mx-auto mt-8 p-4">
    //   <h2 className="text-2xl font-bold mb-4">Detail Booking</h2>
    //   <p>{bookingId}</p>
    //   <p><strong>Mobil:</strong> {carTitle}</p>
    //   <p><strong>Tanggal Mulai:</strong> {new Date(start_date).toLocaleDateString()}</p>
    //   <p><strong>Tanggal Akhir:</strong> {new Date(end_date).toLocaleDateString()}</p>
    //   <p><strong>Durasi:</strong> {duration} Hari</p>
    //   <p><strong>Total Harga:</strong> {formatRupiah(total_price)}</p>
    //   <p><strong>Total DP:</strong> {formatRupiah(total_dp)}</p>
    //   <p><strong>Status Pelunasan:</strong> {status_pelunasan}</p>
    //   <button
    //     className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
    //     onClick={handlePayment}
    //   >
    //     Bayar Sekarang
    //   </button>
    // </div>
    <div className=" max-w-6xl mx-5 border border-gray-300 shadow-lg rounded-lg p-6 mt-4 md:mx-12">
      <div className="flex flex-col md:flex-row">
        <div className="bg-white relative shadow-md rounded-lg p-4 md:w-[300px] lg:w-[450px] hidden md:block">
          <img
            src={carImg}
            className="h-full w-full object-center object-contain rounded-lg"
          />
        </div>
        <div className="w-4/5">
          <h1 className="font-extrabold text-gray-800 md:px-6 text-2xl">
            Detail Booking
          </h1>
          <BookingDetailItem label="Booking ID" value={bookingId} />
          <BookingDetailItem label="Mobil" value={carTitle} />
          <BookingDetailItem
            label="Tanggal Mulai"
            value={new Date(start_date).toLocaleDateString()}
          />
          <BookingDetailItem
            label="Tanggal Akhir"
            value={new Date(end_date).toLocaleDateString()}
          />
          <BookingDetailItem label="Durasi" value={`${duration} Hari`} />
          <BookingDetailItem
            label="Total Harga"
            value={formatRupiah(total_price)}
          />
          <BookingDetailItem
            label="Status Pelunasan"
            value={status_pelunasan}
          />
          <div className="flex flex-row gap-8 md:justify-center mt-5">
            <button 
            onClick={() => navigate("/daftarmobil")}
            className="lg:w-2/6 px-6 py-2 border border-gray-800 text-gray-800 text-sm hover:bg-gray-800 hover:text-white font-bold">
              Cancel
            </button>
            <button 
            onClick={handlePayment}
            className="bg-gray-800 lg:w-2/6 px-6 py-2 hover:bg-gray-600 text-white rounded-sm font-bold">
              Bayar Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailBooking;
