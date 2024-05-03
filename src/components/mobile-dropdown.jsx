import React from "react";

import { LogOut, Moon, MoreVertical, Plus, Sun, User, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import SearchDialog from "./SearchDialog";
import Profile from "./Profile";

import { useThemeContext } from "@/hooks/themeContext";
import { useAuthContext } from "@/hooks/authContext";
import { useRoomContext } from "@/hooks/roomContext";
import { logout } from "@/api/auth/auth";

function MobileDropdown() {
  const { toast } = useToast();
  const themeContext = useThemeContext();
  const authContext = useAuthContext();
  const roomContext = useRoomContext();

  async function handleLogout() {
    authContext.setIsLoading(true);
    const res = await logout();
    if (!res) {
      toast({
        title: "Internal Server Error",
        variant: "destructive"
      });
    }
    else if (!res.success) {
      toast({
        title: res.msg,
        variant: "destructive"
      });
    }
    else {
      setTimeout(() => {
        toast({
          title: res.msg,
          variant: "primary"
        });
      }, 500);
    }

    authContext.logoutUser();
    setTimeout(() => {
      authContext.setIsLoading(false);
    }, 500);
  }

  return (
    <DropdownMenu className="">
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="bg-transperent hover:bg-transperent ml-auto block px-0 focus-visible:ring-offset-0 focus-visible:ring-0
          hover:text-primary-foreground sm:hidden"
        >
          <MoreVertical size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={"end"}
        alignOffset={-38}
        className="block sm:hidden"
      >
        <Profile profile={authContext.user.profile}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <div className="flex space-x-2 text-xs">
              <User size={16} className="text-primary" />
              <span>Profile</span>
            </div>
          </DropdownMenuItem>
        </Profile>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={(e) => roomContext.toggleFilter()}>
          <div className="flex space-x-2 text-xs">
            {roomContext.filterGroups ? <User size={16} className="text-primary" /> : <Users size={16} className="text-primary" />}
            <span>{roomContext.filterGroups ? "DMs" : "Groups"}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
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
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <div className="flex space-x-2 text-xs">
              <Plus size={16} className="text-primary" />
              <span>Add user or create group</span>
            </div>
          </DropdownMenuItem>
        </SearchDialog>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <div className="flex space-x-2 text-xs" >
            <LogOut size={16} className="text-primary" />
            <span>Log out</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MobileDropdown;
