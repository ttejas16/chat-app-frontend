import { forwardRef } from "react";

function Message({ fromCurrentUser, message, userName }, ref) {
  if (!fromCurrentUser) {
    return (
      <div ref={ref} className="flex flex-col">
        <div
          className="relative max-w-[50vw] md:max-w-[25vw] flex flex-col self-start rounded-md 
            rounded-tl-none bg-secondary px-3 py-2 text-foreground"
        >
          <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
            {userName}
          </span>
          <span className="text-xs md:text-sm">{message}</span>

          <div
            className="absolute -left-2 -top-0 border-b-0
                    border-l-8 
                    border-t-8 
                    border-solid 
                    border-secondary 
                    border-x-transparent
                    border-t-secondary"
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="flex relative max-w-[50vw] sm:max-w-[40vw] md:max-w-[25vw] self-end rounded-md rounded-tr-none bg-primary/90
     p-3 text-white">
      <span className="text-xs md:text-sm">{message}</span>
      <div
        className="absolute -right-2 top-0 border-b-0
                border-r-8 
                border-t-8 
                border-solid 
                border-secondary 
                border-x-transparent 
                border-t-primary/80"
      ></div>
    </div>
  );
}

export default forwardRef(Message);
