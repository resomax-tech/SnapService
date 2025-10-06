"use client";
import Swal from "sweetalert2";

export function LogoutAlert(onConfirm) {
  Swal.fire({
    title: "Log Out?",
    text: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Log Out",
    cancelButtonText: "Cancel",
    width: "240px",
    padding: "0.5rem",    // less padding
    heightAuto: true,     // adjust height automatically
    customClass: {
      popup: "rounded-md shadow-sm py-2",  // softer, smaller card
      title: "text-sm font-semibold", // smaller text
      htmlContainer: "text-xs text-gray-600", // subtitle text smaller
      icon: "scale-50",
      confirmButton:
        "bg-[#3D8D7A] text-white text-xs px-2 mr-2 py-2 rounded-md hover:bg-[#347666]",
      cancelButton:
        "bg-red-500 text-white text-xs px-2  py-2 rounded-md hover:bg-red-600",
    },
    buttonsStyling: false,
  }).then((result) => {
    if (result.isConfirmed && typeof onConfirm === "function") {
      onConfirm();
    }
  });
}
