"use client";

import { useRouter } from "next/navigation";
import Loader from "@/components/Preloader/Loader";
import axios from "axios";
import { LogoutAlert } from "@/components/alerts/LogoutAlert";
import Avatar from "boring-avatars";
import { CreditCard, Repeat, LogOut } from "lucide-react"; // icons
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useBooking } from "@/lib/bookingContext";
import { useAuth } from "@/lib/authContext";


export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, setUser, setIsLoggedIn } = useAuth()
  const { updateBooking } = useBooking()

  const logout = async () => {
    try {
      const response = await axios.post('/api/auth/logout', {}, { withCredentials: true })
      setUser(null)
      setIsLoggedIn(false)
      updateBooking({ user: null })
      router.push("/")
    } catch (error) {
      console.log("Error", error.message);
    }
  }

  if (loading) return <Loader />


  return (
    <div className="max-w-md mx-auto bg-gray-50 p-6">
      {/* Top: Avatar + Name */}
      <div className="flex flex-col items-center gap-4 ">
        {/* <Avatar
          size={72}
          name="John Doe" // replace with user.name
          variant="beam"
          className="border-4 border-gray-300 shadow rounded-full"
          colors={["#FFB22C", "#F4A300", "#146A7C", "#92A1C6", "#C20D90"]}
        /> */}
        <img className="h-24 w-24 rounded-full shadow border-4 border-gray-200 outline-1 outline-gray-300 p-1" src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="profile" />
        <div className="flex flex-col items-center mt-2 space-y-1">
          <h2 className="text-xl font-semibold text-gray-700">{user?.name}</h2>
          <button
            onClick={() => router.push(`/customer/account/profile/edit/`)}
            className="mt-1 text-sm px-3 py-1 bg-[#3D8D7A] text-white rounded-md"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Current Plan */}
      <div className="mt-6 p-4 bg-white rounded-md shadow">
        <h3 className="font-semibold text-gray-800">Current Plan</h3>
        <p className="text-sm text-gray-500">Classic Bathroom Cleaning - 4 Week</p>
        <p className="mt-2 text-green-600 font-semibold">
          Active · Valid till 30 Oct 2025
        </p>
      </div>

      {/* Options List */}
      <div className="mt-4 bg-white rounded-md space-y-0.5 shadow">
        {/* Transactions */}
        <button
          onClick={() => router.push("/customer/account/transactions")}
          className="w-full flex items-center justify-between border-b border-b-gray-200 px-4 py-3 hover:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <CreditCard size={18} className="text-gray-600" />
            <span className="text-black">Transactions</span>
          </div>
          <span className="text-gray-400">›</span>
        </button>

        {/* Subscriptions */}
        <button
          onClick={() => router.push("/customer/account/subscriptions")}
          className="w-full flex items-center justify-between border-b border-b-gray-200 px-4 py-3 hover:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <Repeat size={18} className="text-gray-600" />
            <span className="text-black">Subscriptions</span>
          </div>
          <span className="text-gray-400">›</span>
        </button>

        {/* About Us */}
        <button
          onClick={() => router.push("/customer/account/subscriptions")}
          className="w-full flex items-center justify-between border-b border-b-gray-200 px-4 py-3 hover:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <IoMdInformationCircleOutline size={18} className="text-gray-600" />
            <span className="text-black">About Us</span>
          </div>
          <span className="text-gray-400">›</span>
        </button>


        {/* Logout */}
        <button
          onClick={() => LogoutAlert(logout)}
          className=" w-full flex items-center gap-4 px-4 py-3  rounded-md font-medium hover:bg-red-50"
        >
          <div className="flex items-center space-x-3">
            <LogOut size={18} className="text-[#e11c48]" />
            <span className="text-[#e11c48]">Log Out</span>
          </div>
        </button>

      </div>

      <div className="flex justify-center mt-6">

      </div>
    </div>
  );
}
