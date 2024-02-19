const express = require("express");
const router = express.Router();
const {
  getAllPostsController,
  searchById,
  updatePost,
  createPost,
  deletepost,
} = require("../Controllers/postsController");

router.use(express.json());
router.get("/posts", getAllPostsController);
router.get("/posts/:id", searchById);
router.post("/posts", createPost);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletepost);

module.exports = router;
