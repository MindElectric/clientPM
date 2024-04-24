// import axios from "../api/axios"
import axios from "axios";
import { useAuth } from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth()

    const logout = async () => {
        setAuth(undefined);

        try {
            const url = `${import.meta.env.VITE_API_URL}/logout`
            await axios(url, {
                withCredentials: true
            });
        } catch (error) {
            console.error(error)
        }
    }

    return logout;
}

export default useLogout;