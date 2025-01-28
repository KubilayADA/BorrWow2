require("dotenv").config();

const app = require('./app');
const withDB = require('./db');


// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 5005;

// ℹ️ Connects to the database
withDB(() => {
  // ℹ️ If connection was successful, start listening for requests
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
});
