import ServiceCard from "@/components/servicecard";

export default function ServicesPage() {
  const service = {
    id: "bathroom-cleaning",
    name: "Bathroom Cleaning Services",
    price: "Flat Rate / Month",
    image: "/cleaning4.jpg",
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 mt-6">Our Services</h1>

      <ServiceCard service={service} />
    </div>
  );
}
