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
import { updateProfile } from "@/api/user/user";

function Profile({ children, profileLoading, profile, }) {
  const { toast } = useToast();
  const authContext = useAuthContext();
  const avatarRef = useRef(null);
  const [editingField, setEditingField] = useState("");
  const [profileData, setProfileData] = useState({ ...profile });
  const [file, setFile] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const detailRef = useRef();

  useEffect(() => {
    detailRef.current = {
      userName: profile.userName,
      status: profile.status,
    };

  }, [profile]);

  useEffect(() => {
    if (!profileData.userName.trim() || !profileData.status.trim()) {
      setSubmitDisabled(true);
      return;
    }

    if (profileData.userName.trim() != detailRef.current.userName ||
      profileData.status.trim() != detailRef.current.status) {
      setSubmitDisabled(false);
      return;
    }

    setSubmitDisabled(true);

  }, [profileData]);

  function loadFile(e) {
    const file = e.currentTarget.files[0];
    const fileSize = ((file.size / 1024) / 1024).toFixed(4);

    if (fileSize > 5) {
      toast({
        title: "Image size should be less than 5MB!",
        variant: "warning"
      })
      return;
    }

    console.log(avatarRef.current);
    setFile(file);
  }

  // useEffect(() => {
  //   if (!file) {
  //     return;
  //   }
  //   const fileReader = new FileReader();
  //   fileReader.readAsDataURL(file);
  //   fileReader.onloadend = () => {
  //     console.log(avatarRef.current);
  //     if (avatarRef.current) {
  //       avatarRef.current.src = fileReader.result;
  //     }
  //   }
  //   return () => {
  //     fileReader.removeEventListener('onloadend');
  //   }
  // }, [file]);

  async function handleSubmit() {
    const res = await updateProfile({
      file: file,
      userName: profileData.userName,
      status: profileData.status
    });

    console.log(res);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className="bg-secondary text-foreground">
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
                <AvatarImage
                  ref={avatarRef}
                  src={file ?? "https://picsum.photos/seed/picsum/200/200"}
                  className="rounded-full object-cover" />
                <AvatarFallback className="border border-muted-foreground/70">
                  TS
                </AvatarFallback>
                <Input
                  form="updateForm"
                  onChange={loadFile}
                  id="profileImage"
                  name="profileImage"
                  type="file"
                  accept="image/png image/jpeg"
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
                  value={profileData.email}
                  className="col-span-2 bg-muted-foreground/10 focus-visible:ring-0 focus-visible:ring-offset-0"
                  type="email"
                  disabled
                />
              </div>
              <Label className="text-xs">Username</Label>
              <div className="flex gap-1">
                <Input
                  value={profileData.userName}
                  onChange={(e) => {
                    setProfileData((prev) => {
                      return {
                        ...prev,
                        userName: e.currentTarget.value
                      }
                    })
                  }}
                  disabled={editingField == "userName" ? false : true}
                  className="col-span-2 bg-muted-foreground/10 focus-visible:ring-0 focus-visible:ring-offset-0" />
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
                  value={profileData.status ?? ""}
                  onChange={(e) => {
                    setProfileData((prev) => {
                      return {
                        ...prev,
                        status: e.currentTarget.value
                      }
                    })
                  }}
                  disabled={editingField == "status" ? false : true}
                  className="col-span-2 bg-muted-foreground/10 focus-visible:ring-0 focus-visible:ring-offset-0" />
                <Button onClick={(e) => {
                  e.preventDefault();
                  setEditingField("status");

                }} variant="ghost" size="icon">
                  <Pencil strokeWidth={1.5} className="size-4" />
                </Button>
              </div>
            </form>
            <DialogFooter className="sm:justify-between mt-4">
              <div className="flex flex-col justify-center mt-2">
                <h3 className="text-xs font-semibold text-muted-foreground">
                  Joined At {new Date(profileData.createdAt).toDateString().slice(4)}
                </h3>
                <h3 className="text-xs font-semibold text-muted-foreground">
                  Last Updated At {new Date(profileData.updatedAt).toDateString().slice(4)}
                </h3>
              </div>
              <Button onClick={handleSubmit} disabled={submitDisabled}>
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