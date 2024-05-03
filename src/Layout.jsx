import AuthProvider from "@/components/AuthProvider";
import ChatProvider from "@/components/ChatProvider";
import RoomProvider from "@/components/RoomProvider";
import DialogProvider from "@/components/DialogProvider";
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