import { MdLocationPin } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaClock } from "react-icons/fa";

export function Map() {
  return (
    <>
    <div className="max-w-6xl mx-4 md:mx-10 mt-12 pt-8 mb-9">
      <h1 className="tracking-tight font-extrabold text-gray-800 text-3xl">Kontak & Lokasi </h1>
      <p className="text-base text-gray-500 font-light mt-2">Berikut adalah kontak dan lokasi Bens Rent Car</p>
    </div>
      <div className="flex flex-col md:flex-row rounded-lg shadow-lg border border-gray-200 mx-auto w-[95%] p-4">
        <div className="flex flex-col">
          <div className="flex flex-row w-full gap-4 tracking-tight mt-6 ">
            <MdLocationPin className="text-3xl " />
            <div className="flex flex-col">
              <p className="font-semibold text-lg">
                Lokasi Rental Jakarta Utara
              </p>
              <p className="text-base text-gray-500 font-light ">
                Jl. Ancol Selatan RT 024/001 No. 54, Kec. Tanjung Priok, Kel.
                Sunter Agung, 14350.
              </p>
            </div>
          </div>

          <div className="flex flex-row w-full gap-4 tracking-tight mt-6">
            <MdLocationPin className="text-3xl " />
            <div className="flex flex-col">
              <p className="font-semibold text-lg">
                Lokasi Rental Tanggerang Selatan
              </p>
              <p className="text-base text-gray-500 font-light ">
                Jl. Ancol Selatan RT 024/001 No. 54, Kec. Tanjung Priok, Kel.
                Sunter Agung, 14350.
              </p>
            </div>
          </div>

          <div className="flex flex-row w-full gap-4 tracking-tight mt-6">
            <IoLogoWhatsapp className="text-3xl " />
            <div className="flex flex-col">
              <p className="font-semibold text-lg">
                WhatsApp
              </p>
              <p className="text-base text-gray-500 font-light ">
                +62859 - 3015 - 2441
              </p>
            </div>
          </div>

          <div className="flex flex-row w-full gap-4 tracking-tight mt-6">
            <MdEmail className="text-3xl " />
            <div className="flex flex-col">
              <p className="font-semibold text-lg">
                Email
              </p>
              <p className="text-base text-gray-500 font-light ">
                enggargustiprapditha55@gmail.com
              </p>
            </div>
          </div>

          <div className="flex flex-row w-full gap-4 tracking-tight mt-6">
            <FaClock className="text-3xl " />
            <div className="flex flex-col">
              <p className="font-semibold text-lg">
                Jam Operasional
              </p>
              <p className="text-base text-gray-500 font-light ">
                08.00 - 20.00
              </p>
            </div>
          </div>
        </div>

        <div className=" md:w-1/2 flex justify-center md:justify-end mt-6 ">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.007499646128!2d106.84851450860972!3d-6.129692060070135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a1f002d874729%3A0xb1046914ea529b8a!2sRoemah%20Cendol%20Elisabeth%20Sunter%20Agung!5e0!3m2!1sid!2sid!4v1720906230269!5m2!1sid!2sid"
            width="450"
            height="450"
            loading="lazy"
            className="sm:w-[550px] md:w-[400px] lg:w-[550px]"
          ></iframe>
        </div>
      </div>
    </>
  );
}
