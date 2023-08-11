const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    image: {
      type: String,
      default:
        "https://i0.wp.com/thinkfirstcommunication.com/wp-content/uploads/2022/05/placeholder-1-1.png?w=1200&ssl=1",
    },
    category: { type: String, required: true },
    tags: [{ type: String }],

    user_id: { type: String },
    comments: [
      {
        userId: { type: String, required: true },
        username: { type: String, required: true },
        comment: { type: String, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
    likes: [
      {
        type: String,
      },
    ],
    views: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
