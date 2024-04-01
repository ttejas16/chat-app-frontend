import { Sprout, TreePine, Trees } from "lucide-react";

function EmptyRoomList() {

    return (
        <div className="flex w-full h-full justify-center items-center relative">
            <div className="absolute top-0 sm:top-10 right-6 sm:left-0 
                            flex sm:flex-row-reverse sm:justify-end items-end">

                <p className="text-sm sm:text-base text-primary px-2 relative top-2 sm:top-10 sm:-left-8">
                    Start Here!
                </p>
                <img src="/src/assets/arrow.svg" alt="arrow svg" className=" rotate-0 sm:-rotate-90" />
            </div>
            <div className="w-full flex flex-wrap space-x-2 justify-center items-center text-foreground">
                <span className="text-center">
                    You don't have any conversations 
                </span>
                <Sprout strokeWidth={1.5} className=" size-5"/>
            </div>
        </div>
    )
}

export default EmptyRoomList;