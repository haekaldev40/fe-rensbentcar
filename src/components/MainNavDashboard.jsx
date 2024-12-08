import { useState } from 'react';
import { useLogout } from '../hooks/useLogout';
import { FaAngleDown } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import avatarUser from '../assets/images/avatar.png';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

export function MainNavDashboard({ className = '' }) {
    const { user } = useAuthContext();
    const [isOpen, setIsOpen] = useState(false);
    const { logoutUser } = useLogout();
    const navigate = useNavigate()

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        logoutUser();
        setIsOpen(false);
        navigate('/')
    };

    return (
        <div className=" p-4 flex justify-between items-center border-b">
            <div>
            </div>
            <div className={`relative mr-2 ${className}`}>
                <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
                <p className='mr-4 font-mono text-lg'>Welcome, {user.data.name}</p>
                    <img src={avatarUser} alt="Profile" className="w-10 h-10 rounded-full mr-2 mt-1" />
                    <FaAngleDown  />
                </button>
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                        <div className="py-2 flex items-center mx-4">
                            <MdLogout size={20} />
                            <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MainNavDashboard;
