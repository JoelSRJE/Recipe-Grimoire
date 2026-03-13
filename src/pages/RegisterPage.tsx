import { useState } from "react";
import RegisterForm from "../components/register/RegisterForm";
import RegisterLeftSide from "../components/register/RegisterLeftSide";
import Dice from "../components/shapes/Dice";
import Doorway from "../components/shapes/Doorway";

const RegisterPage = () => {
  return (
    <section className="relative flex justify-center items-center gap-10 p-20 ">
      {/* Bakground colors */}
      <div
        className="absolute w-75 h-75 bg-green-400 rounded-full opacity-10 blur-2xl 
        -top-5 -left-30 pointer-events-none z-0"
      />
      <div
        className="absolute w-100 h-100 bg-blue-400 rounded-full opacity-7 blur-2xl 
      -bottom-30 -right-40 pointer-events-none z-0"
      />

      {/* Left side */}
      <div className="z-10">
        <RegisterLeftSide />
      </div>

      {/* Right side */}
      <div className="z-10">
        <RegisterForm />
      </div>

      {/* Bakground svgs */}
      <div>
        <div className="absolute bottom-20 right-5 rounded-xl shadow-[var(--glow-green)] rotate-15">
          <Dice diceSize={70} value={5} />
        </div>

        <div className="absolute top-10 -left-10 rounded-t-full shadow-[var(--glow-green)] -rotate-12">
          <Doorway height={"13rem"} width={"8rem"} />
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
