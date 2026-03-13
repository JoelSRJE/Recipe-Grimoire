import { BookOpen, GitHub } from "react-feather";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="flex justify-between px-40 bg-transparent">
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

      {/* Middle */}
      <div className="flex flex-row justify-center items-center text-sm text-darker-text gap-2">
        <div className="w-12 bg-darker-text h-[0.5px]" />
        <span className="w-16  text-center">V 1.0.1</span>
        <div className="w-12 bg-darker-text h-[0.5px]" />
      </div>

      {/* Right side */}
      <div className="flex items-center text-darker-text font-extralight">
        <button className="flex gap-2 hover:cursor-pointer group-hover:text-bg-green group ">
          <GitHub size={20} className="text-bg-green" />
          <p className="text-sm">
            Created by{" "}
            <span className="font-bold group-hover:text-bg-green">
              JoelSRJE
            </span>
          </p>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
