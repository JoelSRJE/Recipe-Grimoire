import FirstImage from "../../assets/FirstImage.png";
import SecondImage from "../../assets/SecondImage.png";
import ThirdImage from "../../assets/ThirdImage.png";

const ThreeImages = () => {
  return (
    <div className="relative">
      <div className="absolute -top-50 left-3 flex justify-center w-40 h-40 border rotate-15 border-green-highlight rounded-lg shadow-xl">
        <img src={FirstImage} className="rounded-md" />
      </div>
      <div className="absolute top-20 left-18 flex justify-center w-40 h-40 border rotate-7 border-green-highlight rounded-lg shadow-xl">
        <img src={SecondImage} className="rounded-md" />
      </div>
      <div className="absolute top-35 right-40 flex justify-center w-40 h-40 border -rotate-15 border-green-highlight rounded-lg shadow-xl">
        <img src={ThirdImage} className="rounded-md" />
      </div>
    </div>
  );
};

export default ThreeImages;
