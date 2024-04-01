import React from "react";
import { Check, X } from "lucide-react";

function SelectedUser({ user, setSelectedUsers, set }) {

    return (
        <div
            onClick={() => {
                setSelectedUsers((prev) => {
                    return prev.filter((u) => {
                        return u.id != user.id
                    })
                })
                set.delete(user.id);
            }}
            className="flex items-center justify-between p-2 rounded-sm cursor-pointer bg-primary text-primary-foreground"
        >
            <div className="text-xs sm:text-sm">
                {user.userName}
            </div>
            <X className="size-4 sm:size-5"/>
        </div>
    )
}

export default SelectedUser;