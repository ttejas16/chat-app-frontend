import React, { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip"
import { Button } from "./ui/button";
import { UserCircleIcon, User, LogOut } from "lucide-react";
import { getProfile, logout } from "@/api/auth/auth";
import { useToast } from "./ui/use-toast";
import { useAuthContext } from "@/hooks/authContext";
import Profile from "./Profile";

function ProfileDropdown() {
    const { toast } = useToast();
    const authContext = useAuthContext();
    const [profileLoading, setProfileLoading] = useState(true);
    const [profile, setProfile] = useState({});


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

    async function fetchProfile() {
        const res = await getProfile();
        if (!res) {
            toast({
                title: "Internal Server Error!",
                variant: "destructive"
            });
            return;
        }

        if (!res.success) {
            toast({
                title: res.msg,
                variant: "destructive"
            });
            return;
        }

        setProfile({
            ...res.profile
        });
        setTimeout(() => {
            setProfileLoading(false);
        }, 2000);
    }

    useEffect(() => {
        fetchProfile();

        return () => {
            setProfile({});
            setProfileLoading(true);
        }
    }, []);

    return (

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={"icon"}>
                    <UserCircleIcon size={18} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="hidden sm:block" align={"start"}>
                <Profile profile={profile} profileLoading={profileLoading}>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <div className="flex space-x-2 text-xs w-full h-full">
                            <User size={16} className="text-primary" />
                            <span>Profile</span>
                        </div>
                    </DropdownMenuItem>
                </Profile>

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