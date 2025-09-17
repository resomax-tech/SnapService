"use client";

import Link from "next/link";
import ServiceCard from "@/components/servicecard";

const services = [
  {
    id: "Bathroom-Cleaning",
    name: "Bathroom Cleaning Service",
    price: "Monthly",
    image: "/cleaning 6.png", // put inside /public
  },
  {
    id: "Deep-Cleaning",
    name: "Deep Cleaning Service",
    price: "Monthly",
    image: "/cleaning 7.jpg", // put inside /public
  },
  

  // add more services if needed
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen  p-4 ">
      <h1 className="text-2xl font-bold mb-8 mt-7">All Service List</h1>
      <div className="space-y-4">
        {services.map((service) => (
          <Link key={service.id} href={`/services/${service.id}/details`}>
            <ServiceCard service={service} />
          </Link>
        ))}
      </div>
    </div>
  );
}
