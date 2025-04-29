// db access layer
const prisma = require("../db/prisma");

async function register(username, hash) {
  // creates a new user
  return prisma.user.create({ data: { username, password: hash } });
}

async function getUserPosts(authenticatedId) {
  // queries the db using Prisma to find all Post records for this user
  return prisma.post.findMany({
    // queries where authorId matches the authenticated user's ID
    where: { authorId: authenticatedId },
    // orders results by descending id so most recent posts appear first
    orderBy: { id: "desc" },
    include: {
      _count: {
        select: { comments: true },
      },
    },
  });
}

module.exports = {
  register,
  getUserPosts,
};
