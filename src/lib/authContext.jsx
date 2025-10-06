"use client"

import axios from "axios";
import { useBooking } from "./bookingContext";
import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { bookingData, updateBooking } = useBooking();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get('/api/auth/profile', { withCredentials: true })
                if (response.data.user) {
                    setIsLoggedIn(true)
                    setUser(response.data.user)
                    updateBooking({ user: response.data.user })
                }
            } catch (error) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        getUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading, isLoggedIn, setUser, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )

}

export function useAuth() {
    return useContext(AuthContext);
}