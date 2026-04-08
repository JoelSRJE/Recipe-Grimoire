import { useState } from "react";
import { BookOpen, Menu, X } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const close = () => setMenuOpen(false);

  const navTo = (path: string) => {
    navigate(path);
    close();
  };

  return (
    <nav className="relative flex flex-row items-center justify-center gap-40 md:gap-80 px-4 py-2 w-full border-b-2 border-bg-breakline z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <button onClick={() => navTo("/")} className="hover:cursor-pointer">
          <BookOpen className="size-7 text-bg-green transition-all duration-300 hover:scale-110" />
        </button>
        <p className="font-bold tracking-wide text-[0.8rem] lg:text-[1rem]">
          THE RECIPE GRIMOIRE
        </p>
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <button
              onClick={() => navTo("/foodlist")}
              className="font-bold text-[0.8rem] lg:text-[1rem] text-darker-text hover:text-green-highlight transition-all duration-300 hover:scale-105"
            >
              Food Grimoire
            </button>
            <button
              onClick={() => navTo("/createFood")}
              className="font-bold text-[0.8rem] lg:text-[1rem] text-darker-text hover:text-green-highlight transition-all duration-300 hover:scale-105"
            >
              Create
            </button>
            <button
              onClick={() => navTo("/homepage")}
              className="font-bold text-[0.8rem] lg:text-[1rem] text-darker-text hover:text-green-highlight transition-all duration-300 hover:scale-105"
            >
              Weekly Menu
            </button>
            <button
              onClick={() => {
                logout();
                close();
              }}
              className="bg-red-highlight rounded-xl px-6 py-2 text-[0.8rem] lg:text-[1.1rem] font-bold transition-all duration-300 hover:scale-105 shadow-[var(--glow-red)]"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navTo("/login")}
              className="font-bold text-[0.8rem] lg:text-[1rem] text-darker-text hover:text-green-highlight transition-all duration-300 hover:scale-105"
            >
              Sign In
            </button>
            <button
              onClick={() => navTo("/register")}
              className="bg-green-highlight rounded-xl px-4 py-2 text-[0.8rem] lg:text-[1rem] font-bold transition-all duration-300 hover:scale-105 shadow-[var(--glow-green)]"
            >
              Join the Grimoire
            </button>
          </>
        )}
      </div>

      {/* Hamburger button (mobile only) */}
      <button
        className="md:hidden hover:cursor-pointer"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-50% w-screen flex flex-col justify-center items-center gap-4 px-6 py-4 border-b-2 border-bg-breakline bg-bg-dark md:hidden z-50">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navTo("/foodlist")}
                className="font-bold text-[1rem] flex justify-center text-white w-1/2 px-4 py-2 hover:text-green-highlight transition-all duration-300 text-left cursor-pointer border border-transparent hover:border-bg-green"
              >
                Food Grimoire
              </button>
              <button
                onClick={() => navTo("/createFood")}
                className="font-bold text-[1rem] flex justify-center text-white w-1/2 px-4 py-2 hover:text-green-highlight transition-all duration-300 text-left cursor-pointer border border-transparent hover:border-bg-green"
              >
                Create
              </button>
              <button
                onClick={() => navTo("/homepage")}
                className="font-bold text-[1rem] flex justify-center text-white w-1/2 px-4 py-2 hover:text-green-highlight transition-all duration-300 text-left cursor-pointer border border-transparent hover:border-bg-green"
              >
                Weekly Menu
              </button>
              <button
                onClick={() => {
                  logout();
                  close();
                }}
                className="bg-red-highlight rounded-xl px-6 py-2 text-[0.9rem] font-bold transition-all duration-300 shadow-[var(--glow-red)] w-full cursor-pointer hover:bg-red-highlight/70"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navTo("/login")}
                className="font-bold text-[1rem] flex justify-center text-white w-1/2 px-4 py-2 hover:text-green-highlight transition-all duration-300 text-left cursor-pointer border border-transparent hover:border-bg-green"
              >
                Sign In
              </button>
              <button
                onClick={() => navTo("/register")}
                className="bg-green-highlight rounded-xl px-4 py-2 text-[0.9rem] font-bold transition-all duration-300 shadow-[var(--glow-green)] w-1/2 cursor-pointer hover:bg-green-highlight/70"
              >
                Join the Grimoire
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
