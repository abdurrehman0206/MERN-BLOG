import { createContext, useReducer, useLayoutEffect } from "react";

export const AuthContext = createContext();
export const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    default:
      return state;
  }
};
export const AuthContextProvider = ({ children }) => {
  const initialState = {
    user: JSON.parse(localStorage.getItem("user")),
  };
  useLayoutEffect(() => {
    const checkUser = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const response = await fetch("/api/users/verify", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();
        if (json.success) {
          localStorage.setItem("user", JSON.stringify(json.user));
          dispatch({ type: "LOGIN", payload: json.user });
        } else {
          localStorage.removeItem("user");
          dispatch({ type: "LOGOUT" });
        }
      }
    };
    checkUser();
  }, []);
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
