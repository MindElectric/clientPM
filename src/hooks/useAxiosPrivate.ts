import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAuth } from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                //First attempt
                if (!config.headers['authorization']) {
                    config.headers['authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                // Token expired
                const prevRequest = error?.config;
                // try one more time if fail
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true
                    const newAccessToken = await refresh();
                    prevRequest.headers['authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest)
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }

    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;