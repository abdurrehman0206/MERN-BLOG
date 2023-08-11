import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(
        "/api/users/login",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        localStorage.setItem("user", JSON.stringify(json.user));
        dispatch({
          type: "LOGIN",
          payload: json.user,
        });
        setLoading(false);
        setError(null);
      } else {
        setLoading(false);
        setError(json.error);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(err.message);
    }
  };
  return { login, loading, error };
};
