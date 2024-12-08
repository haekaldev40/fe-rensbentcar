import { useEffect, useState } from "react";
import { FaCarRear } from "react-icons/fa6";
import { getTotalCars } from "../utils/apiGetTotalAll";

export function CardCar() {
  const [totalCars, setTotalCars] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalCars = async () => {
      try {
        const total = await getTotalCars();
        setTotalCars(total);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTotalCars();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="border border-gray-200 rounded-md shadow-lg p-4">
      <div className="flex items-center gap-4 mx-2">
        <FaCarRear className="text-5xl text-white bg-red-400 rounded-full p-2" />
        <div className="flex flex-col">
          <h1 className="text-base text-gray-500 font-mono">Mobil</h1>
          <p className="font-bold">{totalCars}</p>
        </div>
      </div>
    </div>
  );
}
