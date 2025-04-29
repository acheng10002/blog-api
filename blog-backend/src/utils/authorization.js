function authorizeOwnership(resource, userId) {
  // return status if specific resource not found
  if (!resource) {
    const error = new Error("Resource not found");
    error.status = 404;
    throw error;
  }
  // return status if specific resource not owned by current user
  if (resource.authorId !== userId) {
    const error = new Error("Not authorized to perform this action");
    error.status = 403;
    throw error;
  }
}

module.exports = {
  authorizeOwnership,
};
