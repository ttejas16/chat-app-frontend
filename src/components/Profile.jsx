import { useEffect, useState } from "react";
import { Camera, Pencil, RotateCcw } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "./ui/dialog";

import { useToast } from "./ui/use-toast";
import Spinner from "./ui/spinner";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { updateProfile } from "@/api/user/user";
import { useAuthContext } from "@/hooks/authContext";

function Profile({ children, profile }) {
  const { toast } = useToast();
  const authContext = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [editingField, setEditingField] = useState("");
  const [updatedProfile, setUpdatedProfile] = useState({ ...profile });
  const [avatar, setAvatar] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {

    if (avatar) {
      setSubmitDisabled(false);
      return;
    }

    if (!updatedProfile.userName.trim() || !updatedProfile.status.trim()) {
      setSubmitDisabled(true);
      return;
    }

    if (updatedProfile.userName.trim() != profile.userName ||
      updatedProfile.status.trim() != profile.status) {
      setSubmitDisabled(false);
      return;
    }

    setSubmitDisabled(true);

  }, [updatedProfile, avatar]);


  function resetChanges(e) {
    setUpdatedProfile({
      ...profile,
    })
    setAvatar(null);
  }

  function loadAvatar(e) {
    const _avatar = e.currentTarget.files[0];
    const avatarSize = ((_avatar.size / 1024) / 1024).toFixed(4);

    if (avatarSize > 5) {
      toast({
        title: "Image size should be less than 5MB!",
        variant: "warning"
      })
      return;
    }

    setAvatar({
      avatar: _avatar,
      url: URL.createObjectURL(_avatar)
    });
  }


  async function handleSubmit() {
    setIsLoading(true);
    const res = await updateProfile({
      avatar: avatar ? avatar.avatar : profile.avatar,
      userName: updatedProfile.userName,
      status: updatedProfile.status
    });

    if (!res) {
      toast({
        title: "Internal Server Error!",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (!res.success) {
      toast({
        title: res.msg,
        variant: "destructive"
      })
      setIsLoading(false);
      return;
    }

    toast({
      title: res.msg,
      variant: "primary"
    });

    setIsLoading(false);
    setUpdatedProfile(res.updatedProfile);
    authContext.updateProfile({ updatedProfile: res.updatedProfile });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className="bg-secondary text-foreground">
        <DialogHeader>
          <DialogTitle className="text-sm sm:text-base">
            Profile
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            View Your Profile
          </DialogDescription>
        </DialogHeader>
        {authContext.isLoading ?
          <div className="w-full h-full flex items-center">
            <Spinner loading={authContext.isLoading} />
          </div> :
          <>
            <div className="flex justify-center relative">
              <Button
                onClick={resetChanges}
                className="absolute -top-12 -right-5 text-muted-foreground hover:-rotate-45 transition-all"
                variant="ghost"
                size="icon">
                <RotateCcw className="h-5 w-5 " />
              </Button>
              <Avatar className="size-32 relative overflow-visible ml-0">
                <AvatarImage
                  src={avatar ? avatar.url : profile.avatar}
                  className="rounded-full object-cover" />
                <AvatarFallback className="border border-muted-foreground/70">
                  {updatedProfile.userName?.split(" ").slice(0, 2).map((v) => v[0]).join("")}
                </AvatarFallback>
                <Input
                  form="updateForm"
                  onChange={loadAvatar}
                  id="profileImage"
                  name="profileImage"
                  type="file"
                  accept="image/png, image/jpeg"
                  className="hidden" />
                <Label htmlFor="profileImage" className="rounded-full bg-muted/90 absolute -bottom-2 right-0 border border-muted-foreground/30 p-2">
                  <Camera className="size-5" strokeWidth={1.5} />
                </Label>
              </Avatar>
            </div>
            <form id="updateForm" className="flex flex-col gap-y-2 text-foreground">
              <Label className="text-xs">Email</Label>
              <div className="flex gap-1">
                <Input
                  value={updatedProfile.email}
                  className="col-span-2 text-xs md:text-sm bg-muted-foreground/10 focus-visible:ring-0 focus-visible:ring-offset-0"
                  type="email"
                  disabled
                />
              </div>
              <Label className="text-xs">Username</Label>
              <div className="flex gap-1">
                <Input
                  value={updatedProfile.userName}
                  onChange={(e) => {
                    setUpdatedProfile((prev) => {
                      return {
                        ...prev,
                        userName: e.target.value
                      }
                    })
                  }}
                  disabled={editingField == "userName" ? false : true}
                  className="col-span-2 text-xs md:text-sm bg-muted-foreground/10 focus-visible:ring-0 focus-visible:ring-offset-0" />
                <Button onClick={(e) => {
                  e.preventDefault();
                  setEditingField("userName");

                }} variant="ghost" size="icon">
                  <Pencil strokeWidth={1.5} className="size-4" />
                </Button>
              </div>
              <Label className="text-xs">Status</Label>
              <div className="flex gap-1">
                <Input
                  value={updatedProfile.status ?? ""}
                  onChange={(e) => {
                    setUpdatedProfile((prev) => {
                      return {
                        ...prev,
                        status: e.target.value
                      }
                    })
                  }}
                  disabled={editingField == "status" ? false : true}
                  className="col-span-2 text-xs md:text-sm bg-muted-foreground/10 focus-visible:ring-0 focus-visible:ring-offset-0" />
                <Button onClick={(e) => {
                  e.preventDefault();
                  setEditingField("status");

                }} variant="ghost" size="icon">
                  <Pencil strokeWidth={1.5} className="size-4" />
                </Button>
              </div>
            </form>
            <DialogFooter className="sm:justify-between sm:items-end mt-2">
              <div className="flex flex-col justify-center mt-4">
                <h3 className="text-xs font-semibold text-muted-foreground">
                  Joined At {new Date(updatedProfile.createdAt).toDateString().slice(4)}
                </h3>
                <h3 className="text-xs font-semibold text-muted-foreground">
                  Last Updated At {new Date(updatedProfile.updatedAt).toDateString().slice(4)}
                </h3>
              </div>
              <Button onClick={handleSubmit} disabled={submitDisabled || isLoading}>
                {
                  isLoading ?
                    <Spinner loading={isLoading} className="text-white" /> : "Update Profile"
                }
              </Button>
            </DialogFooter>
          </>
        }
      </DialogContent>
    </Dialog >
  )

}

export default Profile;