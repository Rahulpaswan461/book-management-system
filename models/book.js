const mongoose = require('mongoose');

// Define the Book Schema
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title is required
    trim: true,     // Automatically removes extra spaces around the title
  },
  author: {
    type: String,
    required: true, // Author is required
    trim: true,     // Automatically removes extra spaces around the author name
  },
  genre: {
    type: String,
    required: true, // Genre is required
    trim: true,     // Automatically removes extra spaces
  },
  publishedYear: {
    type: Number,
    required: true, // Published year is required
  },
  ISBN: {
    type: String,
    unique: true,   // ISBN should be unique
    required: true, // ISBN is required
    trim: true,     // Automatically removes extra spaces around the ISBN
  },
  stockCount: {
    type: Number,
    required: true, // Stock count is required
    min: 0,         // Stock count cannot be negative
    default: 0,     // Default value for stock count is 0
  }
});

// Create the model based on the schema
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
