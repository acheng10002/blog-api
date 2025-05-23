// db access layer
const prisma = require("../db/prisma");
const { Prisma } = require("@prisma/client");
const ApiError = require("../utils/ApiError");

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
  try {
    // queries the db using Prisma to find all Post records for this user
    return prisma.post.findMany({
      // queries where authorId matches the authenticated user's ID
      where: { authorId: authenticatedId },
      // orders results by descending id so most recent posts appear first
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { comments: true },
        },
      },
    });
  } catch (err) {
    console.error("Failed to query posts:", err);
    throw err;
  }
}

module.exports = {
  register,
  getUserPosts,
};
