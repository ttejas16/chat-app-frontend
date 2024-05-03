import { User, Users, Plus, Sun, Moon } from "lucide-react";

import { Button } from "./ui/button";
import SearchDialog from "./SearchDialog";
import ProfileDropdown from "./profile-dropdown";

import { useRoomContext } from "@/hooks/roomContext";
import { useDialogContext } from "@/hooks/dialogContext";
import { useThemeContext } from "@/hooks/themeContext";

function Sidebar() {
  const themeContext = useThemeContext();
  const roomContext = useRoomContext();
  const dialogContext = useDialogContext();

  return (
    <div className="hidden sm:flex flex-col items-center gap-y-2 z-10 absolute sm:static">
      <ProfileDropdown />
      <Button size="icon" title="Toggle Theme" onClick={() => themeContext.toggleTheme()}>
        {themeContext.theme == "light" ? <Moon size={18} /> : <Sun size={18} />}
      </Button>
      <Button size={"icon"} title="Filter groups" onClick={() => { roomContext.toggleFilter() }}>
        {roomContext.filterGroups ? <User size={18} /> : <Users size={18} />}
      </Button>
      <SearchDialog>
        <Button size={"icon"} title="Add Users" onClick={(e) => dialogContext.setIsOpen(true)}>
          <Plus size={18} />
        </Button>
      </SearchDialog>
    </div>
  );
}

export default Sidebar;
