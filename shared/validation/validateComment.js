export const validateComment = (content) => {
  const errors = [];

  if (!content || !content.trim()) {
    errors.push("Comment content is required.");
  } else if (content.trim().length < 5) {
    errors.push("Comment must be at least 5 characters.");
  } else if (content.trim().length > 1000) {
    errors.push("Comment must be no more than 1000 characters.");
  }

  return errors;
};
