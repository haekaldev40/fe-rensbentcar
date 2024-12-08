import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const { dispatch } = useAuthContext();
    const loginUser = async (email, password) => {
        try {
            const response = await fetch('https://restapi-bensrentcar.vercel.app/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.message);
            }

            localStorage.setItem('user', JSON.stringify(json));
            dispatch({ type: 'LOGIN', payload: json });

            return json;

        } catch (error) {
            console.error(error.message);
            throw new Error(error.message); 
        }
    };

    return { loginUser };
};
