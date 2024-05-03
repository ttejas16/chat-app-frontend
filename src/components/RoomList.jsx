import { Fan } from "lucide-react";

import Room from "./ui/room";
import RoomSkeleton from "./ui/room-skeleton";
import EmptyRoomList from "./ui/empty-room-list";
import { ScrollArea } from "./ui/scroll-area";

import { useRoomContext } from "@/hooks/roomContext";
import { useChatContext } from "@/hooks/chatContext";
import { useAuthContext } from "@/hooks/authContext";
import MobileDropdown from "./mobile-dropdown";

function RoomList() {
    const roomContext = useRoomContext();
    const chatConext = useChatContext();
    const authContext = useAuthContext();

    return (
        <div className="flex flex-col w-full justify-start sm:w-[450px] relative gap-y-3 z-10">
            <div className="flex w-full h-16 shrink-0 px-6 items-center bg-primary/90 text-white gap-x-2 rounded-md shadow-sm sticky top-0 group">
                <Fan className="group-hover:rotate-[85deg] group-hover:scale-1 duration-150 ease-in-out" />
                <h3 className="text-lg md:text-xl font-medium">Sttacked</h3>
                <MobileDropdown />
            </div>

            <div className="w-full h-full overflow-y-auto rounded-md flex h-full flex-col gap-y-2 items-start">
                {
                    roomContext.isRoomsLoading ?
                        Array.from({ length: 8 }).map((_, index) => {
                            return (
                                <RoomSkeleton key={index} />
                            )
                        }) :
                        roomContext.rooms.map((room, index) => {

                            return (
                                <Room
                                    key={index}
                                    room={room}
                                    currentChat={chatConext.chat}
                                    setChat={chatConext.setChat}
                                    updatedRoom={roomContext.updateRooms}
                                    userId={authContext.user.profile?.id}
                                />
                            )
                        })
                }
                {
                    roomContext.rooms.length == 0 && !roomContext.isRoomsLoading &&
                    <EmptyRoomList />
                }
            </div>
        </div>
    )
}

export default RoomList;