import { useAuthContext } from "@/hooks/authContext";
import Message from "./ui/message";
import Spinner from "./ui/spinner";
import { ScrollArea } from "./ui/scroll-area";
import { Telescope } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";


function ChatMessages({ chat, isChatLoading, messages }) {
  // const [intersecting,setIntersecting] = useState(false);
  const authContext = useAuthContext();
  // console.log(authContext.user);
  const userId = authContext.user.profile.id;
  // console.log(messages);

  // const observer = useRef(null);
  // const firstMessageRef = useCallback((msg) => {

    
  //   if (!msg) {
  //     return;
  //   }

  //   if (observer.current) {
  //     observer.current.disconnect();
  //   }

  //   observer.current = new IntersectionObserver((entries) => {
  //     if (entries[0].isIntersecting) {
  //       setIntersecting(true);
  //     }
  //   })

  //   if (msg) {
  //     observer.current.observe(msg);
  //   }
  // });

  // useEffect(()=>{ 
  //   if (intersecting) {
  //     console.log("fetching"); 
  //     setIntersecting(false); 
  //   }
  // },[intersecting]);

  return (
    <div className="relative overflow-y-auto flex flex-col bg-background border border-border shadow-sm rounded-md">
      <img
        src="/src/assets/tten.svg"
        alt="pattern"
        className="absolute left-0 top-0 h-full w-full object-cover opacity-[0.5]"
      />
      {isChatLoading ? (
        <div className="self-center my-auto">
          <Spinner loading={isChatLoading} className="w-9 h-9" />
        </div>
      ) : (
        <ScrollArea className="w-full h-full">
          <div className="w-full h-full flex flex-col items-start py-4 gap-y-2 px-3 sm:px-6">
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
                  ref={null}
                  key={index}
                  userName={message.userName}
                  message={message.content}
                  fromCurrentUser={message.userId == userId}
                />
              )
            })}

          </div>
        </ScrollArea>
      )}
    </div>
  );
}

export default ChatMessages;
