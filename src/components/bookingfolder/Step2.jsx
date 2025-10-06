"use client";
import { useState } from "react";

export default function Step2({ formData, setFormData, nextStep, prevStep }) {
  const [errors, setErrors] = useState({});

  // ✅ Validation
  const validate = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!formData.community) newErrors.community = "Community is required";
    if (!formData.flat) newErrors.flat = "Flat/Door No. is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Next Step
  const handleNext = () => {
    if (validate()) nextStep();
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h3 className="font-semibold text-lg mb-2">Booking Information</h3>

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border p-2 rounded w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={formData.email || ""}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
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
            value={formData.phone || ""}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        {/* Community */}
        <div>
          <label className="block mb-1 font-medium">Community</label>
          <input
            type="text"
            value={formData.community || ""}
            onChange={(e) =>
              setFormData({ ...formData, community: e.target.value })
            }
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
            value={formData.flat || ""}
            onChange={(e) => setFormData({ ...formData, flat: e.target.value })}
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
            value={formData.message || ""}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
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
