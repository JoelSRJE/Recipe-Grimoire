import {
  MagicWandIcon,
  GearSixIcon,
  PackageIcon,
  ShieldIcon,
} from "@phosphor-icons/react";

const LeftSide = () => {
  return (
    <aside className="relative flex">
      <div className="relative flex flex-col justify-between items-center py-8 w-14 h-120 border-r-4 border-green-highlight rounded-l-xl bg-cards-dark-bg z-10 shadow-2xl">
        <MagicWandIcon size={30} className="z-40 text-bg-green" />
        <GearSixIcon size={30} className="z-40 text-bg-green" />
        <PackageIcon size={30} className="z-40 text-bg-green" />
        <ShieldIcon size={30} className="z-40 text-bg-green" />
        <div className="absolute top-10 w-6 h-6 bg-bg-green rounded-full opacity-100 blur-xl z-30" />
        <div className="absolute top-75 w-6 h-6 bg-bg-green rounded-full opacity-100 blur-xl z-30" />
        <div className="absolute top-42.5 w-6 h-6 bg-bg-green rounded-full opacity-100 blur-xl z-30" />
        <div className="absolute top-106.75 w-6 h-6 bg-bg-green rounded-full opacity-100 blur-xl z-30" />
      </div>
      <div className="absolute top-2 left-2.5 bg-gray-400 w-8 h-116 opacity-10 z-20 blur-md" />
    </aside>
  );
};

export default LeftSide;
