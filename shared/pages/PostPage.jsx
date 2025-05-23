import { useNavigate } from "react-router-dom";
// components for post-level actions and the list of comments
import PostActions from "@shared/components/PostActions";
import CommentList from "@shared/components/CommentList";

const PostPage = ({
  mode = "access",
  // currently authenticated user or null if unauthenticated
  user,
  // post object to display
  post,
  // event handlers for editing/deleting post and comments
  // callback to edit a post
  onPostEdit,
  // callback to delete a post
  onPostDelete,
  // callback to enter edit mode, navigates to comments/:commentid/edit
  onCommentEdit,
  // callback to delete a comment
  onCommentDelete,
  // state values and handlers for editing a comment inline
  renderCommentForm,
  // id of comment currently being edited, from URL params
  editingCommentId,
  // current value in the edit textarea (from parent state)
  editedCommentContent,
  // handler to update editedCommentContent when textarea changes
  onEditedCommentChange,
  // callback to submit edited comment
  onSubmitEditedComment,
  // callback to cancel editing and reset UI state
  onCancelEdit,
}) => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>{post.title}</h1>
      <p>
        <strong>By:</strong>
        {post.author?.username}
      </p>
      <p>{post.content}</p>
      {/* adds a horizontal line to separate post from the comments section */}
      <hr />
      <h3>Comments: ({post.comments?.length || 0})</h3>
      {/* if comments array is empty, no comments yet */}
      {post.comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        /* passes all necessary props to CommentList for rendering and managing
        comment state */
        <CommentList
          // array of comment objects to display
          comments={post.comments}
          // currently authenticated user or null if unauthenticated
          user={user}
          // id of comment currently being edited, from URL params
          editingCommentId={editingCommentId}
          // current value in the edit textarea (from parent state)
          editedCommentContent={editedCommentContent}
          // handler to update editedCommentContent when textarea changes
          onEditChange={onEditedCommentChange}
          // callback to enter edit mode, navigates to comments/:commentid/edit
          onCommentEdit={onCommentEdit}
          // callback to delete a comment
          onCommentDelete={onCommentDelete}
          // callback to submit edited comment
          onSubmitEditedComment={onSubmitEditedComment}
          // callback to cancel editing and reset UI state
          onCancelEdit={onCancelEdit}
        />
      )}
      {/* if in access mode and current user is not the post's author, render 
      the new comment form */}
      {mode === "access" && user?.id !== post.author?.id && renderCommentForm}
      {/* if in edit mode, display edit/delete buttons for the post using 
       PostActions component */}
      {mode === "edit" && (
        <PostActions
          onEdit={onPostEdit}
          onDelete={() => onPostDelete(post.id)}
          post={post}
        />
      )}
      <button onClick={() => navigate(`/`)}>Back to Posts</button>
    </div>
  );
};

export default PostPage;
