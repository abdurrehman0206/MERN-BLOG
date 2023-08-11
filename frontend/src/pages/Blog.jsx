import React, { useState, useLayoutEffect } from "react";
import { useBlogContext } from "../hooks/useBlogContext";
import BlogCard from "../components/BlogCard/BlogCard";
import Categories from "../components/Categories/Categories";
import Loader from "../components/Loader/Loader";
import { AiOutlineSearch } from "react-icons/ai";
import { useAuthContext } from "../hooks/useAuthContext";
function Blog() {
  document.title = "WriteStack | Blogs";
  const { blogs, dispatch } = useBlogContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  //search term

  const getCategory = (category) => {
    setCategories(category);
  };
  useLayoutEffect(() => {
    setLoading(true);

    const getBlogs = async () => {
      try {
        const response = await fetch("/api/blogs/", {
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

  let blogElements = [];

  if (!blogs && !loading) {
    return null;
  } else if (!blogs && loading) {
    return <Loader />;
  } else {
    if (categories === "All") {
      blogElements = blogs.map((blog) => {
        return <BlogCard key={blog._id} blog={blog} />;
      });
    } else {
      let filteredBlogs = blogs.filter((blog) => blog.category === categories);
      blogElements = filteredBlogs.map((blog) => {
        return <BlogCard key={blog._id} blog={blog} />;
      });
    }
    if (searchTerm) {
      let filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      blogElements = filteredBlogs.map((blog) => {
        return <BlogCard key={blog._id} blog={blog} />;
      });
    }
  }
  return (
    <div className="blog-page-container">
      <div className="blog-page-header">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm || ""}
        />
      </div>
      <div className="blog-page-content ">
        <div className="left  ">{blogElements}</div>
        <div className="right">
          <Categories getCategory={getCategory} />
        </div>
      </div>
    </div>
  );
}

export default Blog;
