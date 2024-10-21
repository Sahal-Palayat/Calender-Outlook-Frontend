import axiosInstance from '@/Services/Axios';
import Cookies from 'js-cookie';
import React, { createContext, useState, useEffect, SetStateAction, useContext } from 'react'
import { toast } from 'sonner';
import { UserContext } from './UserContext';

type LoadingContextType = {
    loading: boolean;
    setLoading: React.Dispatch<SetStateAction<boolean>>
}

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export default function LoadingProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(false)
    const context = useContext(UserContext)
    useEffect(() => {
        axiosInstance.interceptors.request.use(config => {
            setLoading(true)
            return config
        })
        axiosInstance.interceptors.response.use(config => {
            setLoading(false)
            if (config.status === 401) {
                if (Cookies.get("token")) {
                    toast.error("Session Expired")
                }
                Cookies.remove("token")
            }
            if (config.data.user) {
                context?.setUser(config.data.user)
            }
            return config
        })
    }, [])


    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}
