const { authorizeOwnership } = require("./authorization");

async function handleWithOwnership({ fetchResource, userId, action }) {
  const resource = await fetchResource();
  // checks if current user is allowed to perform this action
  authorizeOwnership(resource, userId);
  return action(resource);
}

module.exports = { handleWithOwnership };
