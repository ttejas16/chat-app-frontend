import { createContext, useContext } from "react";

const SocketContext = createContext();

function useSocketContext(){
    return useContext(SocketContext);
}

export { SocketContext,useSocketContext };