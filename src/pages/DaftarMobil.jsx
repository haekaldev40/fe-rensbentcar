import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { getCars } from "../utils/apiCars";
import { FaCar } from "react-icons/fa";
import { LuFuel } from "react-icons/lu";
import { GoPeople } from "react-icons/go";
import { TbWheel } from "react-icons/tb";
import { CiTimer } from "react-icons/ci";
import { Loader } from "../components/Loader";
import { useAuthContext } from "../hooks/useAuthContext";
import { Footer } from "../components/Footer";

export function DaftarMobil() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('semua mobil');
  const [filterPeople, setFilterPeople] = useState('all');
  
  const { user } = useAuthContext(); 

  const navigate = useNavigate();

  const { data: carsData, isLoading } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars,
  });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleFilterPeople = (event) => {
    setFilterPeople(event.target.value);
  };

  const handleBooking = (car) => {
    if (user) {
      navigate('/booking', { state: { car } });
    } else {
      navigate('/login');
    }
  };

  const filteredCars = carsData
    ? carsData.filter((car) => {
        const matchesSearchTerm = car.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilterOption = filterOption === 'semua mobil' || car.transimisi.toLowerCase() === filterOption;

        let matchesFilterPeople = true;
        if (filterPeople !== 'all') {
          const selectedPeople = parseInt(filterPeople, 10);
          const carCapacity = parseInt(car.capacity.match(/\d+/)[0], 10); // Extract numeric part from capacity
          matchesFilterPeople = carCapacity === selectedPeople;
        }
        
        return matchesSearchTerm && matchesFilterOption && matchesFilterPeople;
      })
    : [];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <div className="gap-3 items-center max-w-7xl mx-auto pt-10 mt-8 flex flex-col justify-center md:gap-0 md:justify-evenly md:flex-row">
        <div className="search">
          <div className="flex max-w-sm items-center justify-center mx-auto relative">
            <div className="relative w-full">
              <FaCar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                className="w-[280px] p-2 pl-10 border border-gray-200"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 md:mt-0">
          <select
            value={filterPeople}
            onChange={handleFilterPeople}
            className="w-[280px] p-2 border border-gray-200"
          >
            <option value="all">Semua Kapasitas</option>
            <option value="5">2-5 Orang</option>
            <option value="6">2-6 Orang</option>
            <option value="7">7 Orang</option>
          </select>
        </div>
        <div className="mt-4 md:mt-0">
          <select
            value={filterOption}
            onChange={handleFilterChange}
            className="w-[280px] p-2 border border-gray-200"
          >
            <option value="semua mobil">Semua Mobil</option>
            <option value="manual">Manual</option>
            <option value="matic">Matic</option>
          </select>
        </div>
      </div>

      {isLoading && <Loader />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mt-8">
        {filteredCars.map((car, index) => (
          <div key={index} className="max-w-sm mx-auto w-full mt-8">
            <div className="relative bg-white border border-gray-200 rounded-lg shadow-lg h-96">

              <div className="h-40">
                <img
                  className="rounded-t-lg w-full h-full object-center object-contain"
                  src={car.imageUrl}
                  alt="Product Image"
                />
              </div>
              <div className="mt-4 p-4">
                <h5 className="text-lg font-semibold">{car.title}</h5>
                <div className="flex items-center text-gray-700 mt-2 text-xs">
                  <p>
                    <LuFuel size={20} className="mr-1" />
                  </p>
                  <p className="mr-2">{car.fuel}</p>
                  <p>
                    <GoPeople size={20} className="mr-2" />
                  </p>
                  <p className="mr-2">{car.capacity}</p>
                  <p>
                    <TbWheel size={20} className="mr-2" />
                  </p>
                  <p className="mr-2">{car.transimisi}</p>
                  <p>
                    <CiTimer size={20} className="mr-2" />
                  </p>
                  <p className="mr-2">{car.year}</p>
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-bold">
                    {formatPrice(car.price)}/hari
                  </span>
                </div>
                <button 
                className="font-bold text-sm mt-4 w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300"
                onClick={() => handleBooking(car)}
                >
                  Pesan Sekarang
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-8">
      <Footer />
      </div>
    </>
  );
}

export default DaftarMobil;