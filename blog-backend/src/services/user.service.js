// db access layer
const prisma = require("../db/prisma");
const { Prisma } = require("@prisma/client");

async function register(name, username, hash) {
  try {
    // creates a new user
    return await prisma.user.create({
      data: { name, username, password: hash },
    });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      throw new ApiError(400, "User already exists");
    }
    throw err;
  }
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
