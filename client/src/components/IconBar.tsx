import { useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import { CircleHelp } from "lucide-react";

const IconBar = () => {
  const navigate = useNavigate();

  const backButton = () => {
    navigate("/create");
  };

  return (
    <div id="icon-bar" className="flex justify-between w-full p-8">
      <MoveLeft
        size={40}
        onClick={backButton}
        className="cursor-pointer text-gray-300 hover:text-white"
      />
      <CircleHelp
        size={40}
        className="cursor-pointer text-gray-300 hover:text-white"
      />
    </div>
  );
};

export default IconBar;
