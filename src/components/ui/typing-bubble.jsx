import { useEffect, useState } from "react";


function TypingBubble({ userName }) {

    return (
        <div className={`bg-primary rounded-t-sm px-3 py-1 text-foreground w-full 
        text-[0.73rem] text-white font-semibold absolute bottom-0 animate-slideUp`}>
            {userName} is typing...
        </div>
    )
}

export default TypingBubble;