import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@shared/hooks/useAuth";
import { useFetchData } from "@shared/hooks/useFetchData";
import LoadingOrError from "@shared/components/LoadingOrError";
import PostListItem from "@shared/components/PostListItem";
import Header from "@shared/components/Header";
import { useHandleLogout } from "@shared/hooks/useHandleLogout";

const UserPosts = () => {
  // extracts userid from URL parameters
  const { userid } = useParams();
  // initializes hook that navigates users to different route
  const navigate = useNavigate();
  // // retrieves currently authenticated user and token
  const { user, token } = useAuth();
  // initializes custom hook to access logout and navigate user to rook
  const handleLogout = useHandleLogout(navigate);

  const {
    data: posts,
    loading,
    error,
  } = useFetchData(
    user && token && user.id
      ? `${import.meta.env.VITE_API_BASE_URL}/users/${userid}/posts`
      : null,
    token
  );

  return (
    <>
      <Header
        mode="edit"
        user={user}
        onLogin={() => navigate("/auth/login")}
        onRegister={() => navigate("/users/register")}
        onLogout={handleLogout}
      />
      <div>
        {/* shows loading message id user info is not ready */}
        {!user || !user.id ? (
          <p>Loading user...</p>
        ) : loading || error ? (
          <LoadingOrError loading={loading} error={error} label="posts" />
        ) : (
          <>
            {/* user name's or your */}
            <h1>{user.name ? `${user.name}'s Posts` : "My Posts"}</h1>
            {/* when clicked, renders CreatePost.jsx */}
            <button onClick={() => navigate(`/users/${user.id}/posts/create`)}>
              Create New Post
            </button>
            {/* if no posts, render a fallback message */}
            {!posts || posts.length === 0 ? (
              <p>You have no posts yet.</p>
            ) : (
              <ul className="all-posts">
                {/* iterates through posts and shows each post as li element 
                list of all posts still shows whether or not they are published */}
                {posts.map((post) => (
                  <PostListItem
                    key={post.id}
                    post={post}
                    onView={(postId) => navigate(`/posts/${postId}`)}
                    // still renders private posts
                    isPublic={false}
                  />
                ))}
              </ul>
            )}
          </>
        )}
        <button onClick={() => navigate(`/`)}>Back to All Posts</button>
      </div>
    </>
  );
};

export default UserPosts;
