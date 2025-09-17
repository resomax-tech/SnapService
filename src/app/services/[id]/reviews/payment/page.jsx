"use client";
import { useEffect, useState } from "react";
import {  useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const [bookingDate, setBookingDate] = useState("");
  const [bookingInfo, setBookingInfo] = useState({});
  const [serviceId, setServiceId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("RazorPay");

  useEffect(() => {
    setMounted(true);
    setBookingDate(localStorage.getItem("bookingDate") || "");
    setServiceId(localStorage.getItem("selectedServiceId") || "");
    const storedBookingInfo = localStorage.getItem("bookingInfo");
    if (storedBookingInfo) setBookingInfo(JSON.parse(storedBookingInfo));
  }, []);

  if (!mounted) return null;

  const subtotal = 900;
  const sgst = subtotal * 0.09;
  const total = subtotal + sgst;

  const handlePayment = () => {
  // ✅ Create a new booking object
  const newBooking = {
    id: Date.now(), // unique id
    serviceId,
    bookingDate,
    bookingInfo,
    amount: total,
    paymentMethod,
  };

  // ✅ Save booking to localStorage
  const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
  existing.push(newBooking);
  localStorage.setItem("bookings", JSON.stringify(existing));

  alert(`Payment of Rs. ${total} via ${paymentMethod} successful!`);

  // ✅ Redirect after saving booking
  router.push("/bookings"); // redirect to bookings page
};
  return (
    <div className="min-h-screen bg-white px-4 py-6 flex flex-col">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <span className="text-yellow-500">Home</span> &gt;{" "}
        <span>Service Details</span> &gt;{" "}
        <span className="font-semibold">Payment</span>
      </nav>

      <h1 className="text-2xl font-bold mb-6">Confirm Your Booking</h1>

      {/* Service Info */}
      <div className="bg-gray-100 p-5 rounded-xl shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-2">{serviceId} Service</h2>
        <p className="text-2xl font-semibold mb-2 ml-30">Rs. 900 Per Month</p>
        <p className="text-green-600 text-sm ml-40">Exclusive of all taxes</p>
      </div>

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
          <div className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full font-bold">
            2
          </div>
          <span className="text-xs mt-1 text-gray-400">Booking Info</span>
        </div>
        <div className="flex-1 h-1 bg-gray-300 mx-2"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 flex items-center justify-center bg-[#dba144] text-white rounded-full font-bold">
            3
          </div>
          <span className="text-xs mt-1">Payment</span>
        </div>
      </div>

      {/* Booking Summary */}
      <div className="bg-gray-50 p-5 rounded-xl shadow-md mb-6 space-y-3">
        <div>
          <p className="font-semibold">Date & Time</p>
          <p className="text-gray-600">{bookingDate}</p>
        </div>
        <div>
          <p className="font-semibold">Location</p>
          <p className="text-gray-600">{bookingInfo.address || "N/A"}</p>
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-gray-50 p-5 rounded-xl shadow-md mb-6">
        <h2 className="font-bold mb-3">Price Summary</h2>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>SGST</span>
          <span>₹{sgst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-green-600">
          <span>Total Amount</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Type */}
      <div className="bg-gray-50 p-5 rounded-xl shadow-md mb-6">
        <h2 className="font-bold mb-3">Payment Type</h2>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="payment"
            value="RazorPay"
            checked={paymentMethod === "RazorPay"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>RazorPay</span>
        </label>
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
          className="bg-[#dba144] text-white py-2 px-6 rounded-lg font-semibold"
          onClick={handlePayment}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
