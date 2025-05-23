/* component appears below comment item when comment's author is logged in 
commentId - unique id of this component's comment
onEdit - callback triggered when Edit button is clicked
onDelete - callback triggered when Delete button is clicked */
const CommentActions = ({ commentId, onEdit, onDelete }) => {
  return (
    <>
      <button onClick={() => onEdit(commentId)}>Edit Comment</button>
      <button onClick={() => onDelete(commentId)}>Delete Comment</button>
    </>
  );
};

export default CommentActions;
