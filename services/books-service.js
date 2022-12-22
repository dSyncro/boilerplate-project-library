const crypto = require("crypto");

class BooksService {
  booksMap = {};
  comments = [];

  get(id) {
    const book = this.booksMap[id];
    if (!book) return undefined;

    const comments = this.getComments(id).map((comment) => comment.text);
    return {
      ...book,
      comments,
      commentcount: comments.length,
    };
  }

  getComments(bookId) {
    return this.comments.filter((comment) => comment.bookId === bookId);
  }

  getAll() {
    return Object.keys(this.booksMap)
      .map((id) => this.get(id))
      .filter(Boolean);
  }

  add(book) {
    const id = crypto.randomUUID();
    const newBook = {
      _id: id,
      ...book,
    };

    this.booksMap[id] = newBook;
    return newBook;
  }

  addComment(bookId, text) {
    this.comments.push({
      bookId,
      text,
    });
  }

  delete(id) {
    const bookToDelete = this.booksMap[id];
    this.booksMap[id] = undefined;
    return bookToDelete;
  }

  deleteAll() {
    this.booksMap = {};
  }
}

module.exports = BooksService;
