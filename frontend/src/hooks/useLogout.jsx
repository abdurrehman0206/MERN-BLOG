import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogContext } from "./useBlogContext";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const navigate = useNavigate();

  const blogContext = useBlogContext();
  const authContext = useAuthContext();
  const logout = () => {
    localStorage.removeItem("user");
    blogContext.dispatch({ type: "CLEAR_BLOGS" });
    authContext.dispatch({ type: "LOGOUT" });

    document.getElementsByClassName("App")[0].style.marginLeft = "0px";

    navigate("/login");
  };
  return { logout };
};
