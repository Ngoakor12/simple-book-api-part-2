const express = require("express");
const app = express();
const logger = require("./middleware/logger");
const validateId = require("./middleware/validateId");
// A mock/fake books database
const books = [
  { title: "The Hobbit", author: "J.R.R. Tolkien", id: 1 },
  { title: "The Fellowship of the Ring", author: "J.R.R. Tolkien", id: 2 },
  { title: "1984", author: "George Orwell", id: 3 },
  { title: "Animal Farm", author: "George Orwell", id: 4 },
  { title: "To Kill a Mockingbird", author: "Harper Lee", id: 5 },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", id: 6 },
];
// Mock user data
const user = {
  username: "admin",
  password: "admin",
  isAdmin: false, // initially not an admin
  loggedIn: false,
};

// middleware
app.use(express.json());
app.use(logger);

// Home route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

/*
Add your new routes here
*/

app.get("/books", (_, res) => {
  res.status(200).json(books);
});

app.get("/books/:id", validateId, (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send(new Error("Book not found"));
  res.json(book);
});

app.post("/books", (req, res) => {
  const { title, author } = req.body;
  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put("/books/:id", validateId, (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send(new Error("Book not found"));

  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;
  res.json(book);
});

app.delete("/books/:id", validateId, (req, res) => {
  const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (bookIndex === -1)
    return res.status(404).send(new Error("Book not found"));

  const deletedBook = books.splice(bookIndex, 1);
  res.json(deletedBook);
});

module.exports = app;
