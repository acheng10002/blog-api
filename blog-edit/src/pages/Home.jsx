import { useNavigate } from "react-router-dom";
import { useFetchData } from "@shared/hooks/useFetchData";
import { useAuth } from "@shared/hooks/useAuth";
import SharedHomeView from "@shared/pages/SharedHomeView";
import { useHandleLogout } from "@shared/hooks/useHandleLogout";

const Home = () => {
  // initializes hook that navigates users to different route
  const navigate = useNavigate();
  // retrieve authenticated user
  const { user } = useAuth();
  const handleLogout = useHandleLogout(navigate);

  // fetches data and returns object containing posts data and loading
  const { data: posts, loading } = useFetchData(
    "${import.meta.env.VITE_API_BASE_URL}/posts"
  );

  const handleView = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <SharedHomeView
      // currently authenticated user or null if unauthenticated
      user={user}
      // array of post objects to display
      posts={posts}
      // flag indicating if data is still being fetched
      loading={loading}
      // handler called when post is clicked/views
      onView={handleView}
      // handler functions for auth actions
      onLogin={() => navigate("/auth/login")}
      onRegister={() => navigate("/users/register")}
      onLogout={handleLogout}
      // string representing current UI mode
      mode="edit"
    />
  );
};

export default Home;
