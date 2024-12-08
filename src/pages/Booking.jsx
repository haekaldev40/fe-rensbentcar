import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { CiTimer } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import { TbWheel } from "react-icons/tb";
import { IoMdColorPalette } from "react-icons/io";
import { LuFuel } from "react-icons/lu";
import { createBooking, checkAvailability } from '../utils/apiBooking';
import { useAuthContext } from '../hooks/useAuthContext';
import { nanoid } from 'nanoid';

const formatRupiah = (number) => {
  if (number == null) return "Rp 0";
  return number.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
};

export function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { car } = location.state || {};
  const { user } = useAuthContext();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [duration, setDuration] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDp, setTotalDp] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (end >= start) {
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDuration(diffDays);
        setError(null); // Clear error if dates are valid
      } else {
        setDuration(0);
        setError("Tanggal akhir tidak boleh lebih awal dari tanggal mulai.");
      }
    } else {
      setDuration(0);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (car && car.price) {
      setTotalPrice(duration * car.price);
    }
  }, [duration, car]);

  useEffect(() => {
    const checkDatesAvailability = async () => {
      if (startDate && endDate && !error) {
        try {
          await checkAvailability({
            car_id: car.car_id,
            start_date: startDate,
            end_date: endDate,
          });
          setError(null);
        } catch (availabilityError) {
          setError(availabilityError.message);
        }
      }
    };

    checkDatesAvailability();
  }, [startDate, endDate, car, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!car || !user) {
      setError("Data mobil atau pengguna tidak tersedia.");
      return;
    }

    if (error) {
      return;
    }

    const userId = user.data.user_id;
    const bookingId = nanoid();

    const bookingData = {
      booking_id: bookingId,
      car_id: car.car_id,
      user_id: userId,
      start_date: new Date(startDate).toISOString(),
      end_date: new Date(endDate).toISOString(),
      duration: duration,
      total_price: totalPrice,
    };

    try {
      const booking = await createBooking(bookingData);
      navigate('/detailbooking', { state: { booking, carTitle: car.title, carImg: car.imageUrl, bookingId } });
    } catch (submissionError) {
      setError(submissionError.message || "Terjadi kesalahan.");
    }
  };

  if (!car) {
    return <div>Data mobil tidak tersedia.</div>;
  }

  return (
    <>
      <div className="mt-8 flex flex-col p-4 justify-center items-center md:flex-row md:items-start">
        <div className=" w-full md:w-[500px]">
          <div className="bg-white shadow-md rounded-lg p-4 mx-auto w-[330px] lg:w-[390px]">
            <div className="relative pb-56">
              <img
                src={car.imageUrl}
                alt="Car Wash"
                className="absolute h-full w-full object-center object-contain rounded-lg"
              />
            </div>
            <h2 className="text-lg font-semibold mt-4">{car.title}</h2>
            <div className="flex items-center text-gray-700 mt-2 text-xs">
              <p><LuFuel size={10} className="mr-1" /></p>
              <p className="mr-2">{car.fuel}</p>
              <p><GoPeople size={10} className="mr-2" /></p>
              <p className="mr-2">{car.capacity}</p>
              <p><TbWheel size={10} className="mr-2" /></p>
              <p className="mr-2">{car.transimisi}</p>
              <p><CiTimer size={10} className="mr-2" /></p>
              <p className="mr-2">{car.year}</p>
              <p><IoMdColorPalette size={10} className="mr-2" /></p>
              <p className="mr-2">{car.color}</p>
            </div>
          </div>
        </div>

        <form className="w-4/5 border mt-8 border-gray-200 rounded-lg p-4 md:w-2/3 lg:w-1/2 md:mt-0" onSubmit={handleSubmit}>
          <h1 className="mb-8 font-bold text-2xl mt-4 mx-2">{car.title}</h1>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center md:items-center mb-6 mx-2">
            <div className="w-[120px]">
              <h1>Tanggal Mulai</h1>
            </div>
            <div className="">
              <input
                type="date"
                className="border border-gray-200 w-[320px] p-1 md:w-[240px] lg:w-[320px]"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row md:items-center mb-6 mx-2">
            <div className="w-[120px]">
              <h1>Tanggal Akhir</h1>
            </div>
            <div className="">
              <input
                type="date"
                className="border border-gray-200 w-[320px] p-1 md:w-[240px] lg:w-[320px]"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row md:items-center mb-6 mx-2">
            <div className="w-[120px]">
              <h1>Durasi</h1>
            </div>
            <div className="">
              <input
                type="text"
                className="border border-gray-200 w-[320px] p-1 md:w-[240px] lg:w-[320px]"
                value={`${duration} Hari`}
                readOnly
              />
            </div>
          </div>
          {/* <div className="flex flex-col gap-2 sm:flex-row md:items-center mb-6 mx-2">
            <div className="w-[120px]">
              <h1>Jumlah Dp</h1>
            </div>
            <div className="">
              <input
                type="text"
                className="border border-gray-200 w-[320px] p-1 md:w-[240px] lg:w-[320px]"
                onChange={(e) => setTotalDp(e.target.value)}
                value={totalDp}
              />
            </div>
          </div> */}
          <div className="flex flex-row gap-4 md:items-center mb-6 mx-2 font-bold">
            <div className="w-[120px]">
              <h1 className="text-lg">Harga Mobil</h1>
            </div>
            <div className="">
              <p className="text-lg">{formatRupiah(car.price)}/hari </p>
            </div>
          </div>
          <div className="flex flex-row gap-2 sm:flex-row md:items-center mb-6 mx-2 font-bold">
            <div className="w-[120px]">
              <h1 className="text-lg">Total Harga</h1>
            </div>
            <div className="">
              <p className="text-lg">{formatRupiah(totalPrice)}</p>
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify center mx-auto w-72">
            <button className="w-72 mx-auto px-2 py-2 bg-gray-800 hover:bg-gray-600 text-white font-bold" type="submit" disabled={!!error}>Booking</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Booking;