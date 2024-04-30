import axios from "axios"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { UserSchema, UsersSchema, createUserSchema, updateUserSchema } from "../types/tUsers"
import { UpdateUserFields, UserFields, user } from "../types"
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




export async function getUserById(id: user['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/usuario/${id}`
        const { data } = await axios(url)
        const result = UserSchema.safeParse(data.data)

        if (result.success) {
            return result.data
        } else {
            throw new Error("Hubo un error")
        }

    } catch (error) {
        console.log(error)
    }
}


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
};

export function useUpdateUser() {
    const axiosPrivate = useAxiosPrivate();

    return async function updateUser(id: number, data: UpdateUserFields) {
        console.log("Updating user")
        try {
            const url = `${import.meta.env.VITE_API_URL}/api/usuario/${id}`
            const result = updateUserSchema.safeParse(data)

            if (result.success) {
                await axiosPrivate.put(url, {
                    username: result.data.username,
                    //password: result.data.password,
                    id_rol: result.data.id_rol?.value,
                    id_area: result.data.id_area?.value,
                    isActive: true
                })
            }

        } catch (error) {
            console.log(error)
        }
    }
}


export function useChangeActiveUser() {
    const axiosPrivate = useAxiosPrivate()

    return async function changeActiveUser(id: user['id']) {
        try {
            const url = `${import.meta.env.VITE_API_URL}/api/usuario/${id}`
            await axiosPrivate.patch(url)
        } catch (error) {

        }
    }
}