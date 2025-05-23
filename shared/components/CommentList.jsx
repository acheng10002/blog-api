import CommentItem from "./CommentItem";

const CommentList = ({
  // array of comment objects to display
  comments,
  // currently authenticated user or null if unauthenticated
  user,
  // id of comment currently being edited, from URL params
  editingCommentId,
  // current value in the edit textarea (from parent state)
  editedCommentContent,
  // handler to update editedCommentContent when textarea changes
  onEditChange,
  // callback to enter edit mode, navigates to comments/:commentid/edit
  onCommentEdit,
  // callback to delete a comment
  onCommentDelete,
  // callback to submit edited comment
  onSubmitEditedComment,
  // callback to cancel editing and reset UI state
  onCancelEdit,
}) => (
  <ul>
    {/* if comments array has elements, put each comment into an li */}
    {comments.map((comment) => (
      <CommentItem
        // uses comment.id as key so React can track list changes
        key={comment.id}
        // comment object to display
        comment={comment}
        /* if the currently rendered comment is being edited if commendId from 
        URL params matches this comment's id, then in edit comment mode */
        isEditing={String(comment.id) === String(editingCommentId)}
        // shows edit/delete buttons for comment authors
        isOwner={user?.id === comment.author.id}
        // current content string being edited, from state
        editedCommentContent={editedCommentContent}
        // handler to update edited content in state when user types
        onChange={onEditChange}
        // handler to trigger saving the edits
        onSubmit={onSubmitEditedComment}
        // handler to cancel editing and return to normal view
        onCancel={onCancelEdit}
        // handler to enter edit mode
        onEdit={onCommentEdit}
        // handler to delete the comment
        onDelete={onCommentDelete}
      />
    ))}
  </ul>
);

export default CommentList;
