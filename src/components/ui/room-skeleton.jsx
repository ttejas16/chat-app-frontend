import React from "react";
import { Skeleton } from "./skeleton";
import { Separator } from "./separator";

function RoomSkeleton() {

    return (
        <>
            <div className="w-full flex space-x-4 p-5 bg-background border border-border">
                <Skeleton className="h-9 w-9 rounded-full bg-muted shrink-0" />
                <div className="space-y-2 w-full">
                    <Skeleton className="w-[40%] h-3 rounded-md bg-muted" />
                    <Skeleton className="w-[80%] h-3 rounded-md bg-muted" />
                </div>
            </div>
        </>
    )
}

export default RoomSkeleton;