import React from "react";
import blogimage from "../../assets/download.png";
import "./BlogCard.css";
import { AiFillTag, AiOutlineFieldTime, AiOutlineEye } from "react-icons/ai";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
function BlogCard({ blog }) {
  const navigate = useNavigate();
  const openBlog = (id) => {
    navigate(`/blogs/${id}`);
  };
  return (
    <div className="blog-wrapper ">
      <div className="header ">
        <div className="top ">
          <div className="category">{blog.category}</div>

          <img src={blog.image} alt="" />
          <h4 className="title ">{blog.title}</h4>
        </div>
        <div className="bottom ">
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
          <div className="views">
            <AiOutlineEye />
            {blog.views.length} views
          </div>
        </div>
      </div>
      <div className="content ">{blog.content}</div>
      <div className="footer ">
        <div className="read-more" onClick={() => openBlog(blog._id)}>
          Read More
        </div>
      </div>
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
    </div>
  );
}

export default BlogCard;
