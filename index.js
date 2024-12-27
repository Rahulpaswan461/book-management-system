require("dotenv").config()

const express = require("express");
const { connectMongoDB } = require("./connection");
const bookRoute = require("./routes/book");
const { limiter, logRequestDetails } = require("./middlewares/rate-limit");

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB database
connectMongoDB(process.env.MONGO_URL)
  .then(() => console.log("MongoDB is connected successfully !!"))
  .catch(error => console.log("There is some error while connecting", error.message));

// Simple root route to verify the server is running
app.get("/", (req, res) => {
  return res.send("From the server");
});

// Middleware setup
app.use(express.json());  // Parse incoming JSON requests
app.use(limiter);          // Apply rate limiting middleware
app.use(logRequestDetails); // Log details of each request (method, URL, timestamp)

// Define routes for books
app.use("/api/books", bookRoute);

// Start the server on the specified port
app.listen(PORT, () => {
  console.log("Server is running at port", PORT);
});
