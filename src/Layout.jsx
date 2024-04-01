import AuthProvider from "@/components/AuthProvider";
import ChatProvider from "@/components/ChatProvider";
import RoomProvider from "./components/RoomProvider";
import { Toaster } from "@/components/ui/toaster";

function Layout({ children }) {

    return (
        <AuthProvider>
            <RoomProvider>
                <ChatProvider>
                    <div className="w-full h-screen py-3 sm:py-14 sm:px-20 bg-secondary">
                        <Toaster />
                        {children}
                    </div>
                </ChatProvider>
            </RoomProvider>
        </AuthProvider>
    )
}

export default Layout;