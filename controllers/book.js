const Fuse = require("fuse.js");
const Book = require("../models/book");
const mongoose = require("mongoose");

// Add a new book to the library
async function addBookToLibrary(req, res) {
  try {
    const { title, author, genre, publishedYear, ISBN, stockCount } = req.body;

    // Check if required fields are provided
    if (!title || !author || !genre || !publishedYear || !ISBN || !stockCount) {
      return res.status(400).json({ error: "Please provide required fields!!" });
    }

    // Create a new book instance
    let book = new Book({ title, author, genre, publishedYear, ISBN, stockCount });

    // Save the book to the database
    book = await book.save();

    // If book creation fails
    if (!book) {
      return res.status(400).json({ error: "No book created!!" });
    }

    // Return the created book
    return res.status(201).json(book);
  } catch (error) {
    console.log("Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Get all books from the library
async function getAllBooks(req, res) {
  try {
    const books = await Book.find({});

    // If no books are found
    if (!books) {
      return res.status(400).json({ error: "No books available!!" });
    }

    // Return all books
    return res.status(200).json(books);
  } catch (error) {
    console.log("Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Get a specific book by ID
async function getBookById(req, res) {
  try {
    const book = await Book.findById(req.params.bookId);

    // If book is not found
    if (!book) {
      return res.status(400).json({ error: "No book found with this ID!!" });
    }

    // Return the found book
    return res.status(200).json(book);
  } catch (error) {
    console.log("Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Update book information by ID
async function updateBookInformation(req, res) {
  try {
    // Validate book ID
    if (!mongoose.isValidObjectId(req.params.bookId)) {
      return res.status(400).json({ error: "Invalid book ID!!" });
    }

    const { title, author, publishedYear } = req.body;
    const bookId = req.params.bookId;

    // Update book information
    const book = await Book.findByIdAndUpdate(
      bookId,
      { title, author, publishedYear },
      { new: true }
    );

    // If book update fails
    if (!book) {
      return res.status(400).json({ error: "No book updated!!" });
    }

    // Return updated book
    return res.status(200).json(book);
  } catch (error) {
    console.log("Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Delete a book by ID
async function deleteBookInformation(req, res) {
  try {
    // Validate book ID
    if (!mongoose.isValidObjectId(req.params.bookId)) {
      return res.status(400).json({ error: "Invalid book ID!!" });
    }

    const bookId = req.params.bookId;
    const book = await Book.findByIdAndDelete(bookId);

    // If no book is found for deletion
    if (!book) {
      return res.status(400).json({ error: "No book found with this ID!!" });
    }

    // Return the deleted book
    return res.status(200).json(book);
  } catch (error) {
    console.log("Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Search books using Fuse.js (fuzzy search)
async function searchBook(req, res) {
    try {
      const { query } = req.query;
      
      // Check if the query parameter exists
      if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
      }
  
      console.log('Search query received:', query); // Debug log
  
      // Split query by spaces (this will support multi-term searches)
      const queryTerms = query.split(' ').map(term => term.toLowerCase());
      
      // Fetch all books from the database
      const books = await Book.find({});  // You can apply additional filters here to optimize
    
      // Fuse.js configuration
      const options = {
        keys: ['title', 'author', 'genre'], // Fields to search in
        threshold: 0.4,  // Adjust threshold for leniency (lower = more strict)
        includeScore: true,  // Include score to check relevance
      };
      
      const fuse = new Fuse(books, options);
      
      // Perform the search (this uses Fuse's fuzzy search)
      const results = fuse.search(queryTerms.join(' ')).map(result => result.item);
      
      
      // If no results found, return an empty array
      if (results.length === 0) {
        return res.json({ results: [] });
      }
  
      // Return search results
      return res.json({ results });
    } catch (error) {
      console.error('Error during search:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
  addBookToLibrary,
  getAllBooks,
  getBookById,
  updateBookInformation,
  deleteBookInformation,
  searchBook,
};
