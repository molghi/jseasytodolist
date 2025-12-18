import { useState, useEffect } from "react";

function FlashMessage({ type, message, showFlashMsg, flashMsgData, setShowFlashMsg }) {
  type = "warning";
  message = "flash message text";

  const [animClass, setAnimClass] = useState("opacity-0 translate-x-full");

  if (flashMsgData.length > 0) {
    [type, message] = flashMsgData;
  }

  // show, hide, remove:
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimClass("");
    }, 100);

    const timer2 = setTimeout(() => {
      setAnimClass("opacity-0 translate-x-full");
    }, 3000);

    const timer3 = setTimeout(() => {
      setShowFlashMsg(false);
    }, 4000);

    // cleanup
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [showFlashMsg]);

  // ============================================================================

  return (
    <div
      className={`fixed top-24 right-4 w-80 bg-gray-900 text-white rounded-lg shadow-lg border p-4 flex items-start space-x-3 z-50 transition duration-300 ${animClass} ${
        type === "success" ? "border-[limegreen]" : "border-[coral]"
      }`}
    >
      {/* Icon */}
      {/* <div className="flex-shrink-0">
        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div> */}

      {/* Message */}
      <div className="flex-1">
        <p className={`font-semibold ${type === "success" ? "text-[limegreen]" : "text-[coral]"}`}>{type === "success" ? "Success!" : "Warning!"}</p>
        <p className="text-gray-300 text-sm">{message}</p>
      </div>

      {/* Close Button */}
      {/* <button className="text-gray-400 hover:text-white">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button> */}
    </div>
  );
}

export default FlashMessage;
