export default function StepIndicator({ step }) {
  return (
    <div className="flex justify-between items-center mb-6 ml-12">
      {[1, 2, 3].map((num) => (
        <div key={num} className="flex items-center w-full">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold ${
              step === num ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            {num}
          </div>
          {num !== 3 && <div className="flex-1 h-1 bg-gray-300 mx-2"></div>}
        </div>
      ))}
    </div>
  );
}
