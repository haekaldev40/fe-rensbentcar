import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../components/ModalSuccess";
import { MdOutlineDone } from "react-icons/md";
import { Footer } from "../components/Footer";

const TotalPaymentForm = ({ label, value }) => {
  return (
    <div className="flex flex-col mt-4 max-w-3xl md:flex-row md:justify-between md:items-center md:mx-6">
      <h1 className="text-gray-500 text-lg font-light md:text-sm lg:text-base">
        {label}
      </h1>
      <p className="font-bold text-sm lg:text-base">{value}</p>
    </div>
  );
};

export function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking, carTitle, bookingId, carImg } = location.state || {};
  console.log("Received booking in Payment:", booking); // Logging untuk debugging
  console.log("Received carTitle in Payment:", carTitle);
  console.log("Received bookingId in Payment:", bookingId);
  console.log("Received carImg in Payment:", carImg);

  const [imgTranscation, setImgTranscation] = useState(null);
  const [ktp, setKtp] = useState(null);
  const [sim, setSim] = useState(null);
  const [amount, setAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (booking) {
      setAmount(booking.total_price);
    }
  }, [booking]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.size > 5 * 1024 * 1024)) {
      alert("Ukuran file terlalu besar, maksimum 5MB.");
      return;
    }
    if (file && !['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
      alert("File harus berupa gambar (JPEG/PNG) atau PDF.");
      return;
    }
    setImgTranscation(file);
  };
  
  const handleKtpChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.size > 5 * 1024 * 1024)) {
      alert("Ukuran file terlalu besar, maksimum 5MB.");
      return;
    }
    if (file && !['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
      alert("File harus berupa gambar (JPEG/PNG) atau PDF.");
      return;
    }
    setKtp(file);
  };
  
  const handleSimChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.size > 5 * 1024 * 1024)) {
      alert("Ukuran file terlalu besar, maksimum 5MB.");
      return;
    }
    if (file && !['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
      alert("File harus berupa gambar (JPEG/PNG) atau PDF.");
      return;
    }
    setSim(file);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imgTranscation || !ktp || !sim) {
      alert("Mohon unggah semua file yang diperlukan.");
      return;
  }

    const formData = new FormData();
    formData.append("booking_id", booking.booking_id);
    formData.append("img_transcation", imgTranscation);
    formData.append("img_ktp", ktp);
    formData.append("img_sim", sim);

    try {
      const response = await fetch("https://restapi-bensrentcar.vercel.app/paymentsv2", {
        method: "POST",
        body: formData,
      });

      const dataPayment = await response.json();
      console.log(dataPayment);

      if (dataPayment.success) {
        setIsModalOpen(true);
        // Remove notification setting here
      }

    } catch (error) {
      console.error("Failed to create payment:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/", { state: { payment: true } });
  };

  const formatRupiah = (number) => {
    if (number == null) return "Rp 0";
    return number.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  if (!booking) {
    return <div>Data booking tidak tersedia.</div>;
  }

  return (
    <>
      <div className="mx-auto w-11/12 mt-8 p-4 border border-gray-200 rounded-md shadow-lg">
        <h2 className="text-2xl font-bold p-4">Form Pembayaran</h2>
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="p-2 lg:w-2/5">
            <div className="flex gap-8 p-4">
              <img src={carImg} className="w-40 lg:w-20" alt="car" />
              <div className="flex-col">
                <h1 className="text-xl font-bold">{carTitle}</h1>
                <p className="text-lg font-light">
                  {formatRupiah(booking.total_price)}
                </p>
              </div>
            </div>
            <div className="mt-2 border border-gray-200 rounded-md p-4">
              <p className="text-xs font-normal">
                Mohon lakukan pembayaran untuk melakukan pemesanan tersebut.
              </p>
              <p className="font-bold mt-2 text-lg">Nomor Rekening</p>
              <p className="font-extrabold mt-2 text-3xl">4870659071</p>
              <p className="font-bold">BCA A/N Enggar Gusti Pradiptha</p>
            </div>
          </div>
          <div className="border border-gray-200 rounded-md shadow-xl p-2 lg:w-1/2">
            <form onSubmit={handleSubmit}>
              <div className="my-4 mx-4">
                <label className="block text-gray-700 mb-1">
                  Unggah Struk Pembayaran
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="border border-gray-300 p-2 w-full"
                  required
                />
              </div>
              <div className="my-4 mx-4">
                <label className="block text-gray-700 mb-1">
                  Unggah KTP
                </label>
                <input
                  type="file"
                  onChange={handleKtpChange}
                  className="border border-gray-300 p-2 w-full"
                  required
                />
              </div>
              <div className="my-4 mx-4">
                <label className="block text-gray-700 mb-1">
                  Unggah SIM
                </label>
                <input
                  type="file"
                  onChange={handleSimChange}
                  className="border border-gray-300 p-2 w-full"
                  required
                />
              </div>
              <TotalPaymentForm
                label="Harga Sewa"
                value={formatRupiah(booking.total_price)}
              />
              <TotalPaymentForm
                label="Total Yang Harus Dibayar"
                value={formatRupiah(amount)}
              />
              <button
                type="submit"
                className=" my-6 w-1/2 flex mx-auto justify-center items-center py-2 bg-gray-800 hover:bg-gray-600 text-white rounded-sm font-bold"
              >
                Bayar
              </button>
            </form>
          </div>
        </div>

        <Modal open={isModalOpen} onClose={closeModal}>
          <div className="text-center w-56">
            <MdOutlineDone size={56} className="mx-auto text-green-600" />
            <div className="mx-auto my-4 w-48">
              <h2 className="text-lg font-black text-gray-800">
                Pembayaran Sukses
              </h2>
              <p className="text-xs text-gray-500">
                Terima kasih, pembayaran Anda telah berhasil diproses.
              </p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="mt-2 font-bold px-4 py-2 mx-20 text-center bg-green-600 text-white rounded"
          >
            OK
          </button>
        </Modal>
      </div>
      <section className="pt-10">
        <Footer />
      </section>
    </>
  );
}

export default Payment;
