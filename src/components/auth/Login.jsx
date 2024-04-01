import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { validate } from "@/api/auth/validate";
import { login } from "@/api/auth/auth";
import Spinner from "../ui/spinner";
import { useAuthContext } from "@/hooks/authContext";
import { Eye, EyeOff } from "lucide-react";

function Login({ loading, setLoading, toggleForm }) {
  const authContext = useAuthContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  async function handleSubmit(e) {
    e.preventDefault();

    const { isValid, msg } = validate(email, password);
    if (!isValid) {
      toast({
        variant: "warning",
        title: msg,
      });
      return;
    }

    try {
      setLoading(true);

      // send form details
      const res = await login({ email: email, password: password });

      setLoading(false);
      if (!res.success) {
        toast({
          variant: "destructive",
          title: res.msg,
        });
        return;
      }

      authContext.loginUser(res.user);
      navigate("/", { replace: true });

    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Internal Server Error!",
      });
    }
  }

  return (
    <form
      className="w-full h-full shrink-0 flex flex-col justify-center items-center 
      text-foreground gap-y-6"
      method="post"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div className="mb-6 flex flex-col items-center space-y-2">
        <span className="text-3xl font-bold tracking-tight md:text-4xl text-center">Welcome Back !</span>
        <span className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium text-center">Sign In To Your Account Using Credentials</span>
      </div>
      
      <Input
        type="email"
        name="email"
        placeholder="email@example.com"
        className="rounded-none border-0 border-b border-foreground bg-inherit 
          py-6 text-sm sm:text-base focus-visible:ring-0 focus-visible:ring-offset-0"
        value={email}
        onChange={(e) => {
          setEmail(e.currentTarget.value.trim());
        }}
        required
      />

      <div className="flex w-full items-center border-0 border-b border-foreground">
        <Input
          type="password"
          name="password"
          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          className="rounded-none border-0 bg-inherit py-6 text-sm sm:text-base
          focus-visible:ring-0 focus-visible:ring-offset-0"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value.trim())}
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

      <Button type="submit" size={"lg"} className="w-full py-6 text-sm sm:text-base">
        LOGIN
      </Button>
      <div className="relative w-full">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-b border-foreground"></span>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-2 text-xs sm:text-sm">OR CREATE ACCOUNT</span>
        </div>

      </div>
      <Button size={"lg"} variant={"outline"} className="w-full py-6 text-sm sm:text-base"
        onClick={(e) => {
          e.preventDefault();
          toggleForm("signup")
        }}
      >
        REGISTER
      </Button>
      {/* <span className="text-lg">
        Don't Have An Account ?{" "}
        <span
          onClick={() => toggleForm("signup")}
          className=" cursor-pointer underline decoration-primary underline-offset-2"
        >
          Sign Up
        </span>
      </span> */}
      <Spinner loading={loading} />
    </form>
  );
}

export default Login;
