const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");


const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  likeBlog,
  commentBlog,
  deleteBlog,
} = require("../controller/blogController");

router.use(requireAuth);
router.post("/", createBlog);
router.get("/", getBlogs);
router.get("/:id", getBlog);
router.put("/:id", updateBlog);
router.put("/:id/like", likeBlog);
router.put("/:id/comment", commentBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
