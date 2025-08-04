const express = require("express");
const app = express();
let posts = [];

// req.body를 사용하려면 json 미들웨어를 사용해야한다.
// 사용하지 않으면 undefined로 나옴.
app.use(express.json());

// post요청이 application/x-www-form-urlencoded 인 경우 파싱을 위해 사용.
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json(posts);
});

app.post("/posts", (req, res) => {
  console.log(typeof req.body);
  const { title, name, text } = req.body;
  posts.push({ id: posts.length + 1, title, name, text, createdDt: Date() });
  res.json({ title, name, text });
});

app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  const filteredPosts = posts.filter((post) => post.id !== +id);
  const isLengthChanged = posts.length !== filteredPosts.length;
  posts = filteredPosts;
  if (isLengthChanged) {
    res.json("OK");
    return;
  }
  res.json("NOT CHANGED");
});

app.listen(3000, () => {
  console.log("welcome board START!");
});

// 게시글 등록 (POST, 터미널에 입력)
// curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "title=제목1&name=andy&text=안녕하세요~" http://localhost:3000/posts

// 게시글 삭제 (DELETE, 터미널에 입력)
// curl -X DELETE localhost:3000/posts/3
