// new post form
import { useState } from "react";
import PostCard from "@shared/components/PostCard";
import { useAuth } from "@shared/hooks/useAuth";
import { apiFetch } from "@shared/utils/api";
import { useNavigate } from "react-router-dom";
import Header from "@shared/components/Header";

const CreatePost = () => {
  // initializes hook that navigates users to different route
  const navigate = useNavigate();
  // retrieves currently authenticated user and token from AuthContext
  const { user, token, logout } = useAuth();
  // local state to track any errors that occur during submission
  const [submitError, setSubmitError] = useState(null);

  const handleCreate = async (data) => {
    try {
      // sends a POST request to create the post
      await apiFetch("${import.meta.env.VITE_API_BASE_URL}/posts/", {
        method: "POST",
        // data payload gets passed into the request body
        body: data,
        // token is used for authentication
        token,
      });
      // if creation succeeds, redirects user to their posts page
      navigate(`/users/${user.id}/posts`);
    } catch (err) {
      // if creation fails, logs the error and sets error message in local state
      console.error("Failed to create post:", err);
      setSubmitError("Post creation failed. Please try again.");
    }
  };

  // if no authentication, placeholder message to login
  if (!user || !token) {
    return (
      <div>
        <p>You must be logged in to create a post.</p>
        <button onClick={() => navigate("/auth/login")}>Login</button>
      </div>
    );
  }

  return (
    <>
      <Header
        mode="edit"
        user={user}
        onLogin={() => navigate("/auth/login")}
        onRegister={() => navigate("/users/register")}
        onLogout={logout}
      />
      <h1>New Post</h1>
      {/* if POST request error, show it above the form */}
      {submitError && <p className="error">{submitError}</p>}
      <PostCard onSubmit={handleCreate} buttonLabel="Create Post" />
      <button
        onClick={() =>
          user ? navigate(`/users/${user.id}/posts`) : navigate("/")
        }
      >
        Back to {user ? "Your Posts" : "Home"}
      </button>
    </>
  );
};

export default CreatePost;
