const PostActions = ({ isAuthor, post, onEdit, onDelete }) => {
  if (!isAuthor) return null;

  return (
    <>
      {/* button to publish unpublished post or to unpublish published ones */}
      <button onClick={onEdit}>
        Edit{post.published ? "/Unpublish" : "/Publish"} Post
      </button>
      <button onClick={onDelete}>Delete Post</button>
    </>
  );
};

export default PostActions;
