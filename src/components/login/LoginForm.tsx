import { UserIcon, KeyIcon } from "@phosphor-icons/react";
import { useState, type FormEvent } from "react";
import { loginUserRequest } from "../../api/register";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const loginUser = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setSuccess(false);
      setMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setSuccess(false);
      setMessage("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await loginUserRequest(trimmedEmail, password);

      if (response.ok) {
        const token = response.data.token;
        login(token);
        setSuccess(true);
        setMessage("Login successful! Redirecting...");
        setEmail("");
        setPassword("");

        setTimeout(() => {
          navigate("/homepage");
          window.location.href = "/homepage";
        }, 2000);
      } else {
        setSuccess(false);
        setMessage(response.data.Error || "Login failed");
      }
    } catch (error) {
      setSuccess(false);
      setMessage("An error occurred. Please try again!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      {/* Backgrounds */}
      <div className="absolute bg-bg-green w-100 h-118 rounded-xl z-10 blur-sm" />

      <form
        onSubmit={loginUser}
        className="relative flex flex-col h-120 justify-center bg-cards-dark-bg p-8 rounded-xl gap-8 text-darker-text shadow-2xl border border-green-highlight z-20"
      >
        <div className="flex flex-col gap-1">
          <label className="font-semibold pl-1 tracking-wider text-sm text-bg-green">
            Email
          </label>
          <div className="relative">
            <UserIcon
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-bg-green"
            />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Sir Cook-a-lot"
              className="w-full p-3 pl-10 rounded-md bg-[#131313] border border-bg-green focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold pl-1 tracking-wider text-sm text-bg-green">
            Password
          </label>
          <div className="relative">
            <KeyIcon
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-bg-green"
            />
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pl-10 rounded-md bg-[#131313] border border-bg-green focus:outline-none"
            />
          </div>
          <div className="flex w-full justify-end mt-1">
            <button className="text-sm tracking-wide transition-all duration-300 hover:cursor-pointer hover:text-bg-green">
              Forgotten your password?
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-highlight
          text-white rounded-md px-4 py-4 text-lg font-bold transition-all 
          duration-300 hover:scale-[1.02] hover:cursor-pointer shadow-[var(--glow-lighter-green)]"
        >
          ENTER THE GRIMOIRE
        </button>

        <span>
          New to the Recipe Grimoire?{" "}
          <button className="font-semibold text-bg-green transition-all duration-300 hover:text-white hover:cursor-pointer">
            Create a account
          </button>
        </span>

        {success ? (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 min-w-60 font-bold text-center text-green-highlight">
            {message}
          </div>
        ) : (
          <div className="absolute bottom-6 left-1/2 bg-black/80 rounded-md -translate-x-1/2 min-w-80 font-bold text-center text-red-500">
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
