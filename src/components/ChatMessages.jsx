import { useAuthContext } from "@/hooks/authContext";
import Message from "./ui/message";
import Spinner from "./ui/spinner";
import { ScrollArea } from "./ui/scroll-area";
import { Telescope } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useChatContext } from "@/hooks/chatContext";
import Pattern from "../assets/tten.svg";
import TypingBubble from "./ui/typing-bubble";

function ChatMessages({ chat, isChatLoading, messages }) {
  const authContext = useAuthContext();
  const chatContext = useChatContext();
  const userId = authContext.user.profile.id;

  const bottomDivisionRef = useRef();
  const firstMessageRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    if (bottomDivisionRef.current) {
      bottomDivisionRef.current.scrollIntoView();
    }
  }, [isChatLoading, messages])



  return (
    <div className="relative overflow-y-hidden flex flex-col bg-secondary border border-border shadow-sm rounded-md">
      <img
        src={Pattern}
        alt="pattern"
        className="absolute text-purple-500 left-0 top-0 h-full w-full object-cover opacity-[0.5]"
      />
      {isChatLoading ? (
        <div className="self-center my-auto">
          <Spinner loading={isChatLoading} className="w-9 h-9" />
        </div>
      ) : (
        <>
          <ScrollArea ref={containerRef} className="w-full h-full">
            <div ref={null} className="relative w-full h-full flex flex-col items-start py-4 gap-y-2 px-3 sm:px-6">
              {!isChatLoading && messages.length == 0 &&
                <div className="flex flex-col items-center self-center relative 
              text-center text-foreground text-xs sm:text-sm lg:text-base space-y-2">
                  <span>This is the beginning of your conversation with {chat.roomName}</span>
                  <Telescope strokeWidth={1} className="size-6 md:size-8" />
                </div>
              }
              {messages.map((message, index) => {
                return (
                  <Message
                    ref={index == 0 ? firstMessageRef : null}
                    key={index}
                    userName={message.userName}
                    message={message.content}
                    fromCurrentUser={message.userId == userId}
                  />
                )
              })}
            </div>

            <div ref={bottomDivisionRef}></div>
          </ScrollArea>
          {chatContext.typer.isTyping && <TypingBubble userName={chatContext.typer.userName} />}
        </>
      )}
    </div>
  );
}

export default ChatMessages;
