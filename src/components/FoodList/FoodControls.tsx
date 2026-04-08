interface FoodControlsProps {
  mode: "NONE" | "DELETE" | "EDIT" | "SAVE" | "UPDATE";
  setMode: (mode: "NONE" | "DELETE" | "EDIT" | "SAVE" | "UPDATE") => void;
  isEditing?: boolean;
  onUpdate?: () => void;
  onDelete?: () => void;
}

const FoodControls = ({
  mode,
  setMode,
  isEditing,
  onUpdate,
  onDelete,
}: FoodControlsProps) => {
  const getButtonText = (buttonMode: "EDIT" | "DELETE") => {
    if (mode === buttonMode) return buttonMode === "EDIT" ? "Update" : "Save";
    return buttonMode === "EDIT" ? "Edit" : "Delete";
  };

  const handleClick = (buttonMode: "EDIT" | "DELETE") => {
    if (mode === buttonMode) {
      if (buttonMode === "EDIT" && onUpdate) {
        onUpdate();
      }

      if (buttonMode === "DELETE" && onDelete) {
        onDelete();
      }

      setMode("NONE");
    } else {
      setMode(buttonMode);
    }
  };

  return (
    <div className="flex gap-4 w-full justify-center">
      <button
        onClick={() => handleClick("DELETE")}
        className={`w-[10rem] md:w-[20rem] h-12 
          ${mode === "DELETE" ? "bg-green-highlight cursor-pointer" : "bg-red-500 cursor-pointer"} 
          text-black tracking-wide font-semibold px-3 py-1 rounded`}
        disabled={isEditing && mode !== "DELETE"}
      >
        {getButtonText("DELETE").toUpperCase()}
      </button>

      <button
        onClick={() => handleClick("EDIT")}
        className={`w-[10rem] md:w-[20rem] h-12 ${mode === "EDIT" ? "bg-green-highlight cursor-pointer" : "bg-blue-500 cursor-pointer"} text-black tracking-wide font-semibold px-3 py-1 rounded`}
        disabled={isEditing && mode !== "EDIT"}
      >
        {getButtonText("EDIT").toUpperCase()}
      </button>
    </div>
  );
};

export default FoodControls;
