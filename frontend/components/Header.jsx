import axios from "axios";
import { useContext } from "react";
import MyContext from "../context/MyContext";

function Header() {
  const { isLoggedIn, setShowFlashMsg, setFlashMsgData, setIsLoggedIn } = useContext(MyContext);

  const navMenu = [
    // { name: "Tasks", path: "/" },
    // { name: "Profile", path: "/profile" },
    { name: "Log Out", path: "/logout" },
  ];

  const logout = async (e) => {
    e.preventDefault();
    const response = await axios.get("/logout");
    console.log(response);
    if (response.status === 200) {
      setShowFlashMsg(true);
      setFlashMsgData(["success", "Logged out successfully!"]);
      setIsLoggedIn(false);
    }
  };

  const styling = `px-4 py-2 bg-blue-600 rounded-md transition duration-200 hover:opacity-60`;

  return (
    <header className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex gap-x-6 gap-y-3 justify-between items-center flex-wrap md:flex-nowrap">
        {/* Left: Logo */}
        <div className="text-2xl font-bold">Easy To-Do List</div>

        {/* Right: Navigation Menu */}
        {isLoggedIn && (
          <nav className="flex gap-4">
            {/* iterate & output elements */}
            {navMenu.map((element, index) => (
              <button key={index} className={styling} onClick={element.path === "/logout" ? logout : undefined}>
                {element.name}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
