import { createContext, useContext } from "react";

const RoomContext = createContext();

function useRoomContext() {
    return useContext(RoomContext);
}

export { RoomContext, useRoomContext };