const request = require("supertest");
const app = require("../src/server");

fdescribe("Books API", () => {
  it("should fetch all books", async () => {
    const response = await request(app).get("/books");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should fetch a book by ID", async () => {
    const response = await request(app).get("/books/1");
    expect(response.body).toEqual(jasmine.any(Object));
  });

  it("should return 404 for a non-existent book", async () => {
    const response = await request(app).get("/books/999");
    expect(response.status).toBe(404);
  });

  it("should create a new book", async () => {
    const newBook = { title: "1984", author: "George Orwell" };
    const response = await request(app).post("/books").send(newBook);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(jasmine.any(Object));
  });

  it("should update an existing book", async () => {
    const updatedBook = { title: "The Great Gatsby (Updated)" };
    const response = await request(app).put("/books/1").send(updatedBook);
    expect(response.body).toEqual(jasmine.any(Object));
  });

  it("should delete a book by ID", async () => {
    const response = await request(app).delete("/books/1");
    expect(response.status).toBe(200);
  });

  it("should return 404 for deleting a non-existent book", async () => {
    const response = await request(app).delete("/books/999");
    expect(response.status).toBe(404);
  });
});
