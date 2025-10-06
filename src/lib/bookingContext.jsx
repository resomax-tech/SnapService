"use client"
import { useState, useContext, createContext } from "react";

const BookingContext = createContext()

export function BookingProvider({children}) {
    const [bookingData, setBookingData] = useState({
        community: null,
        message: null,
        plan: null,
        dates: [],
        bathrooms: null,
        address: null,
        user: null
    });

    const updateBooking = (updates) => {
        setBookingData((prev) => ({ ...prev, ...updates }))
    }

    return (
        <BookingContext.Provider value={{ bookingData, updateBooking }}>
            {children}
        </BookingContext.Provider>
    )
}

export const useBooking = () => useContext(BookingContext)