import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

function Spinner({ className, loading }) {
    if (typeof className != "string") {
        className = "";
    }
    return (
        <div className="w-full h-6 flex justify-center">
            {
                loading &&
                <Loader2
                    strokeWidth={2}
                    className={cn("scale-1 animate-spin text-primary", className)}
                />
            }
        </div>
    )
}

export default Spinner;