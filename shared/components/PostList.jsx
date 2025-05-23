// renders a single post preview
import PostListItem from "./PostListItem.jsx";

/* posts - array of post objects to display
onView - handler called when post is clicked/views
isPublic - flag indicating whether the post list is rendered in a 
           public-facing mode */
const PostList = ({ posts = [], onView, isPublic = false }) => {
  return (
    <div>
      {posts?.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        // iterates over posts array
        posts.map((post) => (
          <PostListItem
            /* for React list reconcilation 
            React needs a key to uniquely id each element in a list of components, allows React to:
            - detect which items have changed, been added, or removed
            - reuses DOM nodes where possible, avoiding unnecessary re-renders
            - maintain component state correctly when list items move */
            key={post.id}
            // passes full post object to child component
            post={post}
            // passes view handler function
            onView={onView}
            // informs child component whether it should render in public mode
            isPublic={isPublic}
          />
        ))
      )}
    </div>
  );
};

export default PostList;
