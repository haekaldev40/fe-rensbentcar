import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFilteredDataByMonth } from "../utils/apiPayment";
import { IoMdPrint } from "react-icons/io";
import jsPDF from "jspdf";
import "jspdf-autotable";

// Import your logo
import logo from '../assets/images/logobens.png';  // Adjust the path to your logo

export function DataLaporan() {
  const [selectedMonth, setSelectedMonth] = useState("");

  const {
    data: paymentData,
    isLoading: isPaymentLoading,
    refetch,
  } = useQuery({
    queryFn: () => getFilteredDataByMonth(selectedMonth),
    queryKey: ["filteredPayments", selectedMonth],
    enabled: false, // Disable automatic refetching
  });

  useEffect(() => {
    if (selectedMonth !== "") {
      refetch();
    }
  }, [selectedMonth, refetch]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
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

  const calculateTotalIncome = () => {
    if (!paymentData) return 0;
    return paymentData.reduce((total, payment) => {
      return total + payment.booking.total_price;
    }, 0);
  };

  const getMonthName = (monthNumber) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[parseInt(monthNumber) - 1];
  };

  const handlePrint = () => {
    if (!paymentData || paymentData.length === 0) {
      alert("Tidak ada data untuk dicetak");
      return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Add logo to the PDF
    const imgWidth = 50; // Adjust width as needed
    const imgHeight = 50; // Adjust height as needed
    const imgX = (pageWidth - imgWidth) / 2; // Center horizontally
    const imgY = 10; // Adjust vertical position as needed

    doc.addImage(logo, 'PNG', imgX, imgY, imgWidth, imgHeight);

    doc.text("Data Laporan", 14, imgY + imgHeight + 10); // Adjust position according to logo size and position
    const tableColumn = ["Customer", "Mobil", "Date", "Harga Sewa"];
    const tableRows = [];

    paymentData.forEach((payment) => {
      const paymentRow = [
        payment.booking.user.name,
        payment.booking.car.title,
        `${new Date(payment.booking.start_date).toLocaleDateString()} - ${new Date(payment.booking.end_date).toLocaleDateString()}`,
        formatRupiah(payment.booking.car.price),
      ];
      tableRows.push(paymentRow);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: imgY + imgHeight + 20, // Adjust start position according to logo size and position
    });

    const totalIncome = formatRupiah(calculateTotalIncome());
    doc.text(`Total Pendapatan Bulan Ini: ${totalIncome}`, 14, doc.lastAutoTable.finalY + 10);

    const monthName = getMonthName(selectedMonth);
    doc.save(`data_laporan_${monthName}.pdf`);
  };

  const calculateTotalPrice = (price, startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return price * duration;
  };


  if (isPaymentLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="flex items-center justify-end gap-8 mb-7">
        <select
          onChange={handleMonthChange}
          value={selectedMonth}
          className=" p-2 border rounded-md w-1/4"
        >
          <option value="">Pilih Bulan</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
        <button
          onClick={handlePrint}
          className="flex items-center md:px-4 md:py-2 md:bg-gray-800 hover:bg-gray-600 md:text-white md:rounded-sm md:font-bold md:text-sm"
        >
          <IoMdPrint className="mr-2 text-xl" />
          Cetak Data Laporan
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {paymentData && (
          <>
            <table className="">
              <thead className="text-left p-2">
                <tr className="font-mono">
                  <th className="p-2 text-sm font-semibold">Customer</th>
                  <th className="p-2 text-sm font-semibold">Mobil</th>
                  <th className=" p-2 text-sm font-semibold">Date</th>
                  <th className=" p-2 text-sm font-semibold">Harga Sewa</th>
                  <th className=" p-2 text-sm font-semibold">Total Harga Sewa</th>
                </tr>
              </thead>
              <tbody className="">
                {paymentData.map((payment, index) => (
                  <tr className="font-mono border-b text-sm" key={index}>
                    <td className="p-2">{payment.booking.user.name}</td>
                    <td className="p-2">{payment.booking.car.title}</td>
                    <td className="p-2">
                      {new Date(payment.booking.start_date).toLocaleDateString()}{" "}
                      - {new Date(payment.booking.end_date).toLocaleDateString()}
                    </td>
                    <td className="p-2">
                      {formatRupiah(payment.booking.car.price)}
                    </td>
                    <td className="p-4">
            {formatRupiah(
              calculateTotalPrice(
                payment.booking.car.price,
                payment.booking.start_date,
                payment.booking.end_date
              )
            )}
          </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4">
              <h2 className="text-xl font-mono font-bold">Total Pendapatan Bulan Ini: {formatRupiah(calculateTotalIncome())}</h2>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default DataLaporan;
