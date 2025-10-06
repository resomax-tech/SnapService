"use client";

export default function Step3({ formData, prevStep, handleSubmit }) {
  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white p-6 rounded-lg shadow mb-4">
        <h3 className="text-xl font-semibold mb-4 text-center">Confirm Booking</h3>

        <p><b>Name:</b> {formData.firstName} {formData.lastName}</p>
        <p><b>Phone:</b> {formData.phone}</p>
        <p><b>Email:</b> {formData.email}</p>
        <p><b>Community:</b> {formData.community}</p>
        <p><b>Plan:</b> {formData.planId}</p>
        <p><b>Bathrooms:</b> {formData.bathrooms}</p>
        <p><b>Total Price:</b> ₹{formData.price}</p>
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="border px-4 py-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          className="border px-4 py-2 rounded"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
