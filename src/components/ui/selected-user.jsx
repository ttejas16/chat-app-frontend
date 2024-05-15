import React from "react";
import { Check, X } from "lucide-react";

function SelectedUser({ user, setSelectedUsers, setResultSet, set }) {

    return (
        <div
            onClick={() => {
                setSelectedUsers((prev) => {
                    return prev.filter((u) => {
                        return u.id != user.id
                    })
                })
                setResultSet((prev) => {
                    return [user, ...prev];
                })
                set.delete(user.id);
            }}
            className="flex items-center justify-between py-2 px-3 rounded-sm cursor-pointer bg-primary text-primary-foreground"
        >
            <div className="text-xs font-semibold line-clamp-1">
                {user.userName}
            </div>
            <X className="size-4 sm:size-5" />
        </div>
    )
}

export default SelectedUser;