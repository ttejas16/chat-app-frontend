import React from "react";
import { LogOut, User } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { useToast } from "./ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Profile from "./Profile";

import { useAuthContext } from "@/hooks/authContext";
import { logout } from "@/api/auth/auth";

function ProfileDropdown() {
    const { toast } = useToast();
    const authContext = useAuthContext();

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

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer w-11 h-11 relative overflow-visible text-foreground">
                    <AvatarImage src={authContext.user.profile.avatar} className="rounded-full" />
                    <AvatarFallback>
                        {authContext.user.profile.userName?.split(" ").slice(0, 2).map((v) => v[0]).join("")}
                    </AvatarFallback>
                    <div className="w-3 h-3 bg-green-500 rounded-full absolute z-10 bottom-0 -right-1"></div>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="hidden sm:block" align={"start"}>

                <Profile profile={authContext.user.profile}>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <div className="flex space-x-2 text-xs w-full h-full">
                            <User size={16} className="text-primary" />
                            <span>Profile</span>
                        </div>
                    </DropdownMenuItem>
                </Profile>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <div className="flex space-x-2 text-xs" >
                        <LogOut size={16} className="text-primary" />
                        <span>Log out</span>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}

export default ProfileDropdown;