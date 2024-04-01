import { useState, useEffect, useReducer, useCallback } from "react";

import { ChatContext } from "@/hooks/chatContext";

import { initialChat, chatReducer } from "@/store/chatReducer";
import { initialMessages, messagesReducer } from "@/store/messagesReducer";

import { socket } from "@/api/socketConfig";
import { getMessages } from "@/api/chat/message";
import { useToast } from "./ui/use-toast";
import { useAuthContext } from "@/hooks/authContext";
import { useRoomContext } from "@/hooks/roomContext";

function ChatProvider({ children }) {
  const authContext = useAuthContext();
  const roomContext = useRoomContext();
  // console.log(roomContext.rooms);

  const { toast } = useToast();
  const [chat, chatDispatch] = useReducer(chatReducer, initialChat);
  const [messages, messagesDispatch] = useReducer(
    messagesReducer,
    initialMessages,
  );

  const [isChatLoading, setIsChatLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(false);

  function setChat({ chat = {} }) {
    chatDispatch({ type: "SET_CHAT", payload: chat });
  }

  function resetChat() {
    chatDispatch({ type: "RESET_CHAT", payload: chat });
  }

  function setMessages({ messages = [] }) {
    messagesDispatch({ type: "SET_MESSAGES", payload: messages });
  }

  function resetMessages({ messages = [] }) {
    messagesDispatch({ type: "RESET_MESSAGES", payload: messages });
  }

  function addMessage({ message = {} }) {
    messagesDispatch({ type: "ADD_MESSAGE", payload: message });
  }

  async function fetchMessages() {
    const res = await getMessages({ roomId: chat.id });

    if (!res) {
      toast({
        variant: "destructive",
        title: "Internal Server Error!",
      });
      return;
    }

    if (!res.success) {
      toast({
        variant: "warning",
        title: res.msg,
      });
      return;
    }

    setMessages({ messages: res.messages });

    setTimeout(() => {
      setIsChatLoading(false);
    }, 500);
  }

  useEffect(() => {
    if (chat.id == -1) {
      return;
    }

    fetchMessages();

    socket.emit('join-room', chat.id);
    socket.on("message", (msg) => {
      console.log("message received");
      addMessage({ message: msg });
    });

    // if (!chat.isGroup) {
    //   socket.on("online", (msg) => {
    //     setIsOnline(msg.isOnline);
    //   });
    //   socket.emit("online", { isOnline: true }, (isOnline) => {
    //     if (isOnline) {
    //       setIsOnline(true);
    //     }
    //   });
    // }

    return () => {
      resetMessages({ messages: [] });
      setIsChatLoading(true);
      setIsOnline(false);
      // socket.removeListener("online");
      socket.removeListener("message");
      socket.emit('leave-room', chat.id);
    };

  }, [chat]);



  const updateRooms = useCallback((msg) => {
    if (msg.userId == authContext.user.profile.id ||
      msg.roomId == chat.id) {
      return;
    }
    console.log(msg.roomId);
    console.log(chat.id);

    // update the rooms and set whose notification was received
    let updatedRooms = roomContext.rooms.map((room) => {
      if (room.id == msg.roomId) {

        room.hasNotification = true;
        room.notifications.push({
          content: msg.content,
          from: msg.userName
        });

      }
      return room;
    });
    // console.log(roomContext.rooms);
    // console.log(updatedRooms);

    updatedRooms.sort((a, b) => {
      if (a.hasNotification && b.hasNotification) {
        return b.notifications.length - a.notifications.length;
      }

      if (a.hasNotification) {
        return -1;
      }
      else if (b.hasNotification) {
        return 1;
      }

      return 0;
    })

    roomContext.updateRooms({ _rooms: updatedRooms });
  }, [authContext.user, roomContext.rooms, chat]);


  useEffect(() => {
    // console.log("ran");
    if (!authContext.user.isAuthenticated) {
      return;
    }

    socket.auth = {
      userId: authContext.user.profile.id
    };
    socket.connect();

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    }

  }, [authContext.user]);

  useEffect(() => {
    if (!authContext.user.isAuthenticated) {
      return;
    }

    socket.on('notification', updateRooms);

    return () => {
      socket.removeListener('notification');
    }
  }, [authContext.user, roomContext.rooms, chat]);



  return (
    <ChatContext.Provider
      value={{
        isChatLoading,
        isOnline,
        chat,
        setChat,
        resetChat,
        messages,
        setMessages,
        addMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export default ChatProvider;
