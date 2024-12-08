import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const question = [
  {
    id: 1,
    title: "Persyaratan Sewa Kendaraan",
    answer: `1. Penyewa harus berusia minimal 21 tahun dan memiliki SIM yang masih berlaku.
          2. Penyewa wajib menunjukkan SIM asli dan KTP yang masih berlaku saat pengambilan kendaraan.
          3. Wajib melakukan dp minimal sebesar Rp. 50.000
          3. Pembayaran penuh dilakukan pada saat pemesanan atau pengambilan kendaraan. Kami menerima pembayaran melalui transfer bank, atau pembayaran tunai.
          `,
  },
  {
    id: 2,
    title: "Kebijakan Penggunaan Kendaraan",
    answer: `1. Minimal durasi sewa adalah 24 jam. Keterlambatan pengembalian kendaraan akan dikenakan biaya tambahan pada saat pengembalian mobil.
      2. Kendaraan harus dikembalikan dengan jumlah bahan bakar yang sama seperti saat diterima. Kekurangan bahan bakar akan dikenakan biaya tambahan pada saat pengembalian mobil.
      3. Kendaraan tidak boleh digunakan untuk kegiatan ilegal, balap liar, atau digunakan oleh orang lain selain penyewa tanpa izin dari Bens Rent Car.
      `,
  },
  {
    id: 3,
    title: "Tanggung Jawab Penyewa",
    answer: `1. Penyewa diharapkan menjaga kebersihan kendaraan. Biaya pembersihan tambahan akan dikenakan jika kendaraan dikembalikan dalam kondisi kotor.
      2. Segera laporkan setiap kerusakan atau masalah pada kendaraan kepada Bens Rent Car.
      `,
  },
];
export function Accordion() {
  const [selected, setSelected] = useState(null);

  const handleSelected = (id) => {
    console.log(id);
    setSelected(id === selected ? null : id);
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div
        className="max-w-7xl mx-auto px-7 sm:px-8 lg:text-center mt-8"
        data-aos="fade-up"
        data-aos-duration="3000"
      >
        <div>
          <h1 className="tracking-tight font-extrabold text-gray-800 text-2xl mb-2 sm:text-4xl">
            Syarat & Ketentuan Pemesanan
          </h1>
          <p className="text-base text-gray-500 font-light mb-8">
            Berikut adalah syarat dan ketentuan di Bens Rent Car.
          </p>
        </div>

        {question &&
          question.map((datas, index) => {
            return (
              <div className="max-w-3xl mx-auto mt-4" key={index}>
                <button
                  onClick={() => handleSelected(datas.id)}
                  className="w-full flex p-4 justify-between items-center font-medium rtl:text-right text-gray-500 border border-gray-200   focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                >
                  <span>{datas.title}</span>
                  <FaAngleDown />
                </button>
                {selected === datas.id ? (
                  <div className="p-3 border border-gray-200 focus:ring-gray-200 dark:focus:ring-gray-800 shadow-md rounded-b-md">
                    <p
                      className="text-left mx-4 py-2 text-gray-500 mb-2 font-normal"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {datas.answer}
                    </p>
                  </div>
                ) : null}
              </div>
            );
          })}
      </div>
    </>
  );
}
