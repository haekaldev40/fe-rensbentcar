import imgHome from "../assets/images/logo1.png";
import { MdOutlineCarRental } from "react-icons/md";
import { BiMoneyWithdraw } from "react-icons/bi";
import { GrServices } from "react-icons/gr";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export function Features() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div
      className="max-w-6xl mx-auto mt-12"
      data-aos="fade-right"
      data-aos-offset="300"
      data-aos-easing="ease-in-sine"
    >
      <div className="flex flex-col justify-center lg:flex-row ">
        <div className="w-full relative flex items-center justify-center">
          <img src={imgHome} alt="" width={500} className="items-center" />
        </div>
        <div className="w-full py-6 px-8 md:px-12">
          <h1 className="tracking-tight font-extrabold text-gray-800 text-2xl mb-2 sm:text-4xl">
            Mengapa Harus Bens Rent Car?
          </h1>
          <p className="text-base text-gray-500 font-light">
            Karena kami adalah pilihan terbaik untuk perjalanan liburan anda,
            serta anda bisa memilih jenis kendaraan sesuai kebutuhan dengan
            harga yang terjangkau.
          </p>
          <div className="mt-4" data-aos="fade-up">
            <div className="flex flex-row items-center">
              <MdOutlineCarRental className="text-5xl text-gray-800" />
              <p className="mx-4 tracking-tight font-extrabold text-gray-800">
                Proses Sewa Mudah Tanpa Ribet
              </p>
            </div>
            <div className="flex flex-row items-center mt-4">
              <BiMoneyWithdraw className="text-5xl text-gray-800" />
              <p className="mx-4 tracking-tight font-extrabold text-gray-800">
                Harga Kompetitif & Terjangkau
              </p>
            </div>
            <div className="flex flex-row items-center mt-4">
              <GrServices className="text-5xl text-gray-800" />
              <p className="mx-4 tracking-tight font-extrabold text-gray-800">
                Kendaraan Berkualitas Serta Service Berkala
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
