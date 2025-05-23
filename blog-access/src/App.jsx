import { Routes, Route } from "react-router-dom";
import UserForm from "../../shared/components/UserForm";
import Home from "./pages/Home";
import PostCommentsPage from "./pages/PostCommentsPage";
import NotFound from "../../shared/pages/NotFound";
import "../../shared/styles/App.css";

const App = () => {
  return (
    <Routes>
      {/* Routes define the UI view for a given URL path
      - routes only handle what corresponds to HTTP GET requests, not really a 
        network call, it's a client-side resolution
      - logic for handling POST, PUT, DELETE goes inside components via fetch */}
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/posts/:postid" element={<PostCommentsPage />} />
      <Route
        path="/users/register"
        element={<UserForm key="register" mode="register" />}
      />
      <Route
        path="/auth/login"
        element={<UserForm key="login" mode="login" />}
      />
      <Route path="/auth/logout" element={<Home />} />
      {/* Protected Routes */}
      <Route path="/users/:userid/posts" element={<Home />} />
      <Route
        path="/posts/:postid/comments/:commentId/edit"
        element={<PostCommentsPage />}
      />
      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
