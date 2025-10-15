"use client";
import Step1 from "@/components/bookingfolder/Step1";
import Step2 from "@/components/bookingfolder/Step2";
import Step3 from "@/components/bookingfolder/Step3";
import SignInModal from "./SignInModal";
import Loader from "./Preloader/Loader";
import { useAuth } from "@/lib/authContext";
import { useBooking } from "@/lib/bookingContext";
import { useParams } from "next/navigation";

export default function BookingForm({ step, setStep }) {
  const { isLoggedIn, loading } = useAuth();
  const { id } = useParams();
  const { bookingData, updateBooking } = useBooking();

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  if (loading) return <Loader />;

  if (!isLoggedIn) {
    return <SignInModal redirectTo={`/customer/services/${id}/community`} />;
  }

  return (
    <div>
      {step === 1 && <Step1 nextStep={nextStep} />}
      {step === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <Step3 prevStep={prevStep} />}
    </div>
  );
}
