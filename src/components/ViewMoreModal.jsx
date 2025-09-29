"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const serviceGroups = {
    "Basic Cleaning": {
        type: "Basic Cleaning",
        images: ["/basic1.png", "/basic2.png", "/basic3.webp"],
    },
    "Deep Cleaning": {
        type: "Deep Cleaning",
        images: ["/deep1.png", "/deep2.png", "/deep3.png"],
    },
};

const equipmentList = ["Vacuum Cleaner", "Mop", "Broom", "Disinfectant"];
const faqs = [
    { question: "How long does cleaning take?", answer: "Approx 2-3 hours." },
    { question: "Do you provide eco-friendly products?", answer: "Yes, we do." },
];
const reviews = [
    { user: "Anil", rating: 5, comment: "Excellent service!" },
    { user: "Priya", rating: 4, comment: "Very professional." },
];

export default function ViewMoreModal({ serviceType, onClose }) {
    const service = serviceGroups[serviceType];
    const [openFAQ, setOpenFAQ] = useState(null);

    // Prevent background scroll
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    if (!service) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-end justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full md:w-3/4 lg:w-1/2 bg-white rounded-t-2xl p-6 max-h-[90vh] overflow-y-auto animate-slide-up shadow-2xl z-[10000]">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-xl font-bold text-gray-600"
                >
                    ✕
                </button>

                {/* Swiper */}
                <Swiper
                    modules={[Navigation]}
                    navigation
                    spaceBetween={30}
                    slidesPerView={1}
                    className="w-full h-64 mb-8 mt-5"
                >
                    {service.images.map((img, idx) => (
                        <SwiperSlide key={idx}>
                            <img
                                src={img}
                                className="w-full h-full object-cover rounded-lg"
                                alt={service.type}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Cleaning Type */}
                <h2 className="text-2xl font-bold mb-4">{service.type}</h2>

                {/* Top Cleaners */}
                <section className="mb-10 mt-10">
                    <h3 className="text-xl font-semibold mb-4">
                        Why Our Top Cleaners Stand Out
                    </h3>
                    <p className="mb-6 text-gray-600">
                        Our cleaners are professional, certified, and highly trusted.
                    </p>
                    <section className="mb-10 mt-10">
                        <h3 className="text-xl font-semibold mb-4">Why Our Top Cleaners Stand Out</h3>
                        <p className="mb-4 text-gray-600">
                            Our cleaners are professional, certified, and highly trusted.
                        </p>
                        <ul className="list-disc ml-6 space-y-2">
                            <li>Certified</li>
                            <li>Experienced</li>
                            <li>Trusted</li>
                            <li>Reliable</li>
                            <li>Professional</li>
                        </ul>
                    </section>

                </section>

                {/* Equipments */}
                <section className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Cleaning Equipments</h3>
                    <ul className="list-disc ml-5">
                        {equipmentList.map((eq, idx) => (
                            <li key={idx}>{eq}</li>
                        ))}
                    </ul>
                </section>

                {/* FAQ */}
                <section className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">FAQs</h3>
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="mb-2 border-b pb-2">
                            <button
                                onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                                className="w-full text-left font-semibold"
                            >
                                {faq.question}
                            </button>
                            {openFAQ === idx && <p className="mt-2">{faq.answer}</p>}
                        </div>
                    ))}
                </section>

                {/* Reviews */}
                <section className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Reviews</h3>
                    {reviews.map((rev, idx) => (
                        <div key={idx} className="mb-4 bg-gray-100 p-4 rounded-lg">
                            <p className="font-bold">{rev.user}</p>
                            <p>Rating: {rev.rating}/5</p>
                            <p>{rev.comment}</p>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}
