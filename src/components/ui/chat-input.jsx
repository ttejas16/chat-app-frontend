import { useState } from "react";
import { Button } from "./button";
import { Plus, Send, SmilePlus, Squirrel } from "lucide-react";
import { Input } from "./input";

import { socket } from "@/api/socketConfig";
import { useAuthContext } from "@/hooks/authContext";
import { Textarea } from "./textarea";

function ChatInput() {
    const authContext = useAuthContext();
    const [inputMessage, setInputMessage] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
       
        const userId = authContext.user.profile.id;
        const userName = authContext.user.profile.userName;

        if (socket.connected) {
            const message = {
                content: inputMessage,
                userId: userId,
                userName: userName
            }
            socket.emit('message', message);
        }
        setInputMessage("");
    }


    return (
        <div className="rounded-md flex items-start gap-x-1 sm:gap-x-3">
            <Button size={"icon"}>
                <Squirrel size={18}/>
            </Button>
            <form onSubmit={handleSubmit} className="w-full flex gap-x-1 sm:gap-x-3">
                <Input
                    placeholder="Enter a message"
                    className="bg-background text-foreground text-sm py-5 shadow-sm rounded-md focus-visible:ring-offset-0 focus-visible:ring-0"
                    value={inputMessage}
                    onChange={(e) => {
                        setInputMessage(e.target.value);
                    }}
                />
                <Button
                    size={"icon"}
                    className=""
                    type="submit"
                    disabled={inputMessage.trim().length == 0}
                >
                    <Send size={18}/>
                </Button>
            </form>
        </div>
    )
}

export default ChatInput;