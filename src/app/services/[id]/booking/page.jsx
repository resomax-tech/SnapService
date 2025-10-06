import BookingForm from "@/components/BookingForm";
export default function BookingPage() {
  return (
    <main className="max-w-lg mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Review Your Booking</h1>
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold">Bathroom Cleaning Service</h2>
        <p className="text-gray-800">Rs. 900 Per Month</p>
        <p className="text-green-600 text-sm">Exclusive of all taxes</p>
      </div>

      <BookingForm />
    </main>
  );
}
