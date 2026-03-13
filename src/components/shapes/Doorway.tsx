import { SparkleIcon } from "@phosphor-icons/react";

interface DoorwayProps {
  height?: string;
  width?: string;
}

const Doorway = ({ height, width }: DoorwayProps) => {
  return (
    <div
      className="relative rounded-t-full bg-[#175C43] border border-[#169c64]"
      style={{ height: height, width: width }}
    >
      <SparkleIcon
        size={32}
        className="absolute top-30 left-1/2 -translate-x-1/2 -translate-y-1/2 text-bg-green"
      />
    </div>
  );
};

export default Doorway;
