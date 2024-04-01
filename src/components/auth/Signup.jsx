import { useState } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

import { validate } from "@/api/auth/validate";
import { signup } from "@/api/auth/auth";
import Spinner from "../ui/spinner";
import { Eye, EyeOff } from "lucide-react";

const initialState = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Signup({ loading, setLoading, toggleForm }) {
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();

  async function handleSubmit(e) {
    e.preventDefault();

    const password = formData.password;
    const confirmPassword = formData.confirmPassword;
    const email = formData.email;
    const userName = formData.userName.trim();

    if (userName.length == 0 || confirmPassword.length == 0) {
      toast({
        variant: "warning",
        title: "Details can't be empty or only spaces",
      });
      return;
    }

    const { isValid, msg } = validate(email, password);

    if (!isValid) {
      toast({
        variant: "warning",
        title: msg,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        variant: "warning",
        title: "Passwords do not match!",
      });
      return;
    }

    try {
      setLoading(true);

      // send form data
      const res = await signup({
        email: email,
        password: password,
        userName: userName
      });

      setLoading(false);
      if (!res.success) {
        toast({
          variant: "destructive",
          title: res.msg,
        });
        return;
      }

      toast({
        variant: "primary",
        title: res.msg,
      });

      setFormData(initialState);
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Internal Server Error!",
      });
    }
  }

  return (
    <>
      <form
        className="w-full h-full shrink-0 flex flex-col justify-center items-center 
        text-foreground gap-y-6"
        method="post"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="mb-6 flex flex-col items-center space-y-2">
          <span className="text-3xl font-bold tracking-tight md:text-4xl">Get Started</span>
          <span className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium">Create A New Account</span>
        </div>


        <Input
          type="text"
          name="userName"
          placeholder="Enter user name"
          className="rounded-none border-0 border-b border-foreground bg-inherit 
            py-6 text-sm sm:text-base focus-visible:ring-0 focus-visible:ring-offset-0"
          value={formData.userName}
          onChange={(e) =>
            setFormData({
              ...formData,
              userName: e.currentTarget.value,
            })
          }
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Enter email"
          className="rounded-none border-0 border-b border-foreground bg-inherit 
            py-6 text-sm sm:text-base focus-visible:ring-0 focus-visible:ring-offset-0"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.currentTarget.value.trim(),
            })
          }
          required
        />
        <div className="flex w-full items-center border-0 border-b border-foreground">
          <Input
            type="password"
            name="password"
            placeholder="Enter password"
            className="rounded-none border-0 bg-inherit py-6 text-sm sm:text-base focus-visible:ring-0 focus-visible:ring-offset-0"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.currentTarget.value.trim(),
              })
            }
            required
          />
          <Button
            type="button"
            variant={"ghost"}
            size={"icon"}
            onClick={(e) => {
              const input = e.currentTarget.previousSibling;
              if (input.type == "password") {
                input.type = "text";
              } else {
                input.type = "password";
              }
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </Button>
        </div>
        <div className="flex w-full items-center border-0 border-b border-foreground">
          <Input
            type="password"
            name="confirm-password"
            placeholder="Confirm password"
            className="rounded-none border-0 bg-inherit py-6 text-sm sm:text-base focus-visible:ring-0 focus-visible:ring-offset-0"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({
                ...formData,
                confirmPassword: e.currentTarget.value.trim(),
              })
            }
            required
          />
          <Button
            type="button"
            variant={"ghost"}
            size={"icon"}
            onClick={(e) => {
              const input = e.currentTarget.previousSibling;
              if (input.type == "password") {
                input.type = "text";
              } else {
                input.type = "password";
              }
              setShowConfirmPassword(!showConfirmPassword);
            }}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </Button>
        </div>

        <Button type="submit" size={"lg"} className="w-full py-6 text-sm sm:text-base">
          SIGN UP
        </Button>
        <span className="text-sm sm:text-base">
          Already Have An Account ?{" "}
          <span
            onClick={() => toggleForm("Login")}
            className=" cursor-pointer underline decoration-primary underline-offset-2"
          >
            Log In
          </span>
        </span>
        <Spinner loading={loading} />
      </form>
    </>
  );
}

export default Signup;
