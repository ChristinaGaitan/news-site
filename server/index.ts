import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Post } from "../shared/types";

const categories = require("./categories.json");
const posts = require("./posts.json");
const comments = require("./comments.json");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = 4000;

// const found = posts.filter(({ category: id }: Post) => id === req.params.id);

app.get("/posts", (_, res) => {
  return res.json(posts);
});

app.get("/categories", (_, res) => {
  return res.json(categories);
});

app.get("/posts/:id", (req, res) => {
  const wantedId = String(req.params.id);
  const post = posts.find(({ id }: Post) => String(id) === wantedId);

  return res.json(post);
});

app.get("/categories/:id", (req, res) => {
  const { id } = req.params;
  const found = posts.filter(({ category }: Post) => category === id);
  const categoryPosts = [...found];

  return res.json(categoryPosts);
});

app.get("/comments/:post", (req, res) => {
  const postId = Number(req.params.post);
  const found = comments.filter(({ post }) => post === postId);

  return res.json(found);
});

app.post("/posts/:id/comments", (req, res) => {
  const postId = Number(req.params.id);
  comments.push({
    id: comments.length + 1,
    author: req.body.name,
    content: req.body.comment,
    post: postId,
    time: "Less than a minute ago",
  });
  return res.json(comments.filter(({ post }) => post === postId));
});

app.listen(port, () =>
  console.log(`DB is running on http://localhost:${port}`),
);
