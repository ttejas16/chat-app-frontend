import { useState, useEffect, useReducer, useCallback } from "react";


import { initialChat, chatReducer } from "@/store/chatReducer";
import { initialMessages, messagesReducer } from "@/store/messagesReducer";

import { useToast } from "@/components/ui/use-toast";

import { socket } from "@/api/socketConfig";
import { getMessages } from "@/api/chat/message";
import { ChatContext } from "@/hooks/chatContext";
import { useAuthContext } from "@/hooks/authContext";
import { useRoomContext } from "@/hooks/roomContext";

const initialTyper = { isTyping: false, userName: null };

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
  const [isMoreChatLoading, setIsMoreChatLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [typer, setTyper] = useState(initialTyper);

  function setChat({ chat = {} }) {
    chatDispatch({ type: "SET_CHAT", payload: chat });
  }

  function resetChat() {
    chatDispatch({ type: "RESET_CHAT", payload: initialChat });
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

  function appendMessages({ messages = [] }) {
    messagesDispatch({ type: "APPEND_MESSAGES", payload: messages });
  }

  async function fetchMoreMessages() {
    setIsMoreChatLoading(true);
    const res = await getMessages({ roomId: chat.id });
    setTimeout(() => {
      setIsMoreChatLoading(false);
      appendMessages({ messages: res.messages });
    }, 500);

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
    socket.on('typing', (obj) => {
      setTyper({
        isTyping: obj.isTyping,
        userName: obj.userName
      });
    });
    socket.on("message", (msg) => {
      addMessage({ message: msg });
      // update last message for current room
      const result = roomContext.rooms.map(room => {
        if (room.id == msg.roomId) {
          room.lastMessage = {
            content: msg.content,
            user: {
              id: msg.userId,
              userName: msg.userName
            }
          };
        }

        return room;
      });

      roomContext.updateRooms({ _rooms: result });
    });

    return () => {
      resetMessages({ messages: [] });
      setIsChatLoading(true);
      setIsOnline(false);
      setTyper(initialTyper);
      // socket.removeListener("online");
      socket.removeListener("message");
      socket.removeListener("typing");
      socket.emit('leave-room', chat.id);
    };

  }, [chat]);



  const updateRooms = useCallback((msg) => {
    if (msg.userId == authContext.user.profile.id ||
      msg.roomId == chat.id) {
      return;
    }

    roomContext.notifyRooms({ msg: msg });

  }, [authContext.user, roomContext.rooms, chat]);


  useEffect(() => {
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

  }, [authContext.user.profile.id]);

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
        isMoreChatLoading,
        setIsMoreChatLoading,
        isChatLoading,
        isOnline,
        typer,
        chat,
        setChat,
        resetChat,
        messages,
        setMessages,
        addMessage,
        fetchMoreMessages,
        appendMessages
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export default ChatProvider;
