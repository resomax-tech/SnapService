"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const router = useRouter();

  // Example initial values (replace with data from API)
  const [name, setName] = useState("John Doe");
  const [gender, setGender] = useState("Male");
  const [phone, setPhone] = useState("+91 9876543210");
  const [email, setEmail] = useState("john@gmail.com");


  const handleSave = (e) => {
    e.preventDefault();
    // TODO: Call your API to update user
    console.log({ name, gender, phone });
    router.push("/customer/account/profile"); // redirect back to profile
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => router.back()} className="text-gray-600">← Back</button>
        <h2 className="font-semibold text-lg">Edit Profile</h2>
        <button onClick={handleSave} className="text-green-600 font-medium">Save</button>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="space-y-5">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border px-3 py-2 rounded-md text-sm"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border px-3 py-2 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            type="tel"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded-md text-sm"
          />
        </div>


        <button
          type="submit"
          className="w-full mt-4 bg-green-600 text-white py-2 rounded-md font-medium"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
