import PostPage from "@shared/pages/PostPage";
// utilities for routing
import { useParams, useNavigate } from "react-router-dom";
// custom hook and utilities for auth, API, logout, data fetching
import { useHandleLogout } from "@shared/hooks/useHandleLogout";
import { useAuth } from "@shared/hooks/useAuth";
import { useFetchData } from "@shared/hooks/useFetchData";
import { apiFetch } from "@shared/utils/api";
// feedback component
import LoadingOrError from "@shared/components/LoadingOrError";
// layout component
import Header from "@shared/components/Header";

const PostManagePage = () => {
  // extracts postid from URL parameters
  const { postid } = useParams();
  // retrieves currently authenticated user and token from context
  const { user, token } = useAuth();
  // initializes hook that navigates users to different route
  const navigate = useNavigate();
  const handleLogout = useHandleLogout(navigate);

  /* fetches data from my API using the postid and returns object containing 
  post data, loading, error */
  const {
    // renames data to post for clarity
    data: post,
    // loading also loads to indicate whether the fetch is still in process
    loading,
    error,
    // automatically includes auth header if token exists
  } = useFetchData(
    `${import.meta.env.VITE_API_BASE_URL}/posts/${postid}`,
    token || undefined
  );

  // early return if loading or error, and fallback UI if post doesn't exist
  if (loading || error) {
    return <LoadingOrError loading={loading} error={error} label="post" />;
  }
  // if no post, render a fallback message
  if (!post) return <p>Post not found.</p>;

  // checks if user is post author
  const isAuthor = user && post.author && user.id === post.author.id;

  if (!isAuthor) {
    return <p>You are not authorized to manage this post.</p>;
  }

  // click handler navigates user to post edit view
  const handlePostEdit = () => {
    navigate(`/users/${user.id}/posts/${postid}/edit`);
  };

  // click handler that uses apiFetch to send DELETE request
  const handlePostDelete = async (id) => {
    // displays browser confirmation dialog to the user
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      // if confirmed, sends a DELETE request to backend API to remove the post
      await apiFetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${id}`, {
        method: "DELETE",
        // token from context
        token,
      });
      // on successful deletion, redirect user to personal post list page
      navigate(`/users/${user.id}/posts`);
      // if error during deletion, log it and show user an alert
    } catch (err) {
      console.error("Failed to delete post:", err);
      alert("Failed to delete post. Try again.");
    }
  };

  return (
    <>
      {/* Header provides login, register, and logout handlers using navigate
      hook and handleLogout */}
      <Header
        // UI state and visibility
        mode="edit"
        // currently authenticated user or null if unauthenticated
        user={user}
        // auth action handlers allow header to render login/register/logout buttons
        onLogin={() => navigate("/auth/login")}
        onRegister={() => navigate("/users/register")}
        onLogout={handleLogout}
      />
      {/* PostPage passes the current post and user and wires up edit and 
      delete handlers */}
      <PostPage
        // UI state and visibility
        mode="edit"
        // post object to display
        post={post}
        // currently authenticated user or null if unauthenticated
        user={user}
        isAuthor={isAuthor}
        // cb triggered when user initiates an edit on the post
        onPostEdit={handlePostEdit}
        // cb triggered when user confirms deletion of the post
        onPostDelete={handlePostDelete}
        onBackToPosts={() => navigate(`/`)}
      />
    </>
  );
};

export default PostManagePage;
