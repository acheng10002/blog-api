/* general utility that handles HTTP requests, accepts full control over method, token, headers, etc. 
- can be used outside React, must be manually invoked, and returns a promise 
- is not lifecycle-aware 
- does not handle state
- use case is manual fetch with full control 
-- for imperative actions like submit/delete/update */
export const apiFetch = async (
  // 1. endpoint - URL to send the request to
  endpoint,
  /* method - HTTP method, default is GET 
  body - request payload
  token - JWT for authorization
  headers - additional custom headers
  options - any other fetch options */
  { method = "GET", body, token, headers = {}, ...options } = {}
) => {
  // builds the heads object
  const finalHeaders = {
    // always includes this
    "Content-Type": "application/json",
    /* 2. if a token is present, adds Authorization: Bearer <token> 
    passes the token using the Bearer schema */
    ...(token && { Authorization: `Bearer ${token}` }),
    // merges into any custom headers passed by the caller
    ...headers,
  };
  // executes the fetch call using:
  const res = await fetch(endpoint, {
    // provided method
    method,
    // finalHeaders
    headers: finalHeaders,
    // 3. body stringified as JSON, adds the body only if it exists
    ...(body && { body: JSON.stringify(body) }),
    ...options,
  });

  // 4. if the response status is not in the 200-299 range
  if (!res.ok) {
    // reads the response body as plain text and captures the server's error message
    const errorText = await res.text();
    // throws error with the message from the server or a fallback status message
    throw new Error(errorText || `Request failed: ${res.status}`);
  }

  // if there's no content, skip parsing
  if (res.status === 204 || res.headers.get("Content-Length") === "0") {
    return null;
  }

  // if request succeeds, parses and returns the JSON response body
  return res.json();
};
