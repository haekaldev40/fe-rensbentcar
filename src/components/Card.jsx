import { useQuery } from "@tanstack/react-query";
import { getCars } from "../utils/apiCars";

import { LuFuel } from "react-icons/lu";
import { GoPeople } from "react-icons/go";
import { TbWheel } from "react-icons/tb";
import { CiTimer } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
export function Card() {

  const navigate = useNavigate();

  const { data: carsData, isLoading } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars,
  });

  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleBooking = (car) => {
    navigate('/booking', { state: { car } });
  };

  const carsToShow = carsData ? carsData.slice(0, 3) : []; 

  return (
    <>
      {isLoading && <p>Loading...</p>}
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-6">
        {carsToShow &&
          carsToShow.map((car, index) => {
            return (
              <div key={index} className="max-w-sm mx-auto w-full mt-8">
                <div className="relative bg-white border border-gray-200 rounded-lg shadow-lg h-96">
                  

                  <div className="h-40">
                    <img
                      className="rounded-t-lg w-full h-full object-center object-contain"
                      src={car.imageUrl}
                      alt="Product Image"
                    />
                  </div>
                  <div className=" mt-4 p-4">
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
                    <button onClick={() => handleBooking(car)} className="font-bold text-sm mt-4 w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300">
                      Pesan Sekarang
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
