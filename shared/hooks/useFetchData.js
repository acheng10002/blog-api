/* React hook for fetching data/GET requests on mount
- must be in a React function component
- is lifecycle-aware, auto re-fetches when dependencies change 
- handles loading state, Auth header via token, and error handling 
- automatic fetch in components 
- for declarative data loading tied to component render cycles */
import { useState, useEffect } from "react";
import { apiFetch } from "@shared/utils/api";

/* url - endpoint to fetch from 
token - option JWT or auth token to include in the request headers */
export const useFetchData = (url, token = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* 1. sets up fetch request to run when the component mounts or when 
  url or token changes */
  useEffect(() => {
    if (!url) return;
    if (url.includes("users") && !token) {
      setLoading(false);
      setError("Unauthorized: No token provided.");
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);

    // includes token if present in the Authorization header
    apiFetch(url, { token })
      // 2. on success, stores the parsed JSON response into data state
      .then(setData)
      // on failure:
      .catch((err) => {
        // logs the error
        console.error("Failed to fetch:", err);
        setError(err.message || "Failed to fetch data.");
        // 2. resets data to null to avoid rendering stale or invalid content
        setData(null);
      })
      // marks loading as false whether the requst succeeded or gailed
      .finally(() => setLoading(false));
  }, [url, token]);

  /* returns an object containing data, the fetched response or null, and 
  loading, a boolean that indicates if the fetch is still in progress */
  return { data, loading, error };
};

/* useState - creates local state in a functional component
-- state persists across re-renders
-- updating state triggers a re-render
useEffect - runs side effects after render
-- ex. data fetch, subscription, DOM manipulation 
-- runs after initial render/mount
-- runs again when dependencies change
-- cleanup runs before the effect re-reruns or when component unmounts 
(cleanup is the function returned from the effect that React will call)
useCallback - memoizes a function so it doesn't get re-created on every render
-- returns the same function reference unless dependencies change
-- useful when passing functions as props or using them in useEffect 
Order of Operations
1. useState is initialized with default values
2. Component renders using the current state/props
(state - owned and managed by the component, mutable via useState, for local and dynamic data
prop - passed from parent to child, immutable within receiving component, for configuration or 
       data from parent
reducer - React pure function that manages state transitions based on dispatch actions)

3. useEffect hooks with empty dependencies get run
4. if a useEffect returns a function, it's registered as a cleanup function 
5. if useCallback is used, functions are created and memoized at this time based on dependencies */
