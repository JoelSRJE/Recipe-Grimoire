import { CastleTurretIcon } from "@phosphor-icons/react";
import LeftSide from "../components/login/LeftSide";
import LoginForm from "../components/login/LoginForm";
import Rightside from "../components/login/Rightside";

const LoginPage = () => {
  return (
    <section className="relative flex flex-col justify-center items-center gap-10 p-5 mb-10 ">
      <div className="flex flex-col justify-center items-center gap-2">
        <CastleTurretIcon size={80} className="text-bg-green" />
        <h1 className="font-bold tracking-wider text-5xl">Grimoire Portal</h1>
      </div>

      <div className="flex flex-row gap-20">
        {/* Left side */}
        <LeftSide />

        {/* Middle */}
        <LoginForm />

        {/* Right Side */}
        <Rightside />
      </div>
    </section>
  );
};

export default LoginPage;
