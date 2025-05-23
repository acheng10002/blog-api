// monorepo - each app in its own directory within the same single repo
// App.jsx is app's main entry point for both UI structure and routing
import { Routes, Route } from "react-router-dom";
import UserForm from "../../shared/components/UserForm";
import Home from "./pages/Home";
import UserPosts from "./pages/UserPosts";
import PostManagePage from "./pages/PostManagePage";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
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
      <Route path="/posts/:postid" element={<PostManagePage />} />
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
      <Route path="/users/:userid/posts" element={<UserPosts />} />
      <Route path="/users/:userid/posts/create" element={<CreatePost />} />
      <Route path="/users/:userid/posts/:postid/edit" element={<EditPost />} />
      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;

/* frontend makes RESTful API to the backend 
1. Express server listens on port 3000
2. Start the React frontend dev server, runs on 5173 
3. Use fetch in my React components to call the backend 

- delete button does delete, but window confirmation says otherwise
- update button goes to 404 page not found */
