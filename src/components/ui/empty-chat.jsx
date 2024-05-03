import { Bird } from "lucide-react";
import React from "react";

function EmptyChat() {

    return (

        <div className="flex flex-col justify-center items-center w-full h-full 
            bg-secondary border border-border shadow-sm row-span-3">
            <Bird strokeWidth={1} size={100} className="text-primary" />
            <span className="text-muted-foreground text-sm lg:text-xl font-medium mt-2">
                Click on a chat to start messaging!
            </span>
        </div>

    )
}

export default EmptyChat;