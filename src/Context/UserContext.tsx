import IUser from '@/Interfaces/Auth'
import React, { createContext, useState, SetStateAction } from 'react'
import { Dispatch } from 'react';

type UserContextType = {
    user: IUser | null;
    setUser: Dispatch<SetStateAction<IUser | null>>
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export default function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
