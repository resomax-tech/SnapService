"use client";

export default function Step2({ formData, setFormData, nextStep, prevStep }) {
  const isValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.community &&
    formData.flat;

  return (
    <div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Booking Information</h3>

        <input
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          className="border p-2 rounded w-full mb-2"
        />

        <input
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          className="border p-2 rounded w-full mb-2"
        />

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          className="border p-2 rounded w-full mb-2"
        />

        <input
          placeholder="Community"
          value={formData.community}
          onChange={(e) =>
            setFormData({ ...formData, community: e.target.value })
          }
          className="border p-2 rounded w-full mb-2"
        />

        <input
          placeholder="Enter Flat/Door No:"
          value={formData.flat}
          onChange={(e) =>
            setFormData({ ...formData, flat: e.target.value })
          }
          className="border p-2 rounded w-full mb-2"
        />

        <textarea
          placeholder="Any Message"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="border p-2 rounded w-full mb-2"
          rows={3}
        />
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Back
        </button>

        <button
          disabled={!isValid}
          onClick={nextStep}
          className="bg-yellow-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
