"use client";

import { motion } from "framer-motion";
import { CheckCircle, Leaf, DollarSign, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AboutPage() {

  const router = useRouter();

  const handleClick = () => {
    router.push("/services"); //  goes to services page
  };
  return (
    <main className="bg-gray-50 min-h-screen text-black">
      {/* Hero Section */}
      <section className="relative w-full h-60">
        <img
          src="/cleaning3.jpg"
          alt="SnapService Cleaning"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className=" bg-neutral-600/15 text-3xl text-white  font-extrabold text-center px-4">
            Turning Bathrooms Into Brightrooms
          </h1>
        </div>
      </section>

      {/* Mission Section */}
      <motion.section
        className="px-6 py-8 "
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <h2 className="text-2xl font-bold text-color mb-4 text-center">What We Do?</h2>
        <p className="text-gray-800 font-medium text-base text-justify leading-relaxed">
          Snap Service transforms bathrooms into spotless, bright spaces with thorough cleaning and care. We remove dirt and germs to create a fresh, hygienic environment that shines. Trust us to bring brightness and freshness to your bathroom—quickly and reliably.
        </p>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="px-6 py-6 space-y-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <h2 className="text-2xl font-bold text-color mb-4 text-center">What We Offer ?</h2>



        <div className="bg-white shadow-md rounded-xl p-4  font-medium flex items-center gap-3">
          <CheckCircle className="text-color w-6 h-6" />
          <span>Expert bathroom cleaning specialists</span>
        </div>
        <div className="bg-white shadow-md rounded-xl p-4 font-medium flex items-center gap-3">
          <DollarSign className="text-color w-6 h-6" />
          <span>Affordable, clear pricing</span>
        </div>
        <div className="bg-white shadow-md rounded-xl p-4 font-medium flex items-center gap-3">
          <Leaf className="text-color w-6 h-6" />
          <span>Eco-friendly & safe products</span>
        </div>
        <div className="bg-white shadow-md rounded-xl p-4  font-medium flex items-center gap-3">
          <Clock className="text-color w-6 h-6" />
          <span>Easy booking</span>
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section
        className="px-6 py-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >

        <h2 className="text-2xl font-bold mb-4 text-center text-color">
          Our Promise
        </h2>
        <ul className="list-disc ml-5 font-medium text-justify space-y-3 ">
          <li>Hygienic & Healthy: Remove hidden germs and tough stains</li>
          <li>Eco-friendly products safe for your family</li>
          <li>Quick & reliable – book today, clean today</li>
          <li>Attention to detail: tiles, faucets, mirrors & more</li>
        </ul>

      </motion.section>

      {/* CTA */}
      <motion.section
        className="text-center py-10 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 5 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <button
        onClick={handleClick} //  FIXED
         className="bg-[#dba144] text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-md btn">
          Book Your Cleaning Now
        </button>
      </motion.section>
    </main>
  );
}
