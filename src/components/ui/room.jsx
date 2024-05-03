import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { useRoomContext } from "@/hooks/roomContext";

function Room({ room, currentChat, setChat, userId, updateRooms }) {
  const roomContext = useRoomContext();
  let lastMessageFrom;

  if (room.isGroup && room.lastMessage) {
    if (room.lastMessage.user.id == userId) {
      lastMessageFrom = "You: ";
    }
    else {
      lastMessageFrom = `~ ${room.lastMessage.user.userName}: `;
    }
  }

  function cancelNotification() {
    const rooms = roomContext.rooms;
    const updatedRooms = rooms.map(_room => {
      if (_room.id == room.id) {
        return {
          ..._room,
          hasNotification: false,
          notifications: []
        }
      }
      return {
        ..._room
      }
    })

    roomContext.updateRooms({ _rooms: updatedRooms });
  }

  return (
    <>
      <div
        className="flex items-center bg-secondary border border-border dark:border-background rounded-md 
        shadow-sm justify-between space-x-4 py-3 px-4 cursor-pointer hover:bg-secondary/70 transition-all w-full"
        onClick={() => {
          if (currentChat.id != room.id) {
            setChat({ chat: room });
            if (room.hasNotification) {
              cancelNotification();
            }
          }
        }}
      >
        <div className="flex space-x-4 items-center">
          <Avatar className="size-8 lg:size-10 relative overflow-visible">
            <AvatarImage src={room.avatar} className="rounded-full" />
            <AvatarFallback className="bg-background/50 text-muted-foreground text-xs md:text-sm">
              {room.roomName?.split(" ").slice(0, 2).map((v) => v[0]).join("")}
            </AvatarFallback>
            {
              !room.isGroup && (
                room.isOnline ?
                  <div className="w-3 h-3 bg-green-500 rounded-full absolute z-10 bottom-0 -right-1"></div> :
                  <div className="w-3 h-3 bg-yellow-500 rounded-full absolute z-10 bottom-0 -right-1"></div>)
            }
          </Avatar>
          <div className="flex flex-col">
            <span className="text-xs md:text-sm font-medium text-foreground">
              {room.roomName}
            </span>
            <span className="text-[0.65rem] md:text-xs text-muted-foreground line-clamp-1">
              {room.isGroup ? lastMessageFrom : null}
              {room.lastMessage ? room.lastMessage.content : null}
            </span>
          </div>
        </div>
        {
          room.hasNotification &&
          <div className=" justify-self-end shrink-0 border bg-green-500 border-none text-background text-[0.65rem] size-5 flex justify-center items-center rounded-full">
            {room.notifications.length}
          </div>
        }
      </div>
    </>
  );
}

export default Room;
