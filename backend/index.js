const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const logger = (req, res, next) => {
  console.log(req.method, req.url, res.statusCode);
  next();
};

app.use(logger);
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    throw new Error(err.message);
  });
export default app;
