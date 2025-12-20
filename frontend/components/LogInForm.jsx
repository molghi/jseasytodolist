import { useRef, useEffect } from "react";

function LogInForm() {
  const firstFieldRef = useRef(null);

  useEffect(() => {
    firstFieldRef.current.focus();
  }, []);

  return (
    <form className="space-y-4">
      <input
        ref={firstFieldRef}
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded font-semibold">
        Log In
      </button>
    </form>
  );
}

export default LogInForm;
