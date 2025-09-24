"use client";

import ServiceCard from "@/components/servicecard";

const services = [
  {
    id: "Basic-Cleaning-2weeks",
    name: "Basic Cleaning",
    price: "2 Weeks Plan/Month",
    image: "cleaning4.jpg",
    description:
      "Our bathroom cleaning includes scrubbing tiles, sinks, mirrors, faucets, and disinfecting all surfaces.",
  },
  {
    id: "Basic-Cleaning-4weeks",
    name: "Basic Cleaning",
    price: "4 Weeks Plan/Month",
    image: "cleaning 6.png",
    description:
      "Our bathroom cleaning includes scrubbing tiles, sinks, mirrors, faucets, and disinfecting all surfaces.",
  },
  {
    id: "Deep-Cleaning-2weeks",
    name: "Deep Cleaning",
    price: "2 Weeks Plan/Month",
    image: "cleaning 7.jpg",
    description:
      "Our deep cleaning covers dusting, sweeping, mopping, kitchen cleaning, sofa/vacuum cleaning, and sanitization.",
  },
  {
    id: "Deep-Cleaning-4week",
    name: "Deep Cleaning",
    price: "4 Weeks Plan/Month",
    image: "cleaning5.jpg",
    description:
      "Our deep cleaning covers dusting, sweeping, mopping, kitchen cleaning, sofa/vacuum cleaning, and sanitization.",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6 mt-6 ">Our Services</h1>

      {/* All Service Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
