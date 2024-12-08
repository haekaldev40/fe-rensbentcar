import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import { HeroSection } from "../components/HeroSection";
import { Features } from "../components/Features";
import { Accordion } from "../components/Acoordion";
import { Footer } from "../components/Footer";

export function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/daftarmobil");
    window.scrollTo(0, 0);
  };
  return (
    <>
      <HeroSection />

      <section className="text-center md:max-w-7xl md:text-left md:mx-8 md:px-5 ">
        <p className="mt-36 py-4 tracking-tight font-extrabold text-gray-800 text-3xl">
          Pilihan Mobil
        </p>
        <p className="text-base text-gray-500 font-light ">
          Berikut pilihan mobil yang dapat anda pilih untuk perjalanan anda.
        </p>
        <Card />
        <div className="mx-auto max-w-60 mt-8 pt-4">
          <button
            onClick={handleClick}
            className="flex justify-center w-full mx-auto px-4 py-2 text-center border border-gray-800 text-gray-800 text-sm hover:bg-gray-800 hover:text-white font-bold"
          >
            Lihat Semua Mobil
          </button>
        </div>
      </section>

      <section className="pt-10">
        <Features />
      </section>

      <section className="pt-10">
        <Accordion />
      </section>

      <section className="pt-10">
        <Footer />
      </section>
    </>
  );
}

export default Home;
