import { useState, useEffect } from "react";

import { MdOutlineShoppingCart } from "react-icons/md";
import { getTotalRevenue } from "../utils/apiGetTotalAll";

export function CardRevenue() {
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const totalRevenue = await getTotalRevenue();
        setRevenue(totalRevenue);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRevenue();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="border border-gray-200 rounded-md shadow-lg p-4">
      <div className="flex items-center gap-4 mx-2">
        <MdOutlineShoppingCart className="text-5xl text-green-200 bg-green-400 rounded-full p-2" />
        <div className="flex flex-col">
          <h1 className="text-base text-gray-500 font-mono">Pendapatan</h1>
          <p className="font-bold">{formatPrice(revenue)}</p>
        </div>
      </div>
    </div>
  );
}
