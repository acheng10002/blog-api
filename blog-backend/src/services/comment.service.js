// db access layer
const prisma = require("../db/prisma");

async function createComment(content, postId, authorId) {
  // creates a new record in the Comment table of my db via Prisma
  return prisma.comment.create({
    /* data passed to Prisma to insert into the db
          maps to the fields in my Prisma schema */
    data: {
      content,
      postId,
      /* protected controller has access to req.user.id made available 
            by Passport's JWT strategy */
      authorId,
    },
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
  });
}

async function updateComment(commentId, content) {
  console.log("Updating commentId:", commentId, "with content:", content);
  const existing = await prisma.comment.findUnique({
    where: { id: commentId },
  });
  console.log("Existing content before update:", existing.content);
  // queries Comment table via Prisma to update specific comment
  const updated = await prisma.comment.update({
    where: { id: commentId },
    /* data passed to Prisma to insert into the db
          maps to the fields in my Prisma schema */
    data: {
      content,
    },
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
  });
  const fresh = await prisma.comment.findUnique({
    where: { id: commentId },
  });
  console.log("Fresh comment from DB (post-update):", fresh);

  return updated;
}

async function deleteComment(commentId) {
  // delete comment via Prisma
  return prisma.comment.delete({
    where: { id: commentId },
    include: {
      author: {
        select: { username: true },
      },
    },
  });
}

async function getCommentByIdForAuthorization(commentId) {
  // queries Post table via Prisma to find specific post
  return prisma.comment.findUnique({
    where: { id: commentId },
  });
}

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getCommentByIdForAuthorization,
};
