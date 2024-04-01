import { User, Users, Plus, Sun, Moon, UserCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import SearchDialog from "./SearchDialog";
import { useThemeContext } from "@/hooks/themeContext";
import { useRoomContext } from "@/hooks/roomContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"
import ProfileDropdown from "./profile-dropdown";

function Sidebar() {
  const themeContext = useThemeContext();
  const roomContext = useRoomContext();

 
  return (
    <TooltipProvider>
      <div className="hidden sm:flex flex-col items-end gap-y-2 z-10 absolute sm:static">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" onClick={() => themeContext.toggleTheme()}>
              {themeContext.theme == "light" ? <Moon size={18} /> : <Sun size={18} />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">Toggle Theme</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <ProfileDropdown />
        </Tooltip>
        <Button size={"icon"} title="Filter groups" onClick={() => {
          roomContext.toggleFilter()
        }}>
          {roomContext.filterGroups ? <User size={18} /> : <Users size={18} />}
        </Button>
        <SearchDialog>
          <Button
            size={"icon"}
          >
            <Plus size={18} />
          </Button>
        </SearchDialog>
      </div>
    </TooltipProvider>
  );
}

export default Sidebar;
