"use client"
import { useState, useContext, useEffect, createContext } from "react";

const BookingContext = createContext()

export function BookingProvider({ children }) {
    const [bookingData, setBookingData] = useState({
        community: null,
        message: null,
        plan: null,
        dates: [],
        bathrooms: null,
        flat: null,
        user: null,
        totalPrice: null
    });

    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        if (!isLoaded) return;
        if (!bookingData.user && !bookingData.community && !bookingData.plan) {
            localStorage.removeItem("bookingData");
            return;
        }
        localStorage.setItem("bookingData", JSON.stringify(bookingData));
    }, [bookingData, isLoaded]);


    useEffect(() => {
        const stored = localStorage.getItem("bookingData")

        if (stored) {
            setBookingData(JSON.parse(stored))
        }
        setIsLoaded(true)
    }, [])


    const updateBooking = (updates) => {
        setBookingData((prev) => ({ ...prev, ...updates }))
        // console.log(bookingData);  // remove for testing 
    }

    const resetBooking = () => {
        setBookingData({
            community: null,
            message: null,
            plan: null,
            dates: [],
            bathrooms: null,
            flat: null,
        });
        localStorage.removeItem("bookingData");
    };


    return (
        <BookingContext.Provider value={{ bookingData, updateBooking, resetBooking }}>
            {children}
        </BookingContext.Provider>
    )
}

export const useBooking = () => useContext(BookingContext)