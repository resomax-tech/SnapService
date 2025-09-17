"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ConfirmPage() {
  const router = useRouter();
  const { id } = useParams();
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    pincode: "",
    landmark: "",
    address: "",
    message: "",
  });

  const [serviceId, setServiceId] = useState("");

  useEffect(() => {
    setMounted(true);
    const storedServiceId = localStorage.getItem("selectedServiceId");
    if (storedServiceId) setServiceId(storedServiceId);
  }, []);

  if (!mounted) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    const { firstName, lastName, pincode, address } = formData;
    if (!firstName || !lastName || !pincode || !address) {
      alert("Please fill all required fields.");
      return;
    }
    localStorage.setItem("bookingInfo", JSON.stringify(formData));
    router.push(`/services/${id}/reviews/payment`); // fixed
  };

  return (
    <div className="min-h-screen bg-white px-4 py-6 flex flex-col">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <span className="text-yellow-500">Home</span> &gt;{" "}
        <span>Service Details</span> &gt;{" "}
        <span className="font-semibold">Booking Info</span>
      </nav>

      {/* Service Info */}
      <div className="bg-gray-100 p-5 rounded-xl shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-3">
          {serviceId || "Selected"} Service
        </h2>
        <p className="text-2xl font-semibold mb-2 ml-30">Rs. 900 Per Month</p>
        <p className="text-green-600 text-sm ml-40">Exclusive of all taxes</p>
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-bold mb-6">Booking Information</h1>

      {/* Stepper */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full font-bold">
            1
          </div>
          <span className="text-xs mt-1 text-gray-400">Review</span>
        </div>
        <div className="flex-1 h-1 bg-gray-300 mx-2"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 flex items-center justify-center bg-[#dba144] text-white rounded-full font-bold">
            2
          </div>
          <span className="text-xs mt-1">Booking Info</span>
        </div>
        <div className="flex-1 h-1 bg-gray-300 mx-2"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full font-bold">
            3
          </div>
          <span className="text-xs mt-1 text-gray-400">Payment</span>
        </div>
      </div>

      {/* Form */}
      <div className="bg-gray-50 p-5 rounded-xl shadow-md space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-lg"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-lg"
          />
        </div>

        {/* Pincode */}
        <div>
          <label className="block text-sm font-medium">
            Pincode <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-lg"
          />
        </div>

        {/* Landmark */}
        <div>
          <label className="block text-sm font-medium">
            Landmark
          </label>
          <input
            type="text"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-lg"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="2"
            className="w-full mt-1 px-3 py-2 border rounded-lg"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="2"
            className="w-full mt-1 px-3 py-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg font-semibold"
          onClick={() => router.back()}
        >
          Previous
        </button>
        <button
          className="bg-[#dab144] text-white py-2 px-6 rounded-lg font-semibold"
          onClick={handleNext}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
