import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Lazy load components
const Layout = React.lazy(() => import("./components/Layout"));
const Home = React.lazy(() => import("./pages/Home"));
const Booking = React.lazy(() => import("./pages/Booking"));
const DaftarMobil = React.lazy(() => import("./pages/DaftarMobil"));
const DetailBooking = React.lazy(() => import("./pages/DetailBooking"));
const About = React.lazy(() => import("./pages/About"));
const RiwayatPemesanan = React.lazy(() => import("./pages/RiwayatPemesanan"));
const Payment = React.lazy(() => import("./pages/Payment"));
const LayoutDashboard = React.lazy(() => import("./components/LayoutDashboard"));
const Dashboard = React.lazy(() => import("./dashboard/Dashboard"));
const DataMobil = React.lazy(() => import("./dashboard/DataMobil"));
const DataLaporan = React.lazy(() => import("./dashboard/DataLaporan"));
const DataPayment = React.lazy(() => import("./dashboard/DataPayment"));
const DataPengembalian = React.lazy(() => import("./dashboard/DataPengembalian"));
const Register = React.lazy(() => import("./pages/Register"));
const Login = React.lazy(() => import("./pages/Login"));

function App() {
  return (
    <>
      <BrowserRouter>
        {/* Suspense untuk fallback loading saat lazy load */}
        <Suspense fallback={<div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>}>
          <Routes>
            {/* Routes dengan Layout utama */}
            <Route element={<Layout />}>
              <Route path="" element={<Home />} />
              <Route path="booking" element={<Booking />} />
              <Route path="daftarmobil" element={<DaftarMobil />} />
              <Route path="detailbooking" element={<DetailBooking />} />
              <Route path="tentangkami" element={<About />} />
              <Route path="riwayatpemesanan" element={<RiwayatPemesanan />} />
              <Route path="payment" element={<Payment />} />
            </Route>

            {/* Routes dengan Layout dashboard */}
            <Route element={<LayoutDashboard />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="datamobil" element={<DataMobil />} />
              <Route path="datalaporan" element={<DataLaporan />} />
              <Route path="datapayment" element={<DataPayment />} />
              <Route path="datapengembalian" element={<DataPengembalian />} />
            </Route>

            {/* Routes untuk autentikasi */}
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </Suspense>

        {/* Toaster untuk notifikasi */}
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 3000,
            },
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          }}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
