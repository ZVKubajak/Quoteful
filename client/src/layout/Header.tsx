import { Link, useLocation } from "react-router-dom";
import { Quote } from "lucide-react";

const Header = () => {
  const currentPage = useLocation().pathname;

  return (
    <header className="flex items-center justify-between h-20 px-4 border-b-2 border-neutral-700">
      <div id="logo">
        <Link to="/">
          <Quote size={50} />
        </Link>
      </div>

      <nav id="nav-bar" aria-label="Main Navigation" className="text-center text-2xl space-x-8">
        <Link
          to="/explore"
          className={`text-gray-400 hover:text-white ${
            currentPage === "/explore" ? "text-white-400 font-bold" : ""
          }`}
        >
          Explore
        </Link>
        <Link
          to="/create"
          className={`text-gray-400 hover:text-white ${
            currentPage === "/create" ? "text-white-400 font-bold" : ""
          }`}
        >
          Create
        </Link>
        <Link
          to="/my-quotes"
          className={`text-gray-400 hover:text-white ${
            currentPage === "/my-quotes" ? "text-white-400 font-bold" : ""
          }`}
        >
          My Quotes
        </Link>
        <Link
          to="/support"
          className={`text-gray-400 hover:text-white ${
            currentPage === "/support" ? "text-white-400 font-bold" : ""
          }`}
        >
          Support
        </Link>
      </nav>

      <div id="account-buttons" className="px-8">
        {/* This is where the Sign In and Sign Out buttons will go. */}
      </div>
    </header>
  );
};

export default Header;
