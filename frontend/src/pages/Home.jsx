import React, { useState, useLayoutEffect } from "react";
import { useBlogContext } from "../hooks/useBlogContext";
import Blogs from "../components/Blogs/Blogs";
import Categories from "../components/Categories/Categories";
import PopularPost from "../components/PopularPost/PopularPost";
import Loader from "../components/Loader/Loader";
import { useAuthContext } from "../hooks/useAuthContext";
function Home() {
  document.title = "WriteStack | Home";
  const { blogs, dispatch } = useBlogContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  useLayoutEffect(() => {
    setLoading(true);
    const getBlogs = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/blogs/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: "GET_BLOGS", payload: json.data });
          setLoading(false);
          setError(null);
        } else {
          setError(json.error);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
    return () => {
      setError(null);
      setLoading(false);
      // dispatch({ type: "CLEAR_BLOGS" });
    };
  }, [dispatch]);

  if (!blogs && loading) {
    return <Loader />;
  }
  if (!blogs && !loading) {
    return null;
  }

  return (
    <div className="home-container ">
      {/* <Loader /> */}
      <div className="left-container">
        <Blogs />
      </div>
      <div className="right-container">
        <PopularPost />
        {/* <Categories /> */}
      </div>
    </div>
  );
}

export default Home;
