import { useNavigate } from "react-router-dom";
import { useFetchData } from "@shared/hooks/useFetchData";
import { useAuth } from "@shared/hooks/useAuth";
// import PostListItem from "@shared/components/PostListItem";
import SharedHomeView from "@shared/pages/SharedHomeView";
// import Header from "@shared/components/Header";
import { useHandleLogout } from "@shared/hooks/useHandleLogout";

const Home = () => {
  // initializes hook that navigates users to different route
  const navigate = useNavigate();
  // retrieve authenticated user
  const { user } = useAuth();
  const handleLogout = useHandleLogout();

  // fetches data and returns object containing posts data and loading
  const { data: posts, loading } = useFetchData("http://localhost:3000/posts");

  const handleView = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <SharedHomeView
      user={user}
      posts={posts}
      loading={loading}
      onView={handleView}
      onLogin={() => navigate("/auth/login")}
      onRegister={() => navigate("/users/register")}
      onLogout={handleLogout}
      mode="edit"
    />
  );
  /*
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
        <h1>Published Posts</h1>
        {/* if loading is true, placeholder message 
        {loading ? (
          <p>Loading posts...</p>
        ) : // if posts array is empty, display a fallback message
        posts?.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          // iterates over posts array
          posts.map((post) => (
            <PostListItem
              key={post.id}
              post={post}
              onView={handleView}
              isPublic={true}
            />
          ))
        )}
      </div>
    </>
  );
  */
};

export default Home;
