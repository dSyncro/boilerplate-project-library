/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const BooksService = require("../services/books-service");

const booksService = new BooksService();

module.exports = function (app) {
  app
    .route("/api/books")
    .get(function (req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      const books = booksService.getAll();
      return res.json(books);
    })
    .post(function (req, res) {
      let { title } = req.body;
      if (!title) return res.json("missing required field title");

      //response will contain new book object including atleast _id and title
      const book = booksService.add({ title });
      return res.json(book);
    })
    .delete(function (req, res) {
      //if successful response will be 'complete delete successful'
      booksService.deleteAll();
      return res.json("complete delete successful");
    });

  app
    .route("/api/books/:id")
    .get(function (req, res) {
      const bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      const book = booksService.get(bookid);
      if (!book) return res.json("no book exists");

      return res.json(book);
    })
    .post(function (req, res) {
      const bookid = req.params.id;
      const comment = req.body.comment;
      //json res format same as .get
      if (!comment) return res.json("missing required field comment");
      booksService.addComment(bookid, comment);

      const book = booksService.get(bookid);
      if (!book) return res.json("no book exists");

      return res.json(book);
    })
    .delete(function (req, res) {
      const bookid = req.params.id;
      //if successful response will be 'delete successful'

      const deletedBook = booksService.delete(bookid);
      if (!deletedBook) return res.json("no book exists");
      return res.json("delete successful");
    });
};
