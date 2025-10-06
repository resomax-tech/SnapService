"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import StepIndicator from "./bookingfolder/StepIndicator";
import Step1 from "./bookingfolder/Step1";
import Step2 from "./bookingfolder/Step2";
import Step3 from "./bookingfolder/Step3";

export default function BookingForm() {
  const searchParams = useSearchParams();
  const communityParam = searchParams.get("community") || "";
  const planParam = searchParams.get("plan") || "";
  const bathroomsParam = parseInt(searchParams.get("bathrooms")) || 1;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    community: communityParam,
    planId: planParam,
    bathrooms: bathroomsParam,
    price: bathroomsParam * 500,
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = () => {
    console.log("Booking Confirmed:", formData);
    alert("Booking Confirmed!");
  };

  return (
    <div>
      <StepIndicator step={step} />

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
