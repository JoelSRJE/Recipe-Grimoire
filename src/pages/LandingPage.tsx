import LeftSide from "../components/landing/LeftSide";
import RightSide from "../components/landing/RightSide";

const LandingPage = () => {
  return (
    <section className="relative flex flex-col py-20 xl:flex-row gap-70 md:gap-40 h-full">
      {/* Background color */}
      <div
        className="absolute w-270 h-270 bg-bg-green rounded-full opacity-8 blur-2xl 
        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
      />

      {/* Left side */}
      <aside className="z-10">
        <LeftSide />
      </aside>

      {/* Right side */}
      <aside className="z-10">
        <RightSide />
      </aside>
    </section>
  );
};

export default LandingPage;
