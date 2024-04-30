//import { axiosPrivate } from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { NotificationResponseSchema } from "../types/tNotifications";


export function useGetNotifications() {
    const axiosPrivate = useAxiosPrivate()

    return async function getNotifications(page = 1, limit = 20,
        //search = ''
    ) {
        const url = `${import.meta.env.VITE_API_URL}/api/notifications?page=${page}&limit=${limit}`
        const { data, headers } = await axiosPrivate(url);
        const result = NotificationResponseSchema.safeParse(data)
        if (result.success) {
            const totalCount = parseInt(headers['x-total-count']);
            const pageCount = Math.ceil(totalCount / limit)
            return { data: result.data, pageCount };
        }
    }
}

// async function addNotification(data : any) {
//     try {
//     const result = NotificationSchema.safeParse(data)

//     if(result.success){
//         const url = `${import.meta.env.VITE_API_URL}/api/notifications`;

//         await axiosPrivate.post(url, {
            
//         })

//     }
        
//     } catch (error) {
        
//     }
// }