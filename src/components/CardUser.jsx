import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { getTotalUser } from "../utils/apiGetTotalAll";

export function CardUser() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const total = await getTotalUser();
        setTotalUsers(total);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTotalUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="border border-gray-200 rounded-md shadow-lg p-4">
      <div className="flex items-center gap-4 mx-2">
        <FaRegUser className="text-5xl text-white bg-blue-400 rounded-full p-2" />
        <div className="flex flex-col">
          <h1 className="text-base text-gray-500 font-mono">Customer</h1>
          <p className="font-bold">{totalUsers}</p>
        </div>
      </div>
    </div>
  );
}
