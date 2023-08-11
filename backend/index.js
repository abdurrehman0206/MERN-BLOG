const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const corsOpts = {
  origin: ["https://writestack.vercel.app", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOpts));
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
