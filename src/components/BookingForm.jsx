"use client";

import { useState, useEffect } from "react";

import StepIndicator from "@/components/bookingfolder/StepIndicator";
import Step1 from "@/components/bookingfolder/Step1";
import Step2 from "@/components/bookingfolder/Step2";
import Step3 from "@/components/bookingfolder/Step3";
import { useBooking } from "@/lib/bookingContext";


export default function BookingForm() {
  const [step, setStep] = useState(1);
  const { bookingData, updateBooking } = useBooking();

  const [formData, setFormData] = useState({
    date: "",
    name: "",
    email: "",
    mobile: "",
    flat: "",
    message: "",
    community: bookingData.community?.name || ""
  });

  useEffect(() => {
    if (bookingData.user) {
      setFormData((prev) => ({
        ...prev,
        name: bookingData.user.name || "",
        mobile: bookingData.user.mobile || "",
        email: bookingData.user.email || ""

      }))
    }
  }, [bookingData.user]);


  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = () => {
    console.log("Form Confirmed:", formData);

    updateBooking({
      ...bookingData,
      date: formData.date,
      address: formData.flat,
      message: formData.message,
      user: {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
      },
    })
    // alert("Booking Confirmed!");
  };

  useEffect(() => {
    console.log("BookingData updated:", bookingData);
  }, [bookingData]);


  return (
    <div>
      {/* Step Indicator */}
      <StepIndicator step={step} />

      {/* Steps */}
      {step === 1 && (
        <Step1 formData={formData} setFormData={setFormData} nextStep={nextStep} />
      )}
      {step === 2 && (
        <Step2
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <Step3
          formData={formData}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}




