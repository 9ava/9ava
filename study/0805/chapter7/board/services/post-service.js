const { ObjectId } = require("mongodb");

// 📄 글 목록 조회
async function list(collection, page = 1, search = "") {
  const PAGE_SIZE = 10;
  const query = search
    ? { $or: [{ title: { $regex: search } }, { writer: { $regex: search } }] }
    : {};

  const total = await collection.countDocuments(query);
  const posts = await collection
    .find(query)
    .sort({ createdDt: -1 })
    .skip((page - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE)
    .toArray();

  const paginator = {
    page,
    totalPages: Math.ceil(total / PAGE_SIZE),
    totalPosts: total,
  };

  return [posts, paginator];
}

// 📝 글 작성
async function writePost(collection, post) {
  post.hits = 0; // ✅ 초기 조회수 설정
  post.createdDt = new Date().toISOString();
  return await collection.insertOne(post);
}

// 🔍 게시글 상세
async function getDetailPost(collection, id) {
  return {
    value: await collection.findOne({ _id: new ObjectId(id) }),
  };
}

// 🔒 게시글 ID + 비밀번호로 확인
async function getPostByIdAndPassword(collection, { id, password }) {
  return await collection.findOne({
    _id: new ObjectId(id),
    password,
  });
}

// 🔄 게시글 수정
async function updatePost(collection, id, post) {
  return await collection.updateOne({ _id: new ObjectId(id) }, { $set: post });
}

// 📥 게시글 ID로 단순 조회 (댓글용 등)
async function getPostById(collection, id) {
  return await collection.findOne({ _id: new ObjectId(id) });
}

module.exports = {
  list,
  writePost,
  getDetailPost,
  getPostByIdAndPassword,
  updatePost,
  getPostById,
};
