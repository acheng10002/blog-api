// entry point for Express app
// allos access to config values
require("dotenv").config();

// imports Express app instance
const app = require("./app");

// uses port defined in .env or defaults to 3000
const PORT = process.env.PORT || 3000;

// starts the server and listens on the chosen port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
