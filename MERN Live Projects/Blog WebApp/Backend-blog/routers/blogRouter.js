const express = require("express");
const blogController = require("../controllers/blogController");
const blogRouter = express.Router();

blogRouter.get("/blogs", blogController.getBlog);

blogRouter.post("/blogs", blogController.createBlog);
blogRouter.delete("/blogs/:id", blogController.deleteBlog);

blogRouter.put("/blogs/:id/like", blogController.updateLikes);

blogRouter.put("/blogs/:id/comment", blogController.updateComments);



module.exports = blogRouter;
