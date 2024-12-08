import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
    const { dispatch } = useAuthContext();
    const registerUser = async (name, email, password) => {
        try {
            const response = await fetch('https://restapi-bensrentcar.vercel.app/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.message);
            }

            localStorage.setItem('user', JSON.stringify(json));
            dispatch({ type: 'LOGIN', payload: json });

        } catch (error) {
            console.error(error.message);
            throw new Error(error.message); 
        }
    };

    return { registerUser };
};
