// React tool activates additional checks and warnings during development
import { StrictMode } from "react";
// initializes and renders a React app
import { createRoot } from "react-dom/client";
// global styles
import "../../shared/styles/index.css";
// root React component containing all of my app's routes and layout
import App from "./App.jsx";
// router than enables client-side navigation using browser history's API
import { BrowserRouter } from "react-router-dom";
// context provider that manages authentication state across my app
import { AuthProvider } from "../../shared/context/AuthContext";

// mounts the app to the DOM element with id root
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* any child component of App can access useAuth() */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
