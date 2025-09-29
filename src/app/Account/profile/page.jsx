"use client";

import { useRouter } from "next/navigation";
import Avatar from "boring-avatars";
import { CreditCard, Repeat } from "lucide-react"; // icons
import { IoMdInformationCircleOutline } from "react-icons/io";


export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen p-6">
      {/* Top: Avatar + Name */}
      <div className="flex items-center space-x-4">
        <Avatar
          size={64}
          name="John Doe" // replace with user.name
          variant="beam"
          colors={["#FFB22C", "#F4A300", "#146A7C", "#92A1C6", "#C20D90"]}
        />
        <div>
          <h2 className="text-lg font-semibold">John Doe</h2>
          <button
            onClick={() => router.push("/account/profile/edit")}
            className="mt-1 text-sm px-3 py-1 bg-green-600 text-white rounded-md"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Current Plan */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow">
        <h3 className="font-semibold text-gray-800">Current Plan</h3>
        <p className="text-sm text-gray-500">Premium Bathroom Cleaning</p>
        <p className="mt-2 text-green-600 font-medium">
          Active · Valid till 30 Oct 2025
        </p>
      </div>

      {/* Options List */}
      <div className="mt-6 ">
        {/* Transactions */}
        <button
          onClick={() => router.push("/account/transactions")}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <CreditCard size={18} className="text-gray-600" />
            <span className="text-black">Transactions</span>
          </div>
          <span className="text-gray-400">›</span>
        </button>

        {/* Subscriptions */}
        <button
          onClick={() => router.push("/account/subscriptions")}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <Repeat size={18} className="text-gray-600" />
            <span className="text-black">Subscriptions</span>
          </div>
          <span className="text-gray-400">›</span>
        </button>

        {/* About Us */}
        <button
          onClick={() => router.push("/account/subscriptions")}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <IoMdInformationCircleOutline size={18} className="text-gray-600" />
            <span className="text-black">About Us</span>
          </div>
          <span className="text-gray-400">›</span>
        </button>
 
      </div>

      {/* Logout */}
      <div className="flex justify-start mt-10">
        <button
          onClick={() => router.push("/account/logout")}
          className="px-6 py-2 text-white bg-red-500 rounded-lg font-medium hover:bg-red-50"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
