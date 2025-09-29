"use client";
import { useState } from "react";
import ServiceCard from "@/components/servicecard";
import ViewMoreModal from "@/components/ViewMoreModal";

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(null);

  const services = [
    {
      id: "Basic-Cleaning-2weeks",
      name: "Basic Cleaning",
      price: "2 Weeks Plan/Month",
      image: "cleaning4.jpg",
    },
    {
      id: "Basic-Cleaning-4weeks",
      name: "Basic Cleaning",
      price: "4 Weeks Plan/Month",
      image: "cleaning6.png",
    },
    {
      id: "Deep-Cleaning-2weeks",
      name: "Deep Cleaning",
      price: "2 Weeks Plan/Month",
      image: "cleaning7.jpg",
    },
    {
      id: "Deep-Cleaning-4week",
      name: "Deep Cleaning",
      price: "4 Weeks Plan/Month",
      image: "cleaning5.jpg",
    },
  ];

  // Map service IDs to modal group
  const groupMap = {
    "Basic-Cleaning-2weeks": "Basic Cleaning",
    "Basic-Cleaning-4weeks": "Basic Cleaning",
    "Deep-Cleaning-2weeks": "Deep Cleaning",
    "Deep-Cleaning-4week": "Deep Cleaning",
  };

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6 mt-6">Our Services</h1>

      <div className="grid md:grid-cols-2 gap-6 items-center">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onViewMore={(id) => setActiveService(groupMap[id])} // open modal
          />
        ))}
      </div>

      {/* Modal */}
      {activeService && (
        <ViewMoreModal
          serviceType={activeService}
          onClose={() => setActiveService(null)}
        />
      )}
    </div>
  );
}
