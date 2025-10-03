"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "@/lib/authContext";

export default function EditProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || ""
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        mobile: user.mobile || "",
        email: user.email || ""
      }))
    }
  }, [user])



  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch('/api/auth/profile', formData, { withCredentials: true })      
      setUser(prev => ({ ...prev, ...response.data.updated }));

    } catch (error) {
      console.log(error.message);
    }
    router.push("/customer/account/profile"); // redirect back to profile
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center gap-10 mb-6">
        <button onClick={() => router.back()} className="flex items-center text-gray-600">
          <ChevronLeft className="h-8" />
          Back</button>
        <h2 className="font-semibold text-lg">Edit Profile</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="space-y-5">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border px-3 py-2 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Phone</label>
          <input
            type="tel"
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border px-3 py-2 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border px-3 py-2 rounded-md text-sm"
          />
        </div>


        <button
          type="submit"
          className="w-full mt-4 bg-[#3D8D7A] text-white py-2 rounded-md font-medium"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
