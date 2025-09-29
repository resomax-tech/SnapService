"use client";

import { useState } from "react";

import StepIndicator from "@/components/bookingfolder/StepIndicator";
import Step1 from "@/components/bookingfolder/Step1";
import Step2 from "@/components/bookingfolder/Step2";
import Step3 from "@/components/bookingfolder/Step3";


export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: "",
    firstName: "",
    lastName: "",
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = () => {
    console.log("Booking Confirmed:", formData);
    alert("Booking Confirmed!");
  };

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
