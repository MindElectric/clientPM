import axios from "axios"
import { useAuth } from "./useAuth"

const useRefreshToken = () => {
    const { setAuth } = useAuth()

    const refresh = async () => {
        const url = `${import.meta.env.VITE_API_URL}/api/refresh`
        const response = await axios.get(url, {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev))
            console.log("AccessToken:", response.data.accessToken)
            return {
                ...prev,
                user: {
                    id: response.data.userId,
                    username: response.data.username,
                    rol: response.data.rol,
                },
                accessToken: response.data.accessToken
            }
        });
        return response.data.accessToken;
    }

    return refresh;
}

export default useRefreshToken
