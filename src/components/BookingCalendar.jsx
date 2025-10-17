import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useState, useEffect } from "react";
import { normalizeLocalDate, toDateKey } from "@/lib/normalizeDate";

export const BookingCalendar = ({
    planType = "",
    onDatesSelected = () => { },
    availableDates = [],
    fetchDates
}) => {
    const [selected, setSelected] = useState([]);
    const today = new Date();

    // 🧩 Reset selection every time planType changes
    useEffect(() => {
        setSelected([]);
    }, [planType]);

    // Compute disabled days (Sundays, past, fully booked)
    const bookedDates =
        availableDates.filter((d) => d.fullBooked).map((d) => new Date(d.date)) || [];

    const disabledDays = [{ dayOfWeek: [0] }, { before: today }, ...bookedDates];

    // Handle selection logic
    const handleDateClick = (date) => {
        const selectedDate = normalizeLocalDate(date)
        const latestAvailable = normalizeLocalDate(availableDates.at(-15)?.date);

        if (!date) return;
        const plan = (planType || "").toUpperCase();
        const gap = plan.includes("4W") ? 7 : 14
        const occurrences = plan.includes("4W") ? 4 : 2

        const recurringDates = [];
        for (let i = 0; i < occurrences; i++) {
            const d = normalizeLocalDate(date)
            d.setDate(d.getDate() + i * gap);
            recurringDates.push(d);
        }
        setSelected(recurringDates);
        onDatesSelected(recurringDates);       

        if (selectedDate > latestAvailable) {        
            fetchDates(selectedDate)
        }
    };

    // Find slot info for each selected date
    const getSlotInfo = (date) => {
        const formatted = toDateKey(date)
        const day = availableDates.find((d) => d.date === formatted);

        if (!day) return "No data";
        if (day.fullBooked) return "Fully booked";
        return `${day.available}/${day.total} slots available`;
    };



    const getSlotColor = (day) => {
        if (day.fullBooked) return "text-red-500";
        if (day.available <= 2) return "text-yellow-600";
        return "text-green-600";
    };


    return (
        <div className="w-full flex flex-col items-center gap-2">
            <DayPicker
                key={planType} // ✅ forces remount when plan changes
                mode="multiple"
                onSelect={setSelected}
                selected={selected}
                onDayClick={handleDateClick}
                className="custom-calendar"
                disabled={disabledDays}
            />

            {selected?.length > 0 && (
                <div className="w-full mt-3 space-y-2">
                    <p className="font-semibold text-gray-700">Selected Schedule:</p>

                    {selected.map((d, i) => (
                        <div
                            key={i}
                            className="flex justify-between items-center px-4 py-2 border border-gray-500 rounded-md bg-gray-50 text-sm"
                        >
                            <span>📅 {toDateKey(d)}</span>
                            <span className={`font-medium ${getSlotColor(d)}`}>
                                {getSlotInfo(d)}
                            </span>

                        </div>
                    ))}
                </div>
            )}


        </div>
    );
};
