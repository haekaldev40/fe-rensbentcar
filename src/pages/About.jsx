import { Footer } from "../components/Footer";
import { ImageSlider } from "../components/ImageSlider";
import { Map } from "../components/Map";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export function About() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <div data-aos="fade-up" data-aos-duration="3000">
        <div className="text-center pt-12">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-800 sm:text-4xl md:text-5xl">
            <span>Tentang</span>
            <span className="text-indigo-600"> {""} Bens Rent Car</span>
          </h1>
          <p className="mt-4 font-light text-xl">
            Rental Mobil Dengan Harga Terjangkau & Berkualitas
          </p>
        </div>
        <div className=" max-w-6xl mx-4 md:mx-10 mt-7 mb-10">
          <p className="font-light">
            Bens Rent Car adalah perusahaan penyedia layanan transportasi yang
            berada di kota Jakarta Utara, hadir untuk anda dalam penyediaan jasa
            rental mobil dengan pelayanan yang terbaik. Seperti hal nya filosofi
            kita, kami memberikan harga dan terjangkau juga berkualitas Dengan
            berbagai pilihan mobil dari berbagai jenis dan merek, kami siap
            memenuhi kebutuhan transportasi Anda, baik untuk perjalanan bisnis,
            liburan keluarga, maupun acara khusus Kepuasan anda adalah prioritas
            utama kami, oleh karena itu kami selalu berusaha untuk memberikan
            pelayanan terbaik dan pengalaman sewa mobil yang menyenangkan.
            liburan keluarga, maupun acara khusus.
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-4 md:mx-10 mt-12  pt-8">
        <h1 className="tracking-tight font-extrabold text-gray-800 text-3xl">
          Layanan
        </h1>
        <p className="text-base text-gray-500 font-light mt-2">
          Berikut adalah layanan Bens Rent Car untuk segala kebutuhan.
        </p>
      </div>
      <section className="flex" data-aos="fade-right" data-aos-duration="2000">
        <ImageSlider />
      </section>

      <div data-aos="fade-right" data-aos-duration="2000">
      <Map />
      </div>

      <Footer />
    </>
  );
}

export default About;
