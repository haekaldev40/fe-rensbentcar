import { NavLink } from 'react-router-dom';
import logoBens from '../assets/images/logobens.png';
import { FaCar } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { MdPayment } from "react-icons/md";
import { PiKeyReturnFill } from "react-icons/pi";


export function Sidebar() {
    return (
        <>
            <div className="w-60 border border-gray-200 h-screen">
                <div className="flex justify-center mt-[-30px]">
                    <img src={logoBens} className='w-45 h-30' />
                </div>
                <ul>
                    <li className='mb-2'>
                        <NavLink
                            to='/dashboard'
                            className={({ isActive }) => 
                                isActive ? 'flex items-center p-4 bg-gray-100' : 'flex items-center p-4'
                            }
                        >
                            <MdDashboard className='text-2xl mx-6' />
                            <span className='text-sm'>Dashboard</span>
                        </NavLink>
                    </li>
                    
                    <li className='mb-2'>
                        <NavLink
                            to='/datamobil'
                            className={({ isActive }) => 
                                isActive ? 'flex items-center p-4 bg-gray-100' : 'flex items-center p-4'
                            }
                        >
                            <FaCar className='text-2xl mx-6' />
                            <span className='text-sm text-gray-800'>Data Mobil</span>
                        </NavLink>
                    </li>
                    <li className='mb-2'>
                        <NavLink
                            to='/datapengembalian'
                            className={({ isActive }) => 
                                isActive ? 'flex items-center p-4 bg-gray-100' : 'flex items-center p-4'
                            }
                        >
                            <PiKeyReturnFill className='text-2xl mx-6' />
                            <span className='text-sm text-gray-800'>Data Pengembalian</span>
                        </NavLink>
                    </li>
                    <li className='mb-2'>
                        <NavLink
                            to='/datapayment'
                            className={({ isActive }) => 
                                isActive ? 'flex items-center p-4 bg-gray-100' : 'flex items-center p-4'
                            }
                        >
                            <MdPayment className='text-2xl mx-6' />
                            <span className='text-sm text-gray-800'>Data Payment</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/datalaporan'
                            className={({ isActive }) => 
                                isActive ? 'flex items-center p-4 bg-gray-100' : 'flex items-center p-4'
                            }
                        >
                            <TbReportSearch className='text-2xl mx-6' />
                            <span className='text-sm text-gray-800'>Data Laporan</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    );
}
