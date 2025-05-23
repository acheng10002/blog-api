const PostListItem = ({ post, onView, isPublic = false }) => {
  return (
    <div className="each-post">
      {/* renders post title */}
      <h2>
        {post.title}
        {/* if post is not public and not published, append "(Draft)"*/}
        {!isPublic && !post.published && (
          <span className="draft"> (Draft)</span>
        )}
      </h2>
      {/* if the view is public and the post has an author username, display
       the author's name */}
      {isPublic && post.author?.username && (
        <p>
          <strong>By:</strong> {post.author.username}
        </p>
      )}

      <p>
        {/* renders post content preview: shows the first 200 chars and adds ...
        if content is longer than 200 chars */}
        {post.content?.slice(0, 200)}
        {post.content?.length > 200 && "..."}
      </p>
      {/* shows number of comments
      uses post._count.comments if available, from Prisma’s include: { _count: true }) 
      fallsback to post.comments.length 
      defaults to 0 if neither available */}
      <p>Comments: {post._count?.comments ?? post.comments?.length ?? 0}</p>
      {/* renders action button, triggers onView(post.id) if onView is defined */}
      <button onClick={() => onView?.(post.id)}>
        {/* button text adjusts if isPublic is true */}
        View Full Post{isPublic && " & Comments"}
      </button>
    </div>
  );
};

export default PostListItem;
