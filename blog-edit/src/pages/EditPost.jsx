import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@shared/hooks/useAuth";
import { useFetchData } from "@shared/hooks/useFetchData";
import { apiFetch } from "@shared/utils/api";
import PostCard from "@shared/components/PostCard";
import LoadingOrError from "@shared/components/LoadingOrError";

const EditPost = () => {
  // extracts postid from URL parameters
  const { postid } = useParams();
  // initializes hook that navigates users to different route
  const navigate = useNavigate();
  // retrieves currently authenticated user and token
  const { user, token } = useAuth();
  // local state to track any errors that occur during submission
  const [submitError, setSubmitError] = useState(null);

  /* fetches current post by its ID, returns initialValues (the fetched post),
  loading state, and error from the GET request */
  const {
    data: initialValues,
    loading,
    error,
  } = useFetchData(`http://localhost:3000/posts/${postid}`, token);

  // handles the form submission
  const handleUpdate = async (data) => {
    try {
      // sends a PUT request to update the post
      await apiFetch(`http://localhost:3000/posts/${postid}`, {
        method: "PUT",
        // data payload gets passed in the request body
        body: data,
        // token is used for authentication
        token,
      });
      // if update succeeds, redirect user to their posts page
      navigate(`/users/${user.id}/posts`);
    } catch (err) {
      // if update fails, logs the error and sets error message in local state
      console.error("Failed to update post:", err);
      setSubmitError("Post update failed. Please try again.");
    }
  };

  if (loading || error) {
    return <LoadingOrError loading={loading} error={error} label="post" />;
  }
  // if no post data, render a fallback message
  if (!initialValues) return <p>Post not found.</p>;

  return (
    <>
      {/* if PUT request error, show it above the form */}
      {submitError && <p className="error">{submitError}</p>}
      <PostCard
        // pre-populates with initialValues from GET request
        initialValues={initialValues}
        // submits via handleUpdate
        onSubmit={handleUpdate}
        buttonLabel="Update Post"
      />
    </>
  );
};

export default EditPost;
