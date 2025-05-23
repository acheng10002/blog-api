import { useState, useEffect } from "react";

/* initialValues - object with optional default values - title, content, published
onSubmit - callback run when the form is submitted 
buttonLabel - string label for the submit button */
const PostCard = ({ initialValues = {}, onSubmit, buttonLabel }) => {
  // empty strings for title and content and false for published if not provided
  const [title, setTitle] = useState(initialValues.title || "");
  const [content, setContent] = useState(initialValues.content || "");
  const [published, setPublished] = useState(initialValues.published || false);

  // syncs form state with initialValues when they change (e.g. when loading existing post data)
  useEffect(() => {
    if (
      initialValues?.title ||
      initialValues?.content ||
      initialValues?.published
    ) {
      setTitle(initialValues.title || "");
      setContent(initialValues.content || "");
      setPublished(initialValues.published || false);
    }
    // re-runs side effect if initialValues changes
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // calls onSubmit callback with the current form state as a data object
    onSubmit({ title, content, published });
  };

  return (
    <form onSubmit={handleSubmit} className="post-card">
      <label>
        Title:
        <input
          type="text"
          value={title}
          // binds input value to title state and updates state on change
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <br />
      <label className="new-post-content">
        Content:
        <textarea
          value={content}
          // binds textarea value to content state and updates state on change
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      <br />
      <label>
        Published:
        <input
          type="checkbox"
          checked={published}
          // checkbox for published state
          onChange={(e) => setPublished(e.target.checked)}
        />
      </label>
      <br />
      <button type="submit">{buttonLabel}</button>
    </form>
  );
};

export default PostCard;
