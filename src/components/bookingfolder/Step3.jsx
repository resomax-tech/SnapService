"use client";

export default function Step3({ formData, prevStep, handleSubmit }) {
  // Razorpay integration
  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const openRazorpay = async () => {
    const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_xxxxxxxx", // Replace with your Razorpay Key
      amount: formData.price * 100, // price in paisa
      currency: "INR",
      name: "SnapService",
      description: "Cleaning Service Payment",
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        handleSubmit(); // call your backend submit after payment
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone,
      },
      theme: { color: "#3399cc" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Main Card */}
      <div className="bg-white p-6 rounded-lg shadow mb-4">
        <h3 className="text-xl font-semibold mb-4 text-center">Confirm Your Booking</h3>

        {/* Customer Details */}
        <div className="space-y-2 mb-4">
          <p>
            <b>Customer Name:</b> {formData.firstName} {formData.lastName}
          </p>
          <p>
            <b>Phone No:</b> {formData.phone}
          </p>
          {/* Booking Dates */}
          <div>
            <b>Booking Dates:</b>
            <ul className="list-disc list-inside ml-4 mt-1">
              {Array.isArray(formData.date)
                ? formData.date.map((d, idx) => <li key={idx}>{d}</li>)
                : <li>{formData.date}</li>}
            </ul>
          </div>

          <p>
            <b>Community:</b> {formData.community}
          </p>
        </div>

        {/* Price Summary */}
        <div className="shadow-md container p-4 rounded-lg mb-4">
          <h4 className="font-semibold mb-2">Price Summary</h4>

          {/* Service Name */}
          <div className="flex justify-between mb-2">
            <span>Service:</span>
            <span>{formData.serviceName || "Cleaning Service"}</span>
          </div>

          {/* Bathrooms */}
          <div className="flex justify-between mb-2">
            <span>Bathrooms:</span>
            <span>
              {formData.bathrooms} × ₹500 = ₹{formData.bathrooms * 500}
            </span>
          </div>

          {/* Total */}
          <div className="flex justify-between font-bold border-t pt-2 mt-2">
            <span>Total:</span>
            <span>₹{formData.price || formData.bathrooms * 500}</span>
          </div>
        </div>

        {/* Payment Section */}
        <div className="flex flex-col">
          <h4 className="mb-3">Payment Method</h4>
          <button
            onClick={openRazorpay}
            className="w-full border border-gray-700  text-black py-2 rounded-lg"
          >
            Razorpay
          </button>
        </div>
      </div>

      {/* Navigation Buttons - Outside the Card */}
      <div className="flex justify-between max-w-lg mx-auto mt-4">
        <button
          onClick={prevStep}
          className="border border-gray-400 px-4 py-2 rounded  "
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          className="border border-gray-400 px-4 py-2 rounded "
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
