// db access layer
const prisma = require("../db/prisma");

async function getAllPosts() {
  // queries Post table via Prisma to find all post
  return prisma.post.findMany({
    // only show published posts
    where: { published: true },
    // order form most recent to oldest
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: { username: true },
      },
      // fetches comment count
      _count: {
        select: { comments: true },
      },
    },
  });
}

async function getPostById(postId) {
  // queries Post table via Prisma to find specific post
  return prisma.post.findUnique({
    where: { id: Number(postId) },
    include: {
      author: {
        select: { id: true, username: true },
      },
      comments: {
        include: {
          author: {
            select: { id: true, username: true },
          },
        },
      },
    },
  });
}

async function createPost({ title, content, published, authorId }) {
  // queries Post table via Prisma to create a post
  return prisma.post.create({
    /* data passed to Prisma to insert into the db
        maps to the fields in my Prisma schema */
    data: {
      title,
      content,
      // fallback to false in not provided
      published: published ?? false,
      /* protected controller has access to req.user.id made available 
          by Passport's JWT strategy */
      authorId,
    },
    include: {
      author: { select: { username: true } },
    },
  });
}

async function updatePost(postId, { title, content, published }) {
  // queries Post table via Prisma to update specific post
  return prisma.post.update({
    where: { id: postId },
    /* data passed to Prisma to insert into the db
  maps to the fields in my Prisma schema */
    data: {
      title,
      content,
      published,
    },
  });
}

async function deletePost(postId) {
  // delete post via Prisma
  return prisma.post.delete({
    where: { id: postId },
  });
}

async function getPostByIdForAuthorization(postId) {
  // queries Post table via Prisma to find specific post
  return prisma.post.findUnique({
    where: { id: postId },
  });
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostByIdForAuthorization,
};
