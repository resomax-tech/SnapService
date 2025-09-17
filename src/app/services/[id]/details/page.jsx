"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {useParams,useRouter} from "next/navigation";

export default function ServiceDetails() {
  const {id} = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select an item");
  const router=useRouter();

  // build items with simple for loop
  const items = [];
  for (let i = 1; i <= 5; i++) {
    items.push(
      <li
        key={i}
        onClick={() => {
          setSelected(`Community ${i}`);
          setIsOpen(false);
        }}
        className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-yellow-100"
      >
        Community {i}
      </li>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-10">All Service List</h1>
      <p className="mt-6 text-xl font-bold">
        Service Details for:
      <span className="text-[#dba144] font-semibold ">{id}</span>
      </p>

      {/* Dropdown section */}
      <div className="mt-10 w-72">
        <p className="text-lg font-bold mb-2 text-center">Select Community</p>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full btn  flex items-center justify-between border border-gray-300 rounded-md bg-white py-3 px-4 shadow-sm"
          >
            <span>{selected}</span>
            <span className="bg-[#dba144] p-2 rounded-r-md">
              <ChevronDown className="w-5 h-4 " />
            </span>
          </button>

          {isOpen && (
            <ul className="absolute left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-10">
              {items}
            </ul>
          )}
        </div>
        <button className="btn w-1/2 mt-10 ml-16 bg-[#dba144] text-white py-3 rounded-md hover:bg-yellow-600 shadow-md" 
           onClick={()=>router.push(`/services/${id}/reviews`)}
           >
          Proceed 
        </button>
      </div>
    </div>
  );
}
