// my app's JS entry point
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../shared/styles/index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../shared/context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {/* my app's root component */}
        <App />
      </AuthProvider>
    </BrowserRouter>
    {/* StrictMode - dev-only wrapper that ids potential problems in my app 
  it does not render to the DOM and has no effect on production builds */}
  </StrictMode>
);

/* Vite will create a dist folder, and inside it, create a prod-ready version 
of my app, including:
- minified index.html (source code without unnecessary characters to reduce 
  file size and improve load times)
- bundled JS and CSS files 
- optimized assets
static asset - when an asset doesn't change dynamically during runtime or 
               require server-side processing
               files are delivered to the client as-is
pages rendered on the fly from a db, API responses, anything personalized or
session-based ARE NOT static
CDN - Content Delivery Network, network of geographically distributed servers
      that work together to deliver static content
tree-shaking - process used in JS bundlers to remove unused code from the final
               bundle to reduce size and improve load performance
               - must use ES module syntax
*/
