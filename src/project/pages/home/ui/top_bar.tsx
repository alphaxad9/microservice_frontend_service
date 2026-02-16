import { RootState } from "../../../entities/store";
import { useSelector } from "react-redux";
import { Bell } from "lucide-react";
import ToggleButton from "../../../freatures/toggle-theme/ui/ThemeToggle";
import HomeSearch from "../../../freatures/seach_bar/home/search_bar";

interface TopBarProps {
  isVisible: boolean;
}

const TopBar = ({ isVisible }: TopBarProps) => {
  const darkmode = useSelector((state: RootState) => state.theme.isDark);

  return (
    <div
      className={`
        ${darkmode ? "bg-dark_primary2" : "bg-light_primary"} 
        p-1 flex items-center space-x-2 w-full 
        sticky top-0 z-10
        transition-transform duration-300 ease-in-out
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <HomeSearch />
      <button className="p-2 hover:bg-myhover rounded-full transition-colors">
        <Bell className="w-5 h-5" />
      </button>
      <ToggleButton />
    </div>
  );
};

export default TopBar;