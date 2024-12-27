# Book Management API

This is a RESTful API for managing a book library system. It allows users to add, update, delete, and search for books in the library. 
The API uses MongoDB for data storage and supports fuzzy search functionality for finding books by title, author, or genre.


## Features

- **Add Book**: Add a new book to the library with details like title, author, genre, published year, ISBN, and stock count.
- **Get All Books**: Retrieve a paginated list of all books in the library.
- **Get Book by ID**: Retrieve detailed information about a specific book using its unique ID.
- **Update Book**: Update the details of an existing book in the library.
- **Delete Book**: Remove a book from the library using its ID.
- **Search Books**: Search books by title, author, or genre using a case-insensitive fuzzy search algorithm.

 ## Installation

 - To run the project locally, follow these steps:

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB (local or cloud-based)

### Steps
- Clone the repository: git clone https://github.com/Rahulpaswan461/book-management-system
- Navigate to the project directory: cd manage-book-information
- Install the dependencies: npm install
- Create a .env file in the root directory (or use the provided example) and configure your MongoDB connection string:
 - MONGO_URL=mongodb://127.0.0.1:27017/manage-books
- Run the server: node index.js

## API Endpoints
- POST /api/books : Add a new book to the library.


            {
            "title": "The Hobbit",
            "author": "J.R.R. Tolkien",
            "genre": "Fantasy",
            "publishedYear": 1937,
            "ISBN": "978-3-16-148410-0",
            "stockCount": 10
          }
 - GET /books : Retrieve a paginated list of all books.

   - Sample Response
        [
     
            {
              "_id": "unique-book-id",
              "title": "The Hobbit",
              "author": "J.R.R. Tolkien",
              "genre": "Fantasy",
              "publishedYear": 1937,
              "ISBN": "978-3-16-148410-0",
              "stockCount": 10
            },
            {
              "_id": "another-book-id",
              "title": "Lord of the Rings",
              "author": "J.R.R. Tolkien",
              "genre": "Fantasy",
              "publishedYear": 1954,
              "ISBN": "978-3-16-148411-7",
              "stockCount": 5
            }
          ]
   - GET /api/books/:bookId : Retrieve detailed information about a specific book by its ID.
   - PUT /api/books/update/:bookId : Update details of a specific book by its ID.
  
         {
          "title": "The Hobbit (Updated)",
          "author": "J.R.R. Tolkien",
          "publishedYear": 1937
        }
   - DELETE /api/books/delete/:bookId : Remove a book from the library by its ID.
   - GET /api/books/search : Search books by title, author, or genre using fuzzy search.
  
## Rate Limiting
- The API uses rate limiting to prevent excessive requests. By default, the rate limit is set to 100 requests per 15 minutes.

## License
 - This project is licensed under the MIT License - see the LICENSE file for details.
