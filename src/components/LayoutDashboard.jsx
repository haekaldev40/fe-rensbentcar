import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Sidebar } from '../dashboard/Sidebar';
import {MainNavDashboard} from '../components/MainNavDashboard'


export function LayoutDashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <MainNavDashboard />
                <div className="p-6 flex-1 overflow-y-auto rounded-t-lg">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default LayoutDashboard;
