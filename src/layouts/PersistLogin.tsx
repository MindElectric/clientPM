import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import useRefreshToken from "../hooks/useRefreshToken"
import { useAuth } from "../hooks/useAuth"

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const auth = useAuth()

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.error(error);
            }
            finally {
                setIsLoading(false);
            }
        }

        !auth?.auth.accessToken ? verifyRefreshToken() : setIsLoading(false);

    }, [])


    //Test purposes
    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.auth.accessToken)}`)
    }, [isLoading])

    return (
        <>
            {isLoading ? <p>Loading...</p>
                :
                <Outlet />
            }
        </>
    )

}

export default PersistLogin;