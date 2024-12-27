const express = require("express")
const { addBookToLibrary, getAllBooks, getBookById, updateBookInformation, searchBook, deleteBookInformation } = require("../controllers/book")

const router = express.Router()

router.post("/",addBookToLibrary)
router.get("/",getAllBooks)
router.get("/get/:bookId",getBookById)
router.put("/update/:bookId", updateBookInformation)
router.delete("/delete/:bookId",deleteBookInformation)
router.get("/search",searchBook)

module.exports = router