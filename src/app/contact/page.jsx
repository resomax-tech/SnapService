"use client";

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-black">

      {/* Header Section */}
      <section className="bg-[#dba144] text-black py-8 px-6 text-center">
        <h1 className="text-3xl font-bold text-white mt-2 mb-2">Contact Us</h1>
        <p className="text-base  text-white font-medium">
          Have questions? Get in touch with SnapService – we’re here to help!
        </p>
      </section>

      {/* Contact Form */}
      <section className="flex-1 px-6 py-8">
        <form className="bg-white shadow-lg rounded-2xl p-6 space-y-4 border border-[#e2e2e2]">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#dba144] outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">Your Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#dba144] outline-none"
            />
          </div>
          {/* Contact number */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">Your PhoneNumber</label>
            <input
              type="tel"
              placeholder="Enter your Phonenumber"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#dba144] outline-none"
            />
          </div>


          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">Message</label>
            <textarea
              rows="4"
              placeholder="Write your message here..."
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#f4a300] outline-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#dba144] text-white font-bold py-3 rounded-xl shadow-md hover:bg-black hover:text-[#dba144] transition-"
          >
            Send Message
          </button>
        </form>
      </section>


      

      {/* Contact Info */}
      <section className="bg-[#dba144] text-white py-10 px-6  shadow-lg ">
        <h2 className="text-3xl font-extrabold mb-6 ">Reach Us Directly</h2>

        <div className="space-y-4 text-lg">
          <p className="flex items-center gap-3">
            <span className="text-2xl">📍</span>
            Hyderabad, India
          </p>
          <p className="flex items-center gap-3">
            <span className="text-2xl">📞</span>
            +91 98765 43210
          </p>
          <p className="flex items-center gap-3">
            <span className="text-2xl">✉️</span>
            support@snapservice.com
          </p>
        </div>
      </section>
    </main>
  );
}
