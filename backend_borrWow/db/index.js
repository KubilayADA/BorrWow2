const mongoose = require("mongoose");

// Use the MongoDB URI with authentication details
const MONGO_URI =
  process.env.MONGODB_URI || `mongodb://admin:${process.env.MONGO_PASSWORD}@127.0.0.1:27017/borrWowAPI?authSource=admin`;

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
