import AuthProvider from "@/providers/AuthProvider";
import ChatProvider from "@/providers/ChatProvider";
import RoomProvider from "@/providers/RoomProvider";
import DialogProvider from "@/providers/DialogProvider";
import { Toaster } from "@/components/ui/toaster";

function Layout({ children }) {

    return (
        <AuthProvider>
            <RoomProvider>
                <ChatProvider>
                    <DialogProvider>
                        <div className="w-full h-screen py-3 sm:py-14 sm:px-20 bg-background">
                            <Toaster />
                            {children}
                        </div>
                    </DialogProvider>
                </ChatProvider>
            </RoomProvider>
        </AuthProvider>
    )
}

export default Layout;