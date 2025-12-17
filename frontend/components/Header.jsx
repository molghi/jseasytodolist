function Header() {
  const navMenu = [
    { name: "Tasks", path: "/" },
    { name: "Profile", path: "/profile" },
    { name: "Log Out", path: "/logout" },
  ];

  const styling = `px-4 py-2 bg-blue-600 rounded-md transition duration-200 hover:opacity-60`;

  return (
    <header className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: Logo */}
        <div className="text-2xl font-bold">Easy To-Do List</div>

        {/* Right: Navigation Menu */}
        <nav className="flex gap-4">
          {/* iterate & output elements */}
          {navMenu.map((element, index) => (
            <a href={element.path} key={index} className={styling}>
              {element.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
