// components for UI layout
import PostPage from "@shared/pages/PostPage";
import CommentForm from "@shared/components/CommentForm";
// hooks for rendering
import { useState, useEffect } from "react";
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
// utility for validation
import { validateComment } from "@shared/validation/validateComment";

const PostCommentsPage = () => {
  // extracts postid and commentId from URL parameters
  const { postid, commentId } = useParams();
  // retrieves currently authenticated user and token from context
  const { user, token } = useAuth();
  // hook that access logout from AuthContext
  const handleLogout = useHandleLogout();
  // initializes hook that navigates users to different route
  const navigate = useNavigate();

  // state for edited comment content
  const [editedContent, setEditedContent] = useState("");
  // state for new comment content
  const [newContent, setNewContent] = useState("");
  // state for edited and new comment content validation errrors
  const [newCommentErrors, setNewCommentErrors] = useState([]);
  const [editCommentErrors, setEditCommentErrors] = useState([]);
  // a key to trigger data re-fetching
  const [refreshKey, setRefreshKey] = useState(0);

  /* fetches data from my API using the postid and returns object containing 
  post data, loading, error */
  const {
    // renames data to post for clarity, includes post's comments
    data: post,
    // loading also loads to indicate whether the fetch is still in process
    loading,
    error,
    // automatically includes auth header if token exists
  } = useFetchData(
    // freshKey forces a reload after mutations
    `http://localhost:3000/posts/${postid}?k=${refreshKey}`,
    token || undefined
  );

  // holds content for the in-place comment editing field
  useEffect(() => {
    if (post && commentId) {
      // finds the first element in comments array that
      const comment = post.comments.find(
        (c) =>
          // has a id matching commentId, compares them as strings
          String(c.id) === String(commentId)
      );
      /* when post or commentID changes, populate the edit field with the existing
      comment content */
      if (comment) setEditedContent(comment.content);
    }
  }, [post, commentId]);

  // early return if loading or error, and fallback UI if post doesn't exist
  if (loading || error) {
    return <LoadingOrError loading={loading} error={error} label="post" />;
  }
  // if no post, render a fallback message
  if (!post) return <p>Post not found.</p>;

  // click handler navigates user to comment edit view
  const handleCommentEdit = (id) => {
    navigate(`/posts/${postid}/comments/${id}/edit`);
  };

  // click handler that uses apiFetch to send DELETE request, async API call
  const handleCommentDelete = async (id) => {
    // displays a confirmation dialog
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;
    try {
      /* sends a DELETE request to backend API, URL targets specific comment 
      using postid and id */
      await apiFetch(`http://localhost:3000/posts/${postid}/comments/${id}`, {
        method: "DELETE",
        // token/JWT passed to authenticate the request
        token,
      });
      /* triggers a re-fetch of post/comment data by updating refreshKey 
      React sees refreshKey change and re-executes useFetchData (because url has
      changed!), fetching latest
      post and comments from the backend */
      setRefreshKey((k) => k + 1);
      // if apiFetch call fails, log error to console and show alert to user
    } catch (err) {
      console.error("Failed to delete comment:", err);
      alert("Failed to delete comment. Try again.");
    }
  };

  // click handler for PUT and reload after submission
  const submitEditedComment = async () => {
    // validates the edited comment content and returns if errors are non-zero
    const errors = validateComment(editedContent);
    if (errors.length > 0) {
      setEditCommentErrors(errors);
      return;
    }
    // clears previous error messages if input passes validation
    setEditCommentErrors([]);

    try {
      /* sends a PUT request to backend API, URL targets specific comment 
      using postid and commentId */
      await apiFetch(
        `http://localhost:3000/posts/${postid}/comments/${commentId}`,
        {
          method: "PUT",
          // token/JWT passed to authenticate the request
          token,
          // request payload includes new content
          body: { content: editedContent },
        }
      );
      // clears edited content from state/resets textarea
      setEditedContent("");
      // triggers a re-fetch of post/comment data by updating refreshKey
      setRefreshKey((k) => k + 1);
      // navigates user back to post view route
      navigate(`/posts/${postid}`);
    } catch (err) {
      // if API call fails, log it and set error message to display to user
      console.error("Failed to update comment:", err);
      setEditCommentErrors("Failed to update comment. Try again.");
    }
  };

  const handleCreateComment = async (e) => {
    // prevents page reload
    e.preventDefault();
    // validates the new comment content and returns if errors are non-zero
    const errors = validateComment(newContent);
    if (errors.length > 0) {
      setNewCommentErrors(errors);
      return;
    }
    // clears previous error messages if input passes validation
    setNewCommentErrors([]);

    try {
      /* sends a POST request to backend API, URL targets specific comment 
      using postid */
      await apiFetch(`http://localhost:3000/posts/${postid}/comments/`, {
        method: "POST",
        // token/JWT passed to authenticate the request
        token,
        // request payload includes new content
        body: { content: newContent },
      });
      // clears textarea after submit
      setNewContent("");
      // triggers a re-fetch of post/comment data by updating refreshKey
      setRefreshKey((k) => k + 1);
    } catch (err) {
      // if API call fails, log it and set error message to display to user
      console.error("Failed to create comment:", err);
      setNewCommentErrors("Failed to delete create. Try again.");
    }
  };

  return (
    <>
      {/* renders shared Header with proper navigation callbacks */}
      <Header
        mode="access"
        user={user}
        onLogin={() => navigate("/auth/login")}
        onRegister={() => navigate("/users/register")}
        onLogout={handleLogout}
      />
      <PostPage
        /* renders PostPage will full post content, comments, comment 
        form, all handlers and validation errors */
        mode="access"
        post={post}
        user={user}
        editingCommentId={commentId}
        editedCommentContent={editedContent}
        onEditedCommentChange={(e) => setEditedContent(e.target.value)}
        onSubmitEditedComment={submitEditedComment}
        onCancelEdit={() => navigate(`/posts/${postid}`)}
        onCommentEdit={handleCommentEdit}
        onCommentDelete={handleCommentDelete}
        editCommentErrors={editCommentErrors}
        renderCommentForm={
          <>
            {newCommentErrors.length > 0 && (
              <ul>
                {/* iterates over newCommentErrors array generating a li for
                each error message */}
                {newCommentErrors.map((err, index) => (
                  // display each error message in a li
                  <li key={index}>{err}</li>
                ))}
              </ul>
            )}
            <CommentForm
              // callback triggered on form submission
              onSubmit={handleCreateComment}
              // current value of comment textarea
              content={newContent}
              // updates newContent when user types in textarea
              onChange={(e) => setNewContent(e.target.value)}
            />
          </>
        }
      />
    </>
  );
};

export default PostCommentsPage;
