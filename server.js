const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const connectionString = process.env.MONGO_URL;

// Connect to MongoDB using async/await
async function connectDB() {
  try {
    mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Databasega muvaffaqiyatli ulandi");

    // Start the server after successful connection
    const server = require("./app.js");
    //const host = "0.0.0.0"; // Add this line
    const PORT = process.env.PORT || 3003; // Assuming your port is 3003

    server.listen(PORT, () => {
      console.log(`Server running at http://${PORT}/`);
    });
  } catch (err) {
    console.error("ERROR on connection MongoDB:", err.message);
  }
}

// Call the connectDB function
connectDB();
