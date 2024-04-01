import Sidebar from "@/components/SideBar"
import RoomList from "@/components/RoomList"
import ChatBox from "@/components/ChatBox"
import EmptyChat from "./ui/empty-chat";
import { useChatContext } from "@/hooks/chatContext";
import { useEffect, useState } from "react";

const mediumDeviceWidth = 768;

function Home() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= mediumDeviceWidth);
    const chatContext = useChatContext();

    function updateMedia() {
        setIsMobile(window.innerWidth <= mediumDeviceWidth);

    }

    useEffect(() => {
        window.addEventListener('resize', updateMedia);

        return () => {
            window.removeEventListener('resize', updateMedia);
        }
    }, []);

    return (
        <div className="h-full w-full bg-inherit flex gap-x-3 px-5 sm:px-0 relative overflow-hidden">
            <Sidebar />
            <RoomList />

            { chatContext.chat.id == -1 && !isMobile && <EmptyChat/>}
            { chatContext.chat.id != -1 && <ChatBox />}
            

        </div>
    )
}

export default Home;