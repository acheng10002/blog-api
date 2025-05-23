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
  // hook that accesses logout from AuthContext
  const handleLogout = useHandleLogout();

  // fetches data and returns object containing posts data and loading
  const { data: posts, loading } = useFetchData("http://localhost:3000/posts");

  // navigates user to the route for viewing a full post
  const handleView = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    // shared layout for listing posts
    <SharedHomeView
      // currently authenticated user or null if not logged in
      user={user}
      // list of post objects to display
      posts={posts}
      // flag indicating whether posts are still being fetched
      loading={loading}
      // handler to view a specific post
      onView={handleView}
      // navigates to login page when called
      onLogin={() => navigate("/auth/login")}
      // navigates to registration page when called
      onRegister={() => navigate("/users/register")}
      onLogout={handleLogout}
      // tells SharedHomeView it's in reader mode
      mode="access"
    />
  );
};

export default Home;
