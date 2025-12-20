import { useState } from "react";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";

function Auth({ setIsLoggedIn, setShowFlashMsg, setFlashMsgData }) {
  const [activeForm, setActiveForm] = useState(0); // 0 for signup, 1 for login

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      {/* Toggle */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 font-semibold rounded-tl rounded-bl transition duration-300 ${
            activeForm === 0 ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
          onClick={() => setActiveForm(0)}
        >
          Sign Up
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded-tr rounded-br transition duration-300 ${
            activeForm !== 0 ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
          onClick={() => setActiveForm(1)}
        >
          Log In
        </button>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-6">{activeForm === 0 ? "Sign Up" : "Log In"}</h2>

      {/* Form */}
      {activeForm === 0 ? <SignUpForm setIsLoggedIn={setIsLoggedIn} setShowFlashMsg={setShowFlashMsg} setFlashMsgData={setFlashMsgData} /> : <LogInForm />}
    </div>
  );
}

export default Auth;
