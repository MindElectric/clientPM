import axios from "axios"


export const loginRequest = async (username: string, password: string) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/login`
        return axios.post(url, {
            username,
            password
        },
            { withCredentials: true }
        )
    } catch (error) {
        console.log("Error")
    }
} 