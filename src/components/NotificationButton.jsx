import { useState, useContext, useEffect } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { FaBell } from "react-icons/fa";


export const NotificationButton = () => {
  const { notification } = useContext(NotificationContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="focus:outline-none">
        <FaBell size={24} />
        {notification.count > 0 && (
          <span className="absolute top-0 right-0 h-4 w-4 bg-red-600 text-white text-xs flex items-center justify-center rounded-full">
            {notification.count}
          </span>
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden z-20">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Notifikasi</h3>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {notification.count > 0 ? (
              <div className="p-4 border-b">
                <div className="text-sm font-semibold text-yellow-500">Notifikasi Baru</div>
                <div className="mt-2 text-sm text-gray-700">
                  {notification.message}
                </div>
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                Belum ada notifikasi
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
