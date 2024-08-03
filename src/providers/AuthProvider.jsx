import { useEffect, useReducer, useRef, useState } from "react"

import { AuthContext } from "@/hooks/authContext";
import { getUser } from "@/api/auth/auth";

import { useToast } from "@/components/ui/use-toast";

import { initialUserState, userReducer } from "@/store/userReducer";
import axios from "axios";

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

  function updateProfile({ updatedProfile = {} }) {
    userDispatch({ type: "UPDATE_PROFILE", payload: updatedProfile });
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

    if (!res.success) {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return;
    }

    loginUser(res.user);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);

  }

  const ref = useRef();
  useEffect(() => {
    // fetch user on initial load
    if (!ref.current) {
      fetchOnLoad();
    }

    return () => {
      ref.current = true;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        updateProfile,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
