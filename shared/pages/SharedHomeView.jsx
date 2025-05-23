// renders top section
import Header from "../components/Header";
// ernders list of post previews
import PostList from "../components/PostList";
const SharedHomeView = ({
  // currently authenticated user or null if unauthenticated
  user,
  // array of post objects to display
  posts,
  // flag indicating if data is still being fetched
  loading,
  // handler called when post is clicked/views
  onView,
  // handler functions for auth actions
  onLogin,
  onRegister,
  onLogout,
  // string representing current UI mode
  mode,
}) => (
  <>
    <Header
      // mode and user determine UI state and visibility
      mode={mode}
      user={user}
      // auth action handlers allow header to render login/register/logout buttons
      onLogin={onLogin}
      onRegister={onRegister}
      onLogout={onLogout}
    />
    <div>
      <h1>Published Posts</h1>
      {/* if loading is true, placeholder message */}
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        // if posts array is empty, display a fallback message
        <PostList posts={posts} onView={onView} isPublic />
      )}
    </div>
  </>
);

export default SharedHomeView;
