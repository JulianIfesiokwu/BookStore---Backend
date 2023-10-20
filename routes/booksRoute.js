import express from "express";
import { Book } from "../models/models.js";

const router = express.Router();

// Route to save a new book
router.post("/", async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return res.status(400).send({ message: "Please provide all fields" });
      }
  
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
      };
  
      const book = await Book.create(newBook);
  
      return response.status(201).send(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  // Route to get all books
  router.get("/", async (request, response) => {
    try {
      const books = await Book.find({});
  
      return response.status(200).send({
        count: books.length,
        data: books,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  
  // Route to get a book from DB by id
  router.get("/:id", async (request, response) => {
    try {
      const { id } = request.params;
  
      const book = await Book.findById(id);
  
      return response.status(200).send(book);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  
  // Route to update a book
  router.put('/:id', async (req, res) => {
      try {
        // validate the request
        if (
          !req.body.title ||
          !req.body.author ||
          !req.body.publishYear
        ) {
          return res.status(400).send({
            message: "Complete all required Fields: title, author, publishYear",
          });
        }
    
        // get the book id
        const { id } = req.params
    
        // update book
        const result = await Book.findByIdAndUpdate(id, req.body)
    
        // check result
        if(!result) {
          return res.status(404).send({
            message: "Book not found"
          })
        }
    
        // send response book has been updated
        res.status(200).send({message: "Book updated successfully"})
        
      } catch (error) {
        console.log({ message: error.message });
        res.status(500).send({ message: error.message})
      }
    })
  
  // Route to delete a book
  router.delete("/:id", async (request, response) => {
      try {
        const { id } = request.params;
  
        const result = await Book.findByIdAndDelete(id);
        if(!result) {
          return response.status(404).send({
            message: "Book not found"
          })
        }
  
        response.status(200).send({ message: "Book deleted successfully" })
        
  } catch(error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
  }})

  export default router;