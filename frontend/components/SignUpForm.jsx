import { useRef, useEffect, useState, useContext } from "react";
import axios from "axios";
import MyContext from "../context/MyContext";

function SignUpForm() {
  const { setIsLoggedIn, setShowFlashMsg, setFlashMsgData } = useContext(MyContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [formError, setFormError] = useState("");
  const firstFieldRef = useRef(null);

  useEffect(() => {
    firstFieldRef.current.focus();
  }, []);

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users", { email, password, passwordConfirm }); // create user; response has jwt
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`; // include token in subsequent Axios headers
      console.log("registerUser response:", response);
      if (response.status === 201) {
        setIsLoggedIn(true);
        setFormError("");
        setShowFlashMsg(true);
        setFlashMsgData(["success", `Account created!`]);
      }
    } catch (error) {
      // handle sent validation errors
      // console.log(error.response?.data?.msg || error.message);
      if (error.response?.data?.msg.includes("Passwords don't match")) setFormError("Passwords don't match");
      else if (error.response?.data?.msg.includes("duplicate key")) setFormError("Email already belongs to existing user");
      else if (error.response?.data?.msg.includes("Please enter a valid email")) setFormError("Please enter a valid email");
      else if (error.response?.data?.msg.includes("Password is not long enough")) setFormError("Password is not long enough");
      else setFormError("Incorrect input. Check password again. Must be at least 6-chars long.");
    }
  };

  return (
    <form onSubmit={registerUser} className="space-y-4">
      <input
        ref={firstFieldRef}
        type="email"
        placeholder="Email"
        required={true}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="true"
        name="email"
        className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        required={true}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        name="passwordConfirm"
        placeholder="Confirm Password"
        required={true}
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button type="submit" className="w-full py-2 bg-green-500 hover:bg-green-600 rounded font-semibold">
        Sign Up
      </button>

      {/* validation errors */}
      {formError && (
        <div className="mt-4 text-[red]">
          <span className="font-bold">Error:</span> {formError}
        </div>
      )}
    </form>
  );
}

export default SignUpForm;
