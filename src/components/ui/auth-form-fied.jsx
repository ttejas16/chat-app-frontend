import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Input } from "./input";

const AuthFormField = forwardRef((props, ref) => {
    return (
        <Input
            ref={ref}
            className={cn(
                "text-lg py-6 bg-secondary rounded-none border-0 border-b-2 border-foreground focus-visible:ring-offset-0 focus-visible:ring-0",
                )}
            type={props.type}
            {...props}
        />
    )
})

export default AuthFormField;

