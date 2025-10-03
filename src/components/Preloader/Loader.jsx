"use client";

export default function Loader() {
  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen p-6 flex items-center justify-center mb-10">
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-[#3D8D7A] animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-[#3D8D7A] animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-[#3D8D7A] animate-bounce [animation-delay:-.5s]"></div>
      </div>
    </div>
  );
}