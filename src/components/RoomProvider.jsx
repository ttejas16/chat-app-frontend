import { useReducer, useState, useEffect } from "react";

import { RoomContext } from "@/hooks/roomContext";
import { useAuthContext } from "@/hooks/authContext";

import { initialRooms, roomReducer } from "@/store/roomReducer";

import { getRooms } from "@/api/chat/room";
import { socket } from "@/api/socketConfig";
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
            toast({
                variant: "destructive",
                title: res.msg
            })
            return;
        }


        setRooms({ rooms: res.rooms });
        socket.emit('online', res.rooms.filter(room => !room.isGroup).map(room => {
            return {
                roomId: room.id,
                targetUserId: room.targetUserId
            }
        }), (onlineUsers) => {
            const updatedRooms = res.rooms.map(room => {
                if (onlineUsers[room.id]) {
                    return {
                        ...room,
                        isOnline: true
                    }
                }
                return {
                    ...room,
                    isOnline: false
                }
            });
            updateRooms({ _rooms: updatedRooms });
        });

        setIsRoomsLoading(false);
    }

    useEffect(() => {
        if (!authContext.user.isAuthenticated) {
            return;
        }
        // fetch rooms of user on initial load
        const timeoutId = setTimeout(async () => {
            getInitialRooms();
        }, 1500);

        return () => {
            setIsRoomsLoading(true);
            resetRooms({ rooms: [] });
            clearTimeout(timeoutId);
        }
    }, [authContext.user]);

    useEffect(() => {
        if (!rooms.length) {
            return;
        }

        function handleOnlineEvent(roomId) {

            const updatedRooms = rooms.map(room => {
                if (room.id == roomId) {
                    return {
                        ...room,
                        isOnline: true
                    }
                }

                return room;
            })
            updateRooms({ _rooms: updatedRooms });
        }

        function handleOfflineEvent(userId) {

            const updatedRooms = rooms.map(room => {
                if (room.targetUserId == userId) {
                    return {
                        ...room,
                        isOnline: false
                    }
                }

                return room;
            })
            updateRooms({ _rooms: updatedRooms });
        }

        socket.on('online', handleOnlineEvent);
        socket.on('offline', handleOfflineEvent);

        return () => {
            socket.off('online', handleOnlineEvent);
            socket.off('offline', handleOfflineEvent);
        }

    }, [rooms]);

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