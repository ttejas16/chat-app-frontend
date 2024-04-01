import { useReducer, useState, useEffect } from "react";

import { RoomContext } from "@/hooks/roomContext";
import { useAuthContext } from "@/hooks/authContext";

import { initialRooms, roomReducer } from "@/store/roomReducer";

import { getRooms } from "@/api/chat/room";
import { useToast } from "./ui/use-toast";

function RoomProvider({ children }) {
    const { toast } = useToast();
    const authContext = useAuthContext();
    const [rooms, roomsDispatch] = useReducer(roomReducer, initialRooms);
    const [isRoomsLoading, setIsRoomsLoading] = useState(true);
    const [filterGroups, setFilterGroups] = useState(false);

    function setRooms({ rooms = [] }) {
        rooms = rooms.map(room => {
            room.hasNotification = false;
            room.notifications = [];

            return room;
        });
        roomsDispatch({ type: 'SET_ROOMS', payload: rooms });
    }

    function resetRooms({ rooms = initialRooms }) {
        roomsDispatch({ type: 'RESET_ROOMS', payload: rooms });
    }

    function updateRooms({ _rooms = rooms }) {
        roomsDispatch({ type: 'UPDATE_ROOMS', payload: _rooms });
    }

    function appendRoom({ room = {} }) {
        console.log(room);
        
        if (Object.keys(room).length > 0) {
            room.hasNotification = false;
            room.notifications = [];
        }
        roomsDispatch({ type: 'APPEND_ROOM', payload: room });
    }

    function toggleFilter() {
        setFilterGroups(!filterGroups);
    }

    async function getInitialRooms() {
        const userId = authContext.user.profile.id;

        const res = await getRooms({ userId: userId });

        if (!res) {
            toast({
                variant: "destructive",
                title: "Internal Server Error"
            })
            return;
        }

        if (!res.success) {
            console.log(res);
            toast({
                variant: "destructive",
                title: res.msg
            })
            return;
        }

        setRooms({ rooms: res.rooms });
        setIsRoomsLoading(false);
    }

    useEffect(() => {
        if (!authContext.user.isAuthenticated) {
            return;
        }
        // fetch rooms of user on initial load
        const timeoutId = setTimeout(() => {
            getInitialRooms();
        }, 1500);

        return () => {
            setIsRoomsLoading(true);
            resetRooms({ rooms: [] });
            clearTimeout(timeoutId);
        }
    }, [authContext.user]);

    return (
        <RoomContext.Provider value={{
            isRoomsLoading,
            setIsRoomsLoading,
            rooms: filterGroups ? rooms.filter((room) => room.isGroup) : rooms,
            setRooms,
            appendRoom,
            updateRooms,
            filterGroups,
            toggleFilter
        }}>
            {children}
        </RoomContext.Provider>
    )
}

export default RoomProvider;