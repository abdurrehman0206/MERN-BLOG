import React, { useState } from "react";
import { AiFillTag } from "react-icons/ai";
import { useAuthContext } from "../hooks/useAuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Post() {
  document.title = "WriteStack | Post";
  const { user } = useAuthContext();
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState(null);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleCatInput = (e) => {
    e.preventDefault();
    if (e.target.value) {
      const newTag = e.target.value[0].toUpperCase() + e.target.value.slice(1);

      if (e.key === " ") {
        setTags([...tags, newTag]);
      }
      if (e.key === "Enter") {
        setTags([...tags, newTag]);
      }
    }
    e.target.value = "";
  };

  const postBlog = async (e) => {
    e.preventDefault();

    if (!title || !description || !category) {
      toast.error("Please fill all the fields", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    let blog = {
      title: title[0].toUpperCase() + title.slice(1),
      author: user.fullname,
      content: description[0].toUpperCase() + description.slice(1),
      category: category[0].toUpperCase() + category.slice(1),
      tags,
    };

    if (blog) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("file", image);
        console.log("🚀 ~ file: Post.jsx:62 ~ postBlog ~ image:", image);
        formData.append("upload_preset", "ml_default");

        console.log(
          "🚀 ~ file: Post.jsx:66 ~ postBlog ~ process.env.REACT_APP_CLURL:",
          process.env.REACT_APP_CLURL
        );
        const imageUp = await fetch(`${process.env.REACT_APP_CLURL}`, {
          method: "POST",
          body: formData,
        });
        const imgJson = await imageUp.json();
        if (imgJson.url) {
          blog = {
            ...blog,
            image: imgJson.url,
          };
        }

        const response = await fetch("/api/blogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(blog),
        });
        const json = await response.json();
        if (json.success) {
          // dispatch({
          //   type: "ADD_BLOG",
          //   payload: json.data,
          // });
          setTitle("");
          setDescription("");
          setImage("");
          setCategory("");
          setTags([]);

          toast.success(json.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          console.log(json.message);
          console.log(json.error);
          toast.error(json.message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="post-blog-container ">
      <ToastContainer />

      <form encType="multipart/form-data">
        <div className="form-group">
          <h2>Post to WriteStack</h2>
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Enter title"
            className="form-control"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title || ""}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            placeholder="Enter description"
            className="form-control"
            id="description"
            rows="3"
            onChange={(e) => setDescription(e.target.value)}
            value={description || ""}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            name="image"
            type="file"
            placeholder="Enter image URL"
            className="form-control"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>

          <input
            type="text"
            placeholder="Enter category"
            className="form-control"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            value={category || ""}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            placeholder="Enter tags"
            className="form-control"
            id="tags"
            // onChange={(e) => handleCatInput(e)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.code === "Space") {
                console.log("🚀 ~ file: Post.jsx:96 ~ Post ~ key:", e.key);
                handleCatInput(e);
              }
            }}
            onBlur={(e) => {
              if (!e.target.value) {
                return;
              }
              const newTag =
                e.target.value[0].toUpperCase() + e.target.value.slice(1);
              setTags([...tags, newTag]);
              e.target.value = "";
            }}

            // delimiters={[","]}
          />
        </div>
        <div className="form-group">
          {tags &&
            tags.map((tag, i) => {
              return (
                <span className="tag" key={i}>
                  {" "}
                  <AiFillTag />
                  {tag}
                </span>
              );
            })}
        </div>
        <div className="form-group">
          <button className="btn cta-btn" onClick={postBlog} disabled={loading}>
            {loading ? "Posting" : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Post;
