import { useState } from "react";

import ChatHeader from "./ui/chat-header";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ui/chat-input";

import clsx from "clsx";
import { cn } from "@/lib/utils";

import { useChatContext } from "@/hooks/chatContext";

function ChatBox() {
  const [isVisible, setIsVisible] = useState(true);
  const chatContext = useChatContext();

  const classList =
    "bg-background absolute md:static px-2 sm:px-0 left-0 h-full w-full grid grid-rows-[64px_1fr_64px] gap-y-3 rounded-md z-10 md:animate-none";
  const animationClass = clsx("", {
    "animate-slideIn": isVisible,
    "animate-slideOut": !isVisible,
  });

  return (
    <div
      onAnimationEnd={() => {
        if (!isVisible) {
          chatContext.resetChat();
        }
      }}
      className={cn(classList, animationClass)}
    >
      <ChatHeader
        chat={chatContext.chat}
        isOnline={chatContext.isOnline}
        setIsVisible={setIsVisible}
      />
      <ChatMessages
        chat={chatContext.chat}
        isChatLoading={chatContext.isChatLoading}
        messages={chatContext.messages}
      />
      <ChatInput />
    </div>
  );
}

export default ChatBox;
