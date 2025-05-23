import CommentActions from "./CommentActions";

const CommentItem = ({
  // comment object to display
  comment,
  // flag indicating if comment is in edit mode
  isEditing,
  // flag indicating if user is comment's author
  isOwner,
  // current content string being edited, from state
  editedCommentContent,
  // handler to update edited content in state when user types
  onChange,
  // handler to trigger saving the edits
  onSubmit,
  // handler to cancel editing and return to normal view
  onCancel,
  // handler to enter edit mode
  onEdit,
  // handler to delete the comment
  onDelete,
}) => (
  // uses comment.id as key so React can track list changes
  <li key={comment.id}>
    {/* displays username of the comment's author */}
    <strong>{comment.author.username}</strong>
    {/* if the currently rendered comment is being edited if commendId from URL 
    params matches this comment's id, then in edit comment mode */}
    {isEditing ? (
      <>
        <textarea
          className="comment"
          // pre-fills with comment content,
          value={editedCommentContent}
          /* allows the user to modify the content in-place
          onChange updates local state as the user types */
          onChange={onChange}
        />
        {/* renders a save button to submit the edited comment via 
          submitEditedComment */}
        <button onClick={onSubmit}>Save</button>
        {/* renders a cancel button that navigates back to the post page removing 
          the commentId from the route and editing edit comment mode */}
        <button onClick={onCancel}>Cancel</button>
      </>
    ) : (
      // if current comment not in edit mode, render its content
      <>
        <p>{comment.content}</p>
        {/* shows edit/delete buttons for comment authors */}
        {isOwner && (
          <CommentActions
            // unique id of this component's comment
            commentId={comment.id}
            // callback triggered when Edit button is clicked
            onEdit={onEdit}
            // callback triggered when Delete button is clicked
            onDelete={onDelete}
          />
        )}
      </>
    )}
  </li>
);

export default CommentItem;
