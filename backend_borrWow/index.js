
const mongoose = require("mongoose");


// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI =
process.env.MONGODB_URI 

const withDB = async (serverListener) => {
  try {
    const x = await mongoose.connect(MONGO_URI);
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    if (typeof serverListener === "function") {
      serverListener();
    }
  } catch (error) {
    console.error("Error connecting to mongo: ", error);
  }
};

module.exports = withDB;
