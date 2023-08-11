import "./Blogs.css";
import BlogCard from "../BlogCard/BlogCard";
import { useBlogContext } from "../../hooks/useBlogContext";
import React from "react";

function Blogs() {
  const { blogs } = useBlogContext();

  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // useEffect(() => {
  //   setLoading(true);
  //   const getBlogs = async () => {
  //     try {
  //       const response = await fetch("/api/blogs/");
  //       const json = await response.json();
  //       if (response.ok) {
  //         dispatch({ type: "GET_BLOGS", payload: json.data });
  //         setLoading(false);
  //       } else {
  //         setError(json.error);
  //         setLoading(false);
  //       }
  //     } catch (err) {
  //       setError(err.message);
  //       setLoading(false);
  //     }
  //   };
  //   getBlogs();
  // }, [dispatch]);
  let blogElements = [];
  if (blogs) {
    let newBlogs = [...blogs];
    let sortedBlogs = newBlogs
      .sort((a, b) => {
        return b.views.length - a.views.length;
      })
      .slice(0, 3);

    blogElements = sortedBlogs.map((blog) => {
      return <BlogCard key={blog._id} blog={blog} />;
    });
  }
  return (
    <div className="blogs-container">
      <div className="feed-title">
        <h3>Feed</h3>
      </div>
      {blogElements}
    </div>
  );
}

export default Blogs;
