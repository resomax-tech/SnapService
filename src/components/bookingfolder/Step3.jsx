"use client";

export default function Step3({ formData, prevStep, handleSubmit }) {
  return (
    <div>
    

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Confirm Your Booking</h3>
        <p>
          <b>Date:</b> {formData.date}
        </p>
        <p>
          <b>Name:</b> {formData.firstName} {formData.lastName}
        </p>
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={prevStep} className="bg-gray-300 px-4 py-2 rounded">
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
