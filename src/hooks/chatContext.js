import { createContext,useContext } from "react";

const ChatContext = createContext();

function useChatContext(){
    return useContext(ChatContext);
}

export { ChatContext,useChatContext };