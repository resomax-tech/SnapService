"use client";
import axios from "axios";
import Step1 from "@/components/bookingfolder/Step1";
import Step2 from "@/components/bookingfolder/Step2";
import Step3 from "@/components/bookingfolder/Step3";
import SignInModal from "./SignInModal";
import Loader from "./Preloader/Loader";
import { useAuth } from "@/lib/authContext";
import { useBooking } from "@/lib/bookingContext";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
export default function BookingForm({ step, setStep }) {
  const { isLoggedIn, loading } = useAuth();
  const { id } = useParams();
  const router = useRouter()
  const { bookingData, updateBooking } = useBooking();

  const handleSubmit = async () => {
    try {

      if (!bookingData.community || !bookingData.plan || !bookingData.dates?.length) {
        alert("Please complete all booking details before continuing.");
        return;
      }

      const subscriptionDetails = {
        community: bookingData.community._id,
        plan: bookingData.plan.key,
        startDate: bookingData.dates[0],
        bookedDates: bookingData.dates,
        bathrooms: bookingData.bathrooms,
        flatNo: bookingData.flat,
        message: bookingData.message,
        totalPrice: bookingData.plan.price * bookingData.bathrooms,
        status: 'active'
      }

      const response = await axios.post("/api/subscription", subscriptionDetails, {
        withCredentials: true,
      });

      console.log(response.data)

      router.push('/customer/paymentconfirm')
    } catch (error) {
      console.log("error: ", error.message);
      alert("Something Wrong")
    }
  }


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
      {step === 3 && <Step3 prevStep={prevStep} handleSubmit={handleSubmit} />}
    </div>
  );
}
