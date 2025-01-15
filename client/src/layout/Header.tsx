import { Link, useLocation } from "react-router-dom";
import { Quote } from "lucide-react";

const Header = () => {
  const currentPage = useLocation().pathname;

  return (
    <header className="border-b-2 border-neutral-700">
      <div id="logo">
        <Link to="/">
          <Quote />
        </Link>
      </div>

      <nav id="nav-bar" aria-label="Main Navigation">
        <Link
          to="/explore"
          className={`hover:underline ${
            currentPage === "/explore" ? "text-white-400 font-bold" : ""
          }`}
        >
          Explore
        </Link>
        <Link
          to="/create"
          className={`hover:underline ${
            currentPage === "/create" ? "text-white-400 font-bold" : ""
          }`}
        >
          Create
        </Link>
        <Link
          to="/my-quotes"
          className={`hover:underline ${
            currentPage === "/my-quotes" ? "text-white-400 font-bold" : ""
          }`}
        >
          My Quotes
        </Link>
        <Link
          to="/support"
          className={`hover:underline ${
            currentPage === "/support" ? "text-white-400 font-bold" : ""
          }`}
        >
          Support
        </Link>
      </nav>

      <div id="account-buttons">
        {/* This is where the Sign In and Sign Out buttons will go. */}
      </div>
    </header>
  );
};

export default Header;
