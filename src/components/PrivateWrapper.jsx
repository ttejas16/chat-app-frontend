import React, { useContext, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { useAuthContext } from "@/hooks/authContext";
import Spinner from "./ui/spinner";

function PrivateWrapper() {
  // const navigate = useNavigate();
  const authContext = useAuthContext();

  if (authContext.isLoading) {
    return (
      <div className="flex items-center h-full">
        <Spinner loading={authContext.isLoading} className="h-10 w-10 my-auto" />
      </div>
    )
  }

  // useEffect(() => {
  //     if (!mainContext.loading && !mainContext.user.isAuthenticated) {
  //         navigate("/login", { replace: true });
  //     }
  // }, [mainContext.loading]);

  return (
    <>
      {authContext.user.isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </>
  );
}

export default PrivateWrapper;
