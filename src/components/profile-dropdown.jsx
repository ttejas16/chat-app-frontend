import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip"
import { Button } from "./ui/button";
import { UserCircleIcon, User, LogOut } from "lucide-react";
import { logout } from "@/api/auth/auth";
import { useToast } from "./ui/use-toast";
import { useAuthContext } from "@/hooks/authContext";

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
                <Button size={"icon"}>
                    <UserCircleIcon size={18} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="hidden sm:block" align={"start"}>
                <DropdownMenuItem>
                    <div className="flex space-x-2 text-xs">
                        <User size={16} className="text-primary" />
                        <span>Profile</span>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <div className="flex space-x-2 text-xs" onClick={handleLogout}>
                        <LogOut size={16} className="text-primary" />
                        <span>Log out</span>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}

export default ProfileDropdown;