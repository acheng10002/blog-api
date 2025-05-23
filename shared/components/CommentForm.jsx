/* component appears below Comment List 
onSubmit - function to handle form submission
content - string representing current comment content
onChange - function to handle changes in the textarea */
const CommentForm = ({ onSubmit, content, onChange }) => (
  <form onSubmit={onSubmit}>
    <textarea
      className="add-comment comment"
      /* makes this a controlled input, value bound to content prop 
      (reflects parent component's state) */
      value={content}
      // updates parent state with new user input
      onChange={onChange}
      placeholder="New Comment Here..."
    />
    <button type="submit">Add Comment</button>
  </form>
);

export default CommentForm;
