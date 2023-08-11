import React, { useState, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import {
  AiFillTag,
  AiOutlineFieldTime,
  AiOutlineEye,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
  AiOutlineSend,
} from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { formatDistanceToNow } from "date-fns";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./SingleBlog.css";

import Loader from "../Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function SingleBlog() {
  const { blogId } = useParams();
  console.log("🚀 ~ file: SingleBlog.jsx:22 ~ SingleBlog ~ blogId:", blogId);
  const { user } = useAuthContext();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");

  useLayoutEffect(() => {
    const getBlog = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/blogs/${blogId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const json = await response.json();
        if (json.success && response.ok) {
          if (json.data.views.find((view) => view === user.id)) {
            setBlog(json.data);
          } else {
            try {
              const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/api/blogs/${blogId}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                  },
                  body: JSON.stringify({
                    views: [...json.data.views, user.id],
                  }),
                }
              );
              const jsonN = await response.json();
              if (jsonN.success && response.ok) {
                setBlog(jsonN.data);
              } else {
                console.log("Couldn't");
              }
            } catch (err) {
              console.log(err.message);
            }
          }
        }
      } catch (err) {
        setLoading(false);
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    getBlog();
    return () => {
      setLoading(false);
      setBlog(null);
    };
  }, [blogId, user]);

  const postLike = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/blogs/${blogId}/like`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      if (json.success && response.ok) {
        setBlog(json.data);
      } else {
        console.log(json.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const postComment = async (e) => {
    setLoading(true);

    if (comment === "") {
      toast.error("Cannot add empty comment", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/blogs/${blogId}/comment`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            comment: comment,
          }),
        }
      );
      const json = await response.json();
      if (json.success && response.ok) {
        setBlog(json.data);
        setComment("");
      } else {
        console.log(json);
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };
  // const postComment = async ()=>{

  // }
  if (!blog && loading) {
    return <Loader />;
  }
  if (!blog && !loading) {
    return null;
  }

  return (
    <div className="singleblog-container">
      <ToastContainer />
      <div className="singleblog-wrapper ">
        <div className="header ">
          <div
            className="top "
            style={{
              backgroundImage: `url(${blog.image})`,
            }}
          >
            <img src={blog.image} alt={blog.category} />
          </div>
          <h4 className="title ">{blog.title}</h4>
          <div className="bottom ">
            <div className="blog-stats">
              <div className="author ">
                <span>By : </span> <b> {blog.author}</b>
              </div>
              <div className="date ">
                <AiOutlineFieldTime />
                <p>
                  {formatDistanceToNow(new Date(blog.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>

            <div className="blog-stats">
              <div className="category">
                <BiCategoryAlt />
                {blog.category}
              </div>
              <div className="views ">
                <AiOutlineEye />
                {blog.views.length} views
              </div>
              <div className="likes ">
                <AiOutlineHeart />
                {blog.likes.length} likes
              </div>
              <div className="comments ">
                <AiOutlineComment />
                {blog.comments.length} comments
              </div>
            </div>
          </div>
        </div>
        <div className="content ">{blog.content} </div>

        <div className="tags ">
          {blog.tags.map((tag, i) => {
            return (
              <span className="tag" key={i}>
                {" "}
                <AiFillTag />
                {tag}
              </span>
            );
          })}{" "}
        </div>
        <div className="user-interection ">
          <div className="comment-box ">
            <input
              type="text"
              name="comment"
              id="comment"
              placeholder="Add comment"
              onChange={(e) => setComment(e.target.value)}
              value={comment || ""}
            />
            <AiOutlineSend
              className="user-int-icon send"
              onClick={postComment}
            />
          </div>

          {!blog.likes.find((like) => like === user.id) ? (
            <AiOutlineHeart
              className="user-int-icon heart"
              onClick={postLike}
            />
          ) : (
            <AiFillHeart
              className="user-int-icon heartfill"
              onClick={postLike}
            />
          )}
        </div>
        <div className="comment-display">
          {blog.comments.map((comment) => {
            return (
              <div className="comment-wrapper" key={comment._id}>
                <div className="comment-header">
                  <div className="comment-author">
                    <span>
                      {comment.userId === user.id ? "You" : comment.username}
                    </span>
                    <small className="comment-date">
                      {formatDistanceToNow(new Date(comment.date), {
                        addSuffix: true,
                      })}
                    </small>
                  </div>
                </div>
                <div className="comment-content">{comment.comment}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SingleBlog;
