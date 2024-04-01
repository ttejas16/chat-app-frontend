import { useEffect, useReducer, useState } from "react"

import { AuthContext } from "@/hooks/authContext";
import { getUser, logout } from "@/api/auth/auth";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button"

import { initialUserState, userReducer } from "@/store/userReducer";

function AuthProvider({ children }) {
  const { toast } = useToast();
  const [user, userDispatch] = useReducer(userReducer, initialUserState);
  const [isLoading, setIsLoading] = useState(true);

  function loginUser(user) {
    userDispatch({ type: "LOG_IN", payload: user });
  }

  function logoutUser() {
    userDispatch({ type: "LOG_OUT" });
  }

  async function fetchOnLoad() {
    const res = await getUser();

    if (!res) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Internal Server Error!",
      });
      return;
    }

    if (res.success) {
      // console.log(res);

      loginUser(res.user);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }

  useEffect(() => {
    // fetch user on initial load
    fetchOnLoad();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        isLoading,
        setIsLoading
      }}
    >
      {/* <Button
        className="absolute left-24 top-1"
        onClick={async () => {
          setIsLoading(true);
          const res = await logout();
          if (!res) {
            console.log("internal server error");
            return;
          }

          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
          logoutUser();
          console.log(res.msg);
        }}
      >
        Logout
      </Button> */}
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
