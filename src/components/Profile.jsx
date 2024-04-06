import { useAuthContext } from "@/hooks/authContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogHeader, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Camera, Image, Pencil, PencilLine, User } from "lucide-react";
import { getProfile } from "@/api/auth/auth";
import { useToast } from "./ui/use-toast";
import { useEffect, useRef, useState } from "react";
import Spinner from "./ui/spinner";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function Profile({ children, profileLoading, profile, }) {
  const { toast } = useToast();
  const authContext = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);

  const createdAt = new Date(profile.createdAt);
  const idx = createdAt.toDateString().indexOf(" ");
  const createdDateString = createdAt.toDateString().slice(idx + 1);

  const updatedAt = new Date(profile.updatedAt);
  const spaceIndex = updatedAt.toDateString().indexOf(" ");
  const updatedDateString = updatedAt.toDateString().slice(spaceIndex + 1);

  const detailRef = useRef();

  useEffect(() => {
    if (!detailRef) {

    }
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent onOpenAutoFocus={() => { }} className="bg-secondary text-foreground">
        <DialogHeader>
          <DialogTitle>
            Profile
          </DialogTitle>
          <DialogDescription>
            View Your Profile
          </DialogDescription>
        </DialogHeader>
        {profileLoading ?
          <div className="w-full h-full flex items-center">
            <Spinner loading={profileLoading} />
          </div> :
          <>
            <div className="flex space-x-8 justify-center">
              <Avatar className="size-32 relative overflow-visible">
                <AvatarImage src="https://picsum.photos/seed/picsum/200/300" className="rounded-full" />
                <AvatarFallback className="border border-muted-foreground/70">
                  TS
                </AvatarFallback>
                <Input id="profileImage" name="profileImage" type="file" accept="image" className="hidden" />
                <Label htmlFor="profileImage" className="rounded-full bg-muted/90 absolute -bottom-2 right-0 border p-2">
                  <Camera className="size-5" strokeWidth={1.5} />
                </Label>
              </Avatar>
            </div>
            <form className="flex flex-col gap-y-2 text-foreground">
              <Label className="text-xs">Email</Label>
              <div className="flex gap-1">
                {/* <input type="text"readOnly /> */}
                <Input
                  value={profile.email}
                  className="col-span-2 bg-muted-foreground/10 focus-visible:ring-0 focus-visible:ring-offset-0"
                  type="email"
                  disabled
                />
              </div>
              <Label className="text-xs">Username</Label>
              <div className="flex gap-1">
                <Input
                  value={profile.userName}
                  onChange={() => { }}
                  disabled={!isEditing ? true : false}
                  className="col-span-2 bg-muted-foreground/10 focus-visible:ring-0 focus-visible:ring-offset-0" />
                <Button onClick={(e) => {
                  e.preventDefault();
                  setIsEditing(true);

                }} variant="ghost" size="icon">
                  <Pencil strokeWidth={1.5} className="size-4" />
                </Button>
              </div>
              <Label className="text-xs">Status</Label>
              <div className="flex gap-1">
                <Input
                  value={profile.status ?? "No Status"}
                  onChange={() => { }}
                  disabled={!isEditing ? true : false}
                  className="col-span-2 bg-muted-foreground/10 focus-visible:ring-0 focus-visible:ring-offset-0" />
                <Button onClick={(e) => {
                  e.preventDefault();
                  setIsEditing(true);

                }} variant="ghost" size="icon">
                  <Pencil strokeWidth={1.5} className="size-4" />
                </Button>
              </div>
            </form>
            <DialogFooter className="sm:justify-between mt-4">
              <div className="flex flex-col justify-center mt-2">
                <h3 className="text-xs font-semibold text-muted-foreground">Joined At {createdDateString}</h3>
                <h3 className="text-xs font-semibold text-muted-foreground">Last Updated At {updatedDateString}</h3>
              </div>
              <Button disabled={!isEditing} >
                Update Profile
              </Button>
            </DialogFooter>
          </>
        }
      </DialogContent>
    </Dialog >
  )

}

export default Profile;