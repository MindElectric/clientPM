import { useEffect } from "react"
import AgregarCard from "../Components/HistoryComp/AgregarCard"
import { useGetNotifications } from "../services/notificationService"
import { useNotificationsStore } from "../store/store"
import { useNavigate } from "react-router-dom"
import UpdateCard from "../Components/HistoryComp/UpdateCard"
import DeleteCard from "../Components/HistoryComp/DeleteCard"


const Historial = () => {
    const navigate = useNavigate()

    const getNotifications = useGetNotifications()
    const setNotifications = useNotificationsStore((state) => state.setNotifications)
    const notifications = useNotificationsStore((state) => state.notifications)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getNotifications();
                setNotifications(response?.data);

                console.log(response)
            } catch (err) {
                navigate('/', { state: { from: location }, replace: true });
            }
        }
        fetchData()
    }, []);
    return (
        <>
            {notifications?.data.map(notif => notif.type == "add" ? (
                <div className="p-5" key={notif.id}>

                    <AgregarCard
                        notification={notif}
                    />
                </div>
            )
                :
                notif.type == "update" ?
                    (
                        <div className="p-5" key={notif.id}>
                            <UpdateCard notification={notif} />
                        </div>
                    )
                    :
                    //Place delete card here 
                    (<div className="p-5" key={notif.id}>
                        <DeleteCard notification={notif} />
                    </div>)
            )}
        </>
    )
}

export default Historial
