"use client";

import { useAuth } from "@/lib/authContext";
import Loader from "@/components/Preloader/Loader";
import GuestAccount from "@/components/GuestAccount";
import ProfilePage from "./profile/page";

export default function AccountPage() {
  const {loading, isLoggedIn } = useAuth()

  if (loading) return <Loader/>

  if (!isLoggedIn) return <GuestAccount />

  return (
    <ProfilePage />
  );
}
