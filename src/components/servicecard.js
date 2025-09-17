export default function ServiceCard({ service }) {
  return (
    <div className=" rounded-3xl shadow-2xl mb-10">
      <img
        src={service.image}
        alt={service.name}
        className="object-cover rounded-t-2xl w-full h-64"
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-3">{service.name}</h2>
        <p className="font-semibold">{service.price}</p>
        <hr className="border-t border-gray-300 my-5" />
       <button className="mt-2 w-full bg-[#dba144] text-white py-2 rounded-lg font-bold mb-2">
          Book Now
        </button>
      </div>
    </div>
  );
}
