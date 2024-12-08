import { useNavigate } from "react-router-dom";
import heroImg from "../assets/images/herosection.jpg";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="sm:mt-6 lg:mt-8 mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="my-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 flex gap-3 lg:flex-justify lg:flex flex-col lg:flex-row">
        <div className="sm:text-center lg:text-left">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-800 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">
              Nikmati Perjalanan Anda Dengan
            </span>
            <span className="block text-indigo-600 xl:inline">
              {" "}
              Bens Rent Car
            </span>
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Nikmati perjalanan yang menyenangkan dengan pilihan mobil yang siap
            membawa anda disetiap perjalanan.
          </p>

          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <a
                onClick={() => navigate("/daftarmobil")}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-600 md:py-4 md:text-lg md:px-10"
              >
                Cari Mobil
              </a>
            </div>
          </div>
        </div>

        <div className="lg:inset-y-0 lg:right-0 lg:w-1/2 my-4">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src={heroImg}
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
