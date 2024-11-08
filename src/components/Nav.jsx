import { Link, Outlet, useLocation } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { IoIosSearch } from "react-icons/io";
import { useState } from "react";

function Nav({ logout, search, setSearch }) {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center h-[10vh] px-5 sm:px-20 bg-white justify-between top-0">
        {/* Mobile Menu Toggle */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-500 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-[10vh] left-0 w-full bg-white p-5 space-y-5 sm:space-y-0 sm:flex sm:space-x-20 sm:relative sm:w-auto sm:p-0 sm:bg-transparent sm:top-auto sm:flex-row text-gray-400 transition-all duration-300`}
        >
          <Link to={"home"} className="block sm:inline">
            <li>Home</li>
          </Link>
          <Link to={"postlist"} className="block sm:inline">
            <li>Blogs</li>
          </Link>
          <Link to={"usersposts"} className="block sm:inline">
            <li>Clients</li>
          </Link>
          <Link to={"about"} className="block sm:inline">
            <li>About</li>
          </Link>
        </ul>

        {/* Search Bar */}
        <div className="flex items-center relative mt-2 sm:mt-0">
          <IoIosSearch className="absolute left-3 top-[12px] text-gray-400" />
          <input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="border-b border-gray-300 focus:border-gray-500 px-10 pl-8 py-2 w-[160px] sm:w-[180px] md:w-[240px] rounded-lg transition-all duration-200 outline-none"
            name="search"
            type="search"
          />
        </div>

        {/* Logout Button */}
        <div className="hidden sm:flex items-center">
          <button
            onClick={logout}
            className="group flex items-center justify-center w-10 h-10 bg-gray-600 rounded-full cursor-pointer transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg"
          >
            <TbLogout className="text-white text-lg group-hover:ml-3" />
            <span className="ml-2 text-white text-sm font-semibold hidden group-hover:inline">
              Logout
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Nav;
