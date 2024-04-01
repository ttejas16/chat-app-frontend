import { useState } from "react";
import ImageCarousel from "./ImageCarousel";
import Login from "./Login";
import Signup from "./Signup";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useThemeContext } from "@/hooks/themeContext";

function AuthForm() {
  const [form, toggleForm] = useState("Login");
  const [loading, setLoading] = useState(false);
  const themeContext = useThemeContext();

  return (
    <div className="flex h-full justify-center">
      <div
        className="relative flex h-full w-full shrink-0 items-center justify-center gap-x-6 p-8 sm:p-16 md:p-32
        rounded-md border border-border bg-background shadow-sm md:w-[700px]"
      >
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-2 left-2 text-foreground"
          onClick={() => {
            themeContext.toggleTheme();
          }}>
          {themeContext.theme == "light" ?
            <Moon className="size-4 md:size-6" strokeWidth={1.5} /> :
            <Sun className="size-4 md:size-6" strokeWidth={1.5} />}
        </Button>
        {form == "Login" ? (
          <Login
            loading={loading}
            setLoading={setLoading}
            toggleForm={toggleForm}
          />
        ) : (
          <Signup
            loading={loading}
            setLoading={setLoading}
            toggleForm={toggleForm}
          />
        )}
      </div>
    </div>
  );
}

export default AuthForm;
