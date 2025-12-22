import { useRef, useEffect, useState, useContext } from "react";
import axios from "axios";
import MyContext from "../context/MyContext";

function LogInForm() {
  const { setIsLoggedIn, setShowFlashMsg, setFlashMsgData, setUserName } = useContext(MyContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const firstFieldRef = useRef(null);

  useEffect(() => {
    firstFieldRef.current.focus();
  }, []);

  const login = async (e) => {
    e.preventDefault();
    // shoot network req
    try {
      const response = await axios.post("/login", { email, password });
      if (response.status === 200) {
        setIsLoggedIn(true);
        setShowFlashMsg(true);
        setFlashMsgData(["success", "Logged in successfully!"]);
        setError("");
        setUserName(response.data.name);
      } else {
        setError(response.data.msg);
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.msg || "");
    }
  };

  return (
    <form onSubmit={login} className="space-y-4">
      {/* Email */}
      <input
        ref={firstFieldRef}
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="true"
        name="email"
        className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        required
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Button */}
      <button type="submit" className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded font-semibold">
        Log In
      </button>

      {/* Validation errors */}
      {error && (
        <div className="mt-4 text-[red]">
          <span className="font-bold">Error:</span> {error}
        </div>
      )}
    </form>
  );
}

export default LogInForm;
