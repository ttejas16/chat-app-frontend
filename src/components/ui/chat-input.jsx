import { useState } from "react";
import { Send } from "lucide-react";

import { Button } from "./button";
import { Input } from "./input";
import CustomEmojiPicker from "./emoji-picker";

import { socket } from "@/api/socketConfig";
import { useAuthContext } from "@/hooks/authContext";
import { useChatContext } from "@/hooks/chatContext";

function ChatInput() {

  const chatContext = useChatContext();
  const authContext = useAuthContext();
  const [inputMessage, setInputMessage] = useState("");

  function handleEmojiSelect(e) {
    setInputMessage(inputMessage + e.currentTarget.innerText);
  }
  function handleSubmit(e) {
    e.preventDefault();

    const userId = authContext.user.profile.id;
    const userName = authContext.user.profile.userName;

    if (socket.connected) {
      const message = {
        content: inputMessage,
        userId: userId,
        userName: userName,
        roomName: chatContext.chat.isGroup ? chatContext.chat.roomName : '',
        isGroup: chatContext.chat.isGroup
      }
      socket.emit('message', message);
    }
    setInputMessage("");
  }


  return (
    <div className="rounded-md flex items-start gap-x-1 sm:gap-x-3 relative">
      <CustomEmojiPicker onEmojiClick={handleEmojiSelect} />
      <form onSubmit={handleSubmit} className="w-full flex gap-x-1 sm:gap-x-3">
        <Input
          placeholder="Enter a message"
          className="bg-secondary text-foreground text-sm py-5 shadow-sm rounded-md focus-visible:ring-offset-0 focus-visible:ring-0"
          value={inputMessage}
          onChange={(e) => {
            setInputMessage(e.target.value);
          }}
          onFocus={(e) => {
            e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length);
          }}
        />
        <Button
          size={"icon"}
          className=""
          type="submit"
          disabled={inputMessage.trim().length == 0}
        >
          <Send size={18} />
        </Button>
      </form>
    </div>
  )
}

export default ChatInput;