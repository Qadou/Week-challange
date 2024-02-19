const data = require("../data.json");
const fs = require("fs");

function getAllPosts() {
  try {
    const postsData = fs.readFileSync("./data.json", "utf-8");
    return JSON.parse(postsData);
  } catch (error) {
    console.error("Error reading posts data:", error);
    return [];
  }
}

function getAllPostsController(req, res) {
  try {
    const posts = getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}

const createPost = (req, res) => {
  const createdAt = new Date();
  let id = data.length + 1;
  id = id.toString();
  try {
    const { title, content, author } = req.body;
    const newPost = { id, title, content, author, createdAt };

    let postsData = fs.readFileSync("./data.json", "utf-8");
    let posts = JSON.parse(postsData);

    posts.push(newPost);
    fs.writeFileSync("./data.json", JSON.stringify(posts, null, 2));

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating new post:", error);
    res.status(500).json({ error: "Could not create post" });
  }
};

const searchById = (req, res) => {
  const id = parseInt(req.params.id);
  foundPost = data.find((data) => data.id == id);
  if (foundPost) {
    res.send(foundPost);
  } else {
    res.send("Post does not exist");
  }
};
const updatePost = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const content = req.body.content;
  const author = req.body.author;

  const Data = getAllPosts() || [];
  const updatedData = Data.map((post) =>
    post.id === id ? { ...post, title, content, author } : post
  );
  fs.writeFileSync("./data.json", JSON.stringify(updatedData, null, 2));

  res.status(200).json({ id, title, content, author });
};

const deletepost = (req, res) => {
  try {
    const postId = req.params.id;

    let postsData = fs.readFileSync("./data.json", "utf-8");
    let posts = JSON.parse(postsData);
    const updatedPosts = posts.filter((post) => post.id !== postId);
    if (posts.length === updatedPosts.length) {
      return res.status(404).json({ error: "Post not found" });
    }
    fs.writeFileSync("./data.json", JSON.stringify(updatedPosts, null, 2));
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Could not delete post" });
  }
};

module.exports = {
  getAllPostsController,
  searchById,
  updatePost,
  createPost,
  deletepost,
};
