"use client";
import { useState } from "react";
import { useBooking } from "@/lib/bookingContext";

export default function Step2({ nextStep, prevStep }) {
  const [errors, setErrors] = useState({});
  const { bookingData, updateBooking } = useBooking()
  const validate = () => {
    let newErrors = {};

    if (!bookingData.user.name) newErrors.name = "Name is required";
    if (!bookingData.user.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(bookingData.user.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!bookingData.user.mobile) {
      newErrors.mobile = "mobile number is required";
    } else if (!/^[0-9]{10}$/.test(bookingData.user.mobile)) {
      newErrors.mobile = "Phone must be 10 digits";
    }

    if (!bookingData.community) newErrors.community = "Community is required";
    if (!bookingData.flat) newErrors.flat = "Flat/Door No. is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      updateBooking({
        totalPrice: bookingData?.plan?.price * bookingData?.bathrooms 
      })
      nextStep();
    }
  };

  return (
    <div>
      <div className="bg-gray-50 p-6 rounded-lg shadow space-y-4">
        <h3 className="font-semibold text-lg mb-2">Booking Information</h3>

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            value={bookingData.user.name || ""}
            onChange={(e) => updateBooking({ user: { ...bookingData.user, name: e.target.value } })}
            className="border p-2 rounded w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={bookingData.user.email || ""}
            onChange={(e) => updateBooking({ user: { ...bookingData.user, email: e.target.value } })}

            className="border p-2 rounded w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            type="tel"
            value={bookingData.user.mobile || ""}
            onChange={(e) => updateBooking({ user: { ...bookingData.user, mobile: e.target.value } })}
            className="border p-2 rounded w-full"
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm">{errors.mobile}</p>
          )}
        </div>

        {/* Community */}
        <div>
          <label className="block mb-1 font-medium">Community</label>
          <input
            type="text"
            value={bookingData.community.name || ""}
            onChange={(e) => updateBooking({ ...bookingData.community.name, community: e.target.value } )}

            className="border p-2 rounded w-full"
          />
          {errors.community && (
            <p className="text-red-500 text-sm">{errors.community}</p>
          )}
        </div>

        {/* Flat/Door No. */}
        <div>
          <label className="block mb-1 font-medium">Flat / Door No.</label>
          <input
            type="text"
            value={bookingData.flat || ""}
            onChange={(e) => updateBooking({ ...bookingData, flat: e.target.value })}
            className="border p-2 rounded w-full"
          />
          {errors.flat && (
            <p className="text-red-500 text-sm">{errors.flat}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block mb-1 font-medium">Message (Optional)</label>
          <textarea
            value={bookingData.message || ""}
            onChange={(e) =>
              updateBooking({ ...bookingData, message: e.target.value })
            }
            className="border p-2 rounded w-full"
            rows={3}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Back
        </button>

        <button
          onClick={handleNext}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}