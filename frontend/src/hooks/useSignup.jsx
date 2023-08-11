import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const signup = async (email, password, fullname, username) => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/users/signup`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            fullname,
            username,
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
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(err.message);
    }
  };
  return { signup, loading, error };
};
