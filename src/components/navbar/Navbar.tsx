import { BookOpen } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="flex flex-row justify-between p-2 w-screen border-b-2 border-bg-breakline px-40 z-50">
      {/* Left side */}
      <div className="flex items-center gap-2">
        <button onClick={() => navigate("/")} className="hover:cursor-pointer">
          <BookOpen
            size={32}
            className="text-bg-green transition-all duration-300 hover:cursor-pointer hover:scale-110"
          />
        </button>

        <p className="font-bold tracking-wide">THE RECIPE GRIMOIRE</p>
      </div>

      {/* Right side */}
      <div className="flex gap-4">
        {isAuthenticated ? (
          <>
            <button
              onClick={() => navigate("/foodlist")}
              className="font-bold text-lg text-darker-text hover:text-green-highlight transition-all duration-300 hover:scale-105 hover:cursor-pointer"
            >
              Food Grimoire
            </button>
            <button
              onClick={() => navigate("/createFood")}
              className="font-bold text-lg text-darker-text hover:text-green-highlight transition-all duration-300 hover:scale-105 hover:cursor-pointer"
            >
              Create
            </button>
            <button
              onClick={() => navigate("/homepage")}
              className="font-bold text-lg text-darker-text hover:text-green-highlight transition-all duration-300 hover:scale-105 hover:cursor-pointer"
            >
              Weekly Menu
            </button>
            <button
              onClick={() => {
                logout();
              }}
              className="bg-red-highlight rounded-xl px-6 py-2 text-lg font-bold transition-all duration-300 hover:scale-105 hover:cursor-pointer shadow-[var(--glow-red)]"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="font-bold text-lg text-darker-text hover:text-green-highlight transition-all duration-300 hover:scale-105 hover:cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-green-highlight rounded-xl px-4 py-2 text-lg font-bold transition-all duration-300 hover:scale-105 hover:cursor-pointer shadow-[var(--glow-green)]"
            >
              Join the Grimoire
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
