import { useAuthContext } from "./useAuthContext";
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const logoutUser = () => {
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
        navigate('/'); // Navigate to login page after logging out
    };

    return { logoutUser };
};
