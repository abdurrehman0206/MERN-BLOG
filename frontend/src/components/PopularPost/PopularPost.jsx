import React, { useEffect, useState, useLayoutEffect } from "react";
import "./PopularPost.css";
import { useBlogContext } from "../../hooks/useBlogContext";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
function PopularPost() {
  const navigate = useNavigate();
  const [popularPost, setPopularPost] = useState(null);
  const { blogs } = useBlogContext();
  useLayoutEffect(() => {
    const getPopularPost = () => {
      const maxViewedBlog = blogs.reduce((acc, blog) => {
        return blog.views > acc.views ? blog : acc;
      });
      setPopularPost(maxViewedBlog);
    };
    getPopularPost();
  }, [blogs]);

  if (!popularPost) return null;
  return (
    <div
      className="popularpost-container"
      onClick={() => {
        navigate(`/blogs/${popularPost._id}`);
      }}
    >
      <div className="popularpost-title">
        <h3>Trending</h3>
      </div>
      <div className="popularpost ">
        <img src={popularPost.image} alt="popularpost" />
        <div className="popularpost-info-back ">
          <div className="popularpost-info  ">
            <h4>{popularPost.title}</h4>
            <p>
              {formatDistanceToNow(new Date(popularPost.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularPost;
