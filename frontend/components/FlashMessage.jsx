import { useState, useEffect, useContext } from "react";
import MyContext from "../context/MyContext";

function FlashMessage({ type, message }) {
  const { showFlashMsg, flashMsgData, setShowFlashMsg } = useContext(MyContext);

  type = "warning";
  message = "flash message text";

  const [animClass, setAnimClass] = useState("opacity-0 translate-x-full");

  if (flashMsgData.length > 0) {
    // if there is some msg to show
    [type, message] = flashMsgData;
  }

  // show, hide, remove:
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimClass(""); // show
    }, 100);

    const timer2 = setTimeout(() => {
      setAnimClass("opacity-0 translate-x-full"); // hide
    }, 3000);

    const timer3 = setTimeout(() => {
      setShowFlashMsg(false); // remove from dom
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
      className={`fixed top-24 right-4 min-w-60 bg-gray-900 text-white rounded-lg shadow-lg border p-4 flex items-start space-x-3 z-50 transition duration-300 ${animClass} ${
        type === "success" ? "border-[limegreen]" : "border-[coral]"
      }`}
    >
      <div className="flex-1">
        <p className={`font-semibold ${type === "success" ? "text-[limegreen]" : "text-[coral]"}`}>{type === "success" ? "Success!" : "Warning!"}</p>
        <p className="text-gray-300 text-sm">{message}</p>
      </div>
    </div>
  );
}

export default FlashMessage;
