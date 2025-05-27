const PostActions = ({ isAuthor, post, onEdit, onDelete }) => {
  if (!isAuthor) return null;
  console.log("PostActions received post:", post);
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
