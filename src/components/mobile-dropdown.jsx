import React from "react";

import { Moon, MoreVertical, Plus, Sun, User, Users } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { useThemeContext } from "@/hooks/themeContext";
import SearchDialog from "./SearchDialog";
function MobileDropdown() {
  const themeContext = useThemeContext();

  return (
    <DropdownMenu className="">
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="bg-transperent hover:bg-transperent ml-auto block px-0 hover:text-primary-foreground sm:hidden"
        >
          <MoreVertical size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={"end"}
        alignOffset={-38}
        className="block sm:hidden"
      >
        <DropdownMenuItem>
          <div className="flex space-x-2 text-xs">
            <User size={16} className="text-primary" />
            <span>Profile</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="flex space-x-2 text-xs">
            <Users size={16} className="text-primary" />
            <span>Groups</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer focus:bg-inherit"
          onSelect={(e) => {
            e.preventDefault();
            themeContext.toggleTheme();
          }}
        >
          <div className="flex space-x-2 text-xs">
            {themeContext.theme == "light" ? (
              <Moon size={16} className="text-primary" />
            ) : (
              <Sun size={16} className="text-primary" />
            )}
            <span>Theme</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <SearchDialog>
          <DropdownMenuItem onSelect={(e)=> e.preventDefault()}>
            <div className="flex space-x-2 text-xs">
              <Plus size={16} className="text-primary" />
              <span>Add user or create group</span>
            </div>
          </DropdownMenuItem>
        </SearchDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MobileDropdown;
