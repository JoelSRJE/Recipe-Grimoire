import { useState, type FormEvent } from "react";
import { ChevronsRight } from "react-feather";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../../api/register";

const RegisterForm = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [terms, setTerms] = useState<boolean>(false);
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const registerNewUser = async (e: FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      setSuccessful(false);
      setMessage("Password must be at least 8 characters long.");
      return;
    }

    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
      setSuccessful(false);
      setMessage("Please enter a valid email address.");
      return;
    }

    if (username.length === 0 || email.length === 0 || password.length === 0) {
      setSuccessful(false);
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const response = await registerRequest({ username, email, password });

      if (await response.ok) {
        setSuccessful(true);
        setMessage("Registration successful! Redirecting to login...");
        setUsername("");
        setEmail("");
        setPassword("");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        const data: any = (await response).json();
        setSuccessful(false);
        setMessage(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setSuccessful(false);
      setMessage("An error occurred. Please try again!");
      return;
    }
  };

  return (
    <form
      onSubmit={registerNewUser}
      className="flex flex-col h-160 gap-4 p-8 w-100 bg-cards-dark-bg rounded-xl shadow-2xl border border-gray-600"
    >
      <h1 className="text-2xl tracking-wide mt-2">BEGIN YOUR GRIMOIRE</h1>

      <p className="mb-4 font-extralight ">
        Create your account to start minimizing the debates about what to eat!
      </p>

      <div className="flex flex-col gap-1">
        <label className="font-semibold pl-1 tracking-wide text-sm text-darker-text">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Sir Cook-a-lot"
          className="p-3 rounded-md bg-[#131313]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-semibold pl-1 tracking-wide text-sm text-darker-text">
          Email
        </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="John@doe.com"
          className="p-3 rounded-md bg-[#131313]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-semibold pl-1 tracking-wide text-sm text-darker-text">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          className="p-3 rounded-md bg-[#131313]"
        />
      </div>

      <div
        className="flex flex-row items-center gap-2 pl-1.5 text-darker-text hover:cursor-pointer"
        onClick={() => setTerms((prev) => !prev)}
      >
        <input
          type="checkbox"
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
          className="h-4 w-4 hover:cursor-pointer"
        />
        <p>I agree to follow the Code of Conduct</p>
      </div>

      <div className="flex justify-center pt-2 mb-3 mt-1">
        <button
          type="submit"
          className="flex justify-center items-center w-full gap-2 bg-green-highlight
                rounded-md px-5 py-2 text-md font-bold
                transition-all duration-300
                hover:scale-105 hover:cursor-pointer
                "
        >
          Join the Grimoire{" "}
          <span>
            <ChevronsRight size={20} className="Chevrons" />
          </span>
        </button>
      </div>

      <div className="w-full size-[1.5px] bg-gray-500 opacity-30" />

      <div className="tracking-wide">
        Already a Grimoire user?{" "}
        <button
          className="text-green-highlight transition-all duration-300 hover:cursor-pointer hover:text-white"
          onClick={() => navigate("/login")}
        >
          Login to Grimoire
        </button>
      </div>

      {successful ? (
        <div className="font-bold text-center text-green-highlight">
          {message}
        </div>
      ) : (
        <div className="font-bold text-center text-red-500">{message}</div>
      )}
    </form>
  );
};

export default RegisterForm;
