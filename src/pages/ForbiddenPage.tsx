import React from "react";
import { useNavigate } from "react-router-dom";

const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col gap-4 items-center justify-center  rounded-lg p-8">
      <h1 className="font-bold text-7xl tracking-wide">403 FORBIDDEN</h1>
      <button
        onClick={() => navigate("/")}
        className="border border-green-highlight bg-transparent text-2xl py-2 px-8 rounded-md transition-all duration-300 hover:cursor-pointer hover:scale-105 hover:bg-green-highlight hover:text-black"
      >
        HOME
      </button>
    </section>
  );
};

export default ForbiddenPage;
