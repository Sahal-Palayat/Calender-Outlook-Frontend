import axiosInstance from '@/Services/Axios';
import React, { createContext, useState, useEffect, SetStateAction } from 'react'

type LoadingContextType = {
    loading: boolean;
    setLoading: React.Dispatch<SetStateAction<boolean>>
}

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export default function LoadingProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        axiosInstance.interceptors.request.use(config => {
            setLoading(true)
            return config
        })
        axiosInstance.interceptors.request.use(config => {
            setLoading(false)
            return config
        })
    }, [])


    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}
