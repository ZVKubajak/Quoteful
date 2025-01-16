import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";
import auth from "@/auth/auth";

const Header = () => {
  const currentPage = useLocation().pathname;
  const navigate = useNavigate();

  const isGuest = auth.guestLoggedIn();
  const isLoggedIn = auth.loggedIn();

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between h-20 px-4 border-b-2 border-neutral-700">
      <div id="logo">
        <Link to="/">
          <Quote size={50} />
        </Link>
      </div>

      <nav
        id="nav-bar"
        aria-label="Main Navigation"
        className="text-center text-2xl space-x-8 pl-16"
      >
        <Link
          to="/explore"
          className={`text-gray-400 hover:text-white transition duration-200 ${
            currentPage === "/explore" ? "text-white" : ""
          }`}
        >
          Explore
        </Link>
        <Link
          to="/create"
          className={`text-gray-400 hover:text-white transition duration-200 ${
            currentPage === "/create" ? "text-white" : ""
          }`}
        >
          Create
        </Link>
        <Link
          to="/my-quotes"
          className={`text-gray-400 hover:text-white transition duration-200 ${
            currentPage === "/my-quotes" ? "text-white" : ""
          }`}
        >
          My Quotes
        </Link>
        <Link
          to="/support"
          className={`text-gray-400 hover:text-white transition duration-200 ${
            currentPage === "/support" ? "text-white" : ""
          }`}
        >
          Support
        </Link>
      </nav>

      <div id="account-buttons">
        {!isGuest && !isLoggedIn && (
          <Button
            asChild
            variant="ghost"
            className="text-xl bg-white text-black mx-3"
          >
            <Link to="/login">Login</Link>
          </Button>
        )}
        {isGuest && (
          <Button
            asChild
            variant="ghost"
            className="text-xl bg-white text-black mr-1"
          >
            <Link to="/signup">Sign Up</Link>
          </Button>
        )}
        {isLoggedIn && (
          <Button
            variant="ghost"
            className="text-xl bg-white text-black mr-3"
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
