import { useEffect } from "react"

import { useGetNotifications } from "../services/notificationService"
import { useNotificationsStore } from "../store/store"

import { useNavigate } from "react-router-dom"
import ReactPaginate from "react-paginate"

import AgregarCard from "../Components/HistoryComp/AgregarCard"
import UpdateCard from "../Components/HistoryComp/UpdateCard"
import DeleteCard from "../Components/HistoryComp/DeleteCard"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"


const Historial = () => {
    const navigate = useNavigate()

    const getNotifications = useGetNotifications()
    const setNotifications = useNotificationsStore((state) => state.setNotifications)
    const notifications = useNotificationsStore((state) => state.notifications)

    const setPageCount = useNotificationsStore((state) => state.setPageCount)
    const pageCount = useNotificationsStore((state) => state.pageCount)

    // const handlePageChange = (data: Data) => {
    //     setPage(data.selected + 1) // Subir mas uno para igualar a la propiedad next/previous
    // }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getNotifications();
                setNotifications(response?.data);
                setPageCount(response?.pageCount)
                console.log(response)
            } catch (err) {
                navigate('/', { state: { from: location }, replace: true });
            }
        }
        fetchData()
    }, []);
    return (
        <>
            <div>
                <ReactPaginate
                    previousLabel={<FaChevronLeft size={15}

                    />}
                    nextLabel={<FaChevronRight size={15}
                    // onClick={() => setPage(page + 1)}
                    />}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={3}
                    pageRangeDisplayed={3}
                    // onPageChange={handlePageChange}
                    containerClassName={"flex items-center"}
                    pageClassName={"page"}
                    pageLinkClassName="text-xs font-bold"
                    previousClassName="mr-4"
                    nextClassName="ml-4"
                    breakClassName="text-lg mx-3"
                    activeClassName={"active"}
                />
            </div>
            {notifications?.data.sort((a, b) => b.id - a.id).map(notif => notif.type == "add" ? (
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
