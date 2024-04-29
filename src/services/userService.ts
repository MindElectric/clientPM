import axios from "axios"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { UsersSchema, createUserSchema } from "../types/tUsers"
import { UserFields } from "../types"
import { toast } from "react-toastify"


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

export function useGetUsers() {
    const axiosPrivate = useAxiosPrivate()

    return async function getUsers() {
        const url = `${import.meta.env.VITE_API_URL}/api/usuario`
        const { data } = await axiosPrivate(url);
        const result = UsersSchema.safeParse(data);
        if (result.success) {
            return { data: result.data }
        }

    }
};

export function useAddUser() {
    const axiosPrivate = useAxiosPrivate()

    return async function addUser(data: UserFields) {
        try {
            const result = createUserSchema.safeParse(data)

            console.log(result);
            console.log(result.success)

            if (result.success) {
                const url = `${import.meta.env.VITE_API_URL}/api/usuario`
                await axiosPrivate.post(url, {
                    username: result.data.username,
                    password: result.data.password,
                    id_rol: result.data.id_rol?.value,
                    id_area: result.data.id_area?.value,
                    isActive: true
                })
                toast.success("Usuario agregado correctamente")
            }
        } catch (error) {
            toast.error("Hay problemas con el servidor")
            console.log(error)
        }
    }
}