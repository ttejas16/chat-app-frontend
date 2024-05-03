import React, { useEffect, useRef, useState } from "react";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useToast } from "./ui/use-toast";
import { Separator } from "./ui/separator";

import Spinner from "./ui/spinner";
import SelectedUser from "./ui/selected-user";
import ResultUser from "./ui/result-user";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { Snail } from "lucide-react";
import { addRoom, searchUsers } from "@/api/chat/room";
import { useAuthContext } from "@/hooks/authContext";
import { useRoomContext } from "@/hooks/roomContext";
import { useDialogContext } from "@/hooks/dialogContext";

function SearchDialog({ children }) {
  const authContext = useAuthContext();
  const roomContext = useRoomContext();
  const dialogContext = useDialogContext();

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  // roomtype = 'group' | 'single'
  const [roomType, setRoomType] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [email, setEmail] = useState("");

  const [resultSet, setResultSet] = useState([]);
  const [resultMessage, setResultMessage] = useState(null);
  const [selectedusers, setSelectedUsers] = useState([]);

  const setReference = useRef(new Set());

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      setResultMessage(null);

      if (email) {
        setIsLoading(true);
        const res = await searchUsers({ email: email });

        setIsLoading(false);
        if (!res) {
          toast({
            variant: "destructive",
            title: "Internal Server Error",
          });
          return;
        }

        if (res.users.length == 0) {
          setResultMessage("No Users Found");
        }

        setResultSet([...res.users]);
      }
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [email]);

  async function addUser() {
    const userId = authContext.user.profile.id;

    if (roomType == "group" && !roomName.trim()) {
      toast({
        variant: "warning",
        title: "Please Specify Group Name",
      });
      return;
    }

    if (selectedusers.length == 0) {
      toast({
        variant: "warning",
        title: "No User Selected",
      });
      return;
    }

    const res = await addRoom({
      roomName: roomName.trim(),
      userId: userId,
      participantIds: selectedusers.map((v) => v.id),
      isGroup: roomType == "group",
    });

    if (!res) {
      toast({
        variant: "destructive",
        title: "Internal Server Error",
      });
      return;
    }

    if (!res.success) {
      toast({
        variant: "warning",
        title: res.msg,
      });
      return;
    }

    toast({
      variant: "primary",
      title: "Added A New Chat"
    })

    roomContext.appendRoom({ room: res.room });
    dialogContext.setIsOpen(false);
  }

  return (
    <Dialog
      open={dialogContext.isOpen}
      onOpenChange={(open) => {
        setEmail("");
        setRoomName("");
        setResultSet([]);
        setIsLoading(false);
        setRoomType(null);
        setSelectedUsers([]);
        setReference.current.clear();
        dialogContext.setIsOpen(open);
      }}
    >
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-secondary">
        {!roomType ? (
          <div className="flex w-[90%] flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <Button
              onClick={() => {
                setRoomType("group");
              }}
            >
              Create a Group
            </Button>
            <Button
              onClick={() => {
                setRoomType("single");
              }}
            >
              Add a new User
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-foreground text-sm sm:text-base">
                {roomType == "group" ? "Create A Group" : "Search For User"}
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm">Search users by their Email</DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 py-4 text-foreground">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="email"
                  className="text-center text-xs text-foreground sm:text-sm"
                >
                  User Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  autoComplete="off"
                  className="col-span-3 border-muted-foreground bg-secondary px-4 
                            py-6 text-sm md:text-base text-foreground focus-visible:ring-0
                            focus-visible:ring-offset-0"
                  onChange={(e) => {
                    setEmail(e.currentTarget.value.trim());
                  }}
                />
              </div>
              {roomType == "group" && (
                <div className="grid grid-cols-4 items-center  gap-4">
                  <Label
                    htmlFor="roomName"
                    className="text-center text-xs sm:text-sm text-foreground "
                  >
                    Group Name
                  </Label>
                  <Input
                    id="roomName"
                    type="text"
                    value={roomName}
                    autoComplete="off"
                    className="col-span-3 border-muted-foreground bg-secondary px-4 
                              py-6 text-sm md:text-base text-foreground focus-visible:ring-0
                              focus-visible:ring-offset-0"
                    onChange={(e) => {
                      setRoomName(e.currentTarget.value);
                    }}
                  />
                </div>
              )}
              <div className="flex justify-between px-3 pt-3">
                <h4 className="col-span-3 text-xs font-medium leading-none sm:text-sm">
                  Results
                </h4>
                <Spinner loading={isLoading} className="ml-auto" />
              </div>
              <ScrollArea className="h-40 w-full px-3">
                {selectedusers.map((user, index) => {
                  return (
                    <div key={index}>
                      <SelectedUser
                        user={user}
                        setSelectedUsers={setSelectedUsers}
                        set={setReference.current}
                      />
                      <Separator className="bg-muted-foreground my-1" />
                    </div>
                  );
                })}
                {resultSet.map((user, index) => {
                  return (
                    <div key={index}>
                      <ResultUser
                        user={user}
                        set={setReference.current}
                        setSelectedUsers={setSelectedUsers}
                        setResultSet={setResultSet}
                        isUserSame={user.id == authContext.user.profile.id}
                      />
                      <Separator className="bg-muted-foreground mt-1" />
                    </div>
                  );
                })}

                {resultMessage ? (
                  <div className="flex justify-center items-center space-x-3 mt-12 text-xs sm:text-sm lg:text-base">
                    <Snail strokeWidth={1.5} className="size-5 md:size-6" />
                    <span>{resultMessage}</span>
                  </div>
                ) : null}
              </ScrollArea>
              <DialogFooter>
                <Button onClick={addUser} disabled={selectedusers.length == 0}>
                  {selectedusers.length > 1 ? "Add Users" : "Add User"}
                </Button>
              </DialogFooter>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default SearchDialog;
