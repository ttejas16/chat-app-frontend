import { useChatContext } from "@/hooks/chatContext";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { Button } from "./button";
import { ArrowLeftIcon, Circle, Dot, MoreVertical, Search } from "lucide-react";

function ChatHeader({ chat, isOnline, setIsVisible }) {
    const chatContext = useChatContext();

    return (
        <div className="bg-background h-16 flex justify-between items-center px-0 md:px-4 border border-border shadow-sm rounded-md">
            <div className="flex space-x-0 lg:space-x-2  items-center">

                <Button size={"sm"} variant={"ghost"} className="flex text-foreground md:hidden" onClick={() => {
                    setIsVisible(false);
                }}>
                    <ArrowLeftIcon className="size-[15px] sm:size-[18px]" />
                </Button>

                <Avatar className="size-8 lg:size-10">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-muted text-muted-foreground text-xs md:text-sm">
                        <span>{chat.roomName?.split(" ").map((v) => v[0]).join("")}</span>
                    </AvatarFallback>
                </Avatar>

                <div className="grid pl-2 lg:pl-0">
                    <span className="text-sm font-medium text-foreground tracking-wide line-clamp-1">
                        {chat.roomName}
                    </span>
                    <span className="text-muted-foreground text-xs md:text-sm line-clamp-1">
                        {isOnline ? "online" : null}
                    </span>
                </div>
            </div>
            <div className="flex items-center lg:space-x-2 ">

                <Button variant={"ghost"} size={"xs"} className="text-foreground hover:bg-inherit cursor-default">
                    <Circle className="size-[6px] lg:size-[8px]" 
                            color={isOnline ? "lightGreen" : "none"} 
                            fill={isOnline ? "lightGreen": "none"}
                    />
                </Button>
                <Button variant={"ghost"} size={"sm"} className="text-foreground">
                    <Search className="size-[15px] lg:size-[18px]" />
                </Button>
                <Button variant={"ghost"} size={"sm"} className="text-foreground">
                    <MoreVertical className="size-[15px] lg:size-[18px]" />
                </Button>

            </div>
        </div>
    )
}

export default ChatHeader;