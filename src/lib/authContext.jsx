"use client"

import axios from "axios";
import { useBooking } from "./bookingContext";
import { useContext, createContext, useState, useEffect, use } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { bookingData, updateBooking } = useBooking();
    const [loading, setLoading] = useState(true)

    const fetchUser = async () => {
        try {
            const response = await axios.get('/api/auth/profile', { withCredentials: true })
            const user = response.data.user
            if (user) {
                setIsLoggedIn(true)
                setUser(
                    {
                        name: user.name,
                        email: user.email,
                        mobile: user.mobile,
                        role: user.role
                    }
                )
                updateBooking({
                    user: {
                        name: user.name,
                        email: user.email,
                        mobile: user.mobile,
                    }
                })
            }
        } catch (error) {
            setIsLoggedIn(false)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    
    useEffect(() => {
        fetchUser()
    }, [])

    const refreshUser = async () => {
        setLoading(true)
        await fetchUser()
    }

    return (
        <AuthContext.Provider value={{ user, loading, isLoggedIn, setUser, setIsLoggedIn, refreshUser }}>
            {children}
        </AuthContext.Provider>
    )

}

export function useAuth() {
    return useContext(AuthContext);
}