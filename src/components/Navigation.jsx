import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { Dropdown } from "./Dropdown";


export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuthContext();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:flex md:justify-between md:items-center p-4 h-20 ">
      <div className="max-w-7xl flex justify-between items-center md:mx-4 lg:mx-4">
        <div className="">
          <span className="text-2xl tracking-tight font-bold text-indigo-600">BensRentCar.</span>
        </div>
        <div className="md:hidden flex items-center gap-4">
          {user && (
            <>
              <Dropdown />
              {/* <NotificationButton className="text-2xl" /> */}
            </>
          )}
          <button
            onClick={toggleMenu}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 ml-4"
          >
            <RxHamburgerMenu size={30} className="" />
          </button>
        </div>
      </div>

      <ul
        className={`mt-4 md:mt-0 md:flex md:items-center md:gap-4 md:bg-white ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <li className="md:ml-2">
          <NavLink
            className={({ isActive }) => (isActive ? "text-blue-500" : "")}
            to="/"
            end
            onClick={closeMenu}
          >
            Home
          </NavLink>
        </li>
        <li className="md:ml-2">
          <NavLink
            className={({ isActive }) => (isActive ? "text-blue-500" : "")}
            to="/daftarmobil"
            end
            onClick={closeMenu}
          >
            Daftar Mobil
          </NavLink>
        </li>
        <li className="md:ml-2">
          <NavLink
            className={({ isActive }) => (isActive ? "text-blue-500" : "")}
            to="/tentangkami"
            onClick={closeMenu}
          >
            Tentang Kami
          </NavLink>
        </li>
        {user ? (
          <>
            <li className="md:ml-2 md:flex md:items-center gap-8">
              <NavLink
                className={({ isActive }) => (isActive ? "text-blue-500" : "")}
                to="/riwayatpemesanan"
                onClick={closeMenu}
              >
                Daftar Booking
              </NavLink>
              {/* <NotificationButton className="text-sm" /> */}
            </li>
            <Dropdown className="ml-1 hidden md:block" />
          </>
        ) : (
          <>
            <li className="md:ml-4 md:px-5 md:py-2 md:bg-gray-800 hover:bg-gray-600 md:text-white md:rounded-sm md:font-bold md:text-sm">
              <NavLink
                className={({ isActive }) => (isActive ? "text-blue-500" : "")}
                to="/register"
                onClick={closeMenu}
              >
                Register
              </NavLink>
            </li>
            <li className="md:ml-4 md:px-6 md:py-2 border border-gray-800 text-gray-800 text-sm hover:bg-gray-800 hover:text-white font-bold">
              <NavLink
                className={({ isActive }) => (isActive ? "text-blue-500" : "")}
                to="/login"
                onClick={closeMenu}
              >
                Login
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
