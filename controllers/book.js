const fs = require('fs');
const _ = require('lodash');
const { createBookValidation, signleBookValidation } = require('../validation/book');
const Book = require('../model/book');

const createBook = async (req, res) => {
  const { error } = createBookValidation(req.body);
  if (error) {
    if (req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(400).json({ message: error.details[0].message, success: false });
  }
  const book = await new Book(_.pick(req.body, ['name', 'tags', 'description', 'isPublished', 'price']));
  book.author = req.user.id;
  book.image = req.file.path;
  await book.save();
  return res.status(200).json({ data: book, message: 'book created successfully', success: true });
};

const getAllBook = async (req, res) => {
  const {
    search, tags, price_min, price_max,
  } = req.query;
  const filter = {};
  if (search) {
    filter.name = new RegExp(search, 'i');
  }
  if (tags) {
    filter.tags = { $in: tags };
  }
  if (price_min && price_max) {
    filter.price = { $gte: price_min, $lte: price_max };
  } else if (price_min) {
    filter.price = { $gte: price_min };
  } else if (price_max) {
    filter.price = { $lte: price_max };
  }

  const books = await Book.find(filter)
    .select('-__v');
  res.status(200).json({
    data: books,
    message: 'successfully data retrieved',
    success: true,
  });
};

const getSingleBook = async (req, res) => {
  const { error } = signleBookValidation(req.params);
  if (error) return res.status(400).json({ message: error.details[0].message, success: false });

  const book = await Book.findById(req.params.id);
  if (!book) {
    return res.status(400).json({ message: 'invalid id params', success: false });
  }
  return res.status(200).json({ data: book, message: 'Book retrieved successfully', success: true });
};

const removeSingleBook = async (req, res) => {
  const { error } = signleBookValidation(req.params);
  if (error) return res.status(400).json({ message: error.details[0].message, success: false });

  const book = await Book.findByIdAndRemove(req.params.id);
  if (!book) {
    return res.status(400).json({ message: 'invalid id params', success: false });
  }
  try {
    fs.unlinkSync(book.image);
  } catch (ex) {
    console.log(ex.message);
  }
  return res.status(200).json({ message: 'Book removed successfully', success: true });
};

module.exports = {
  createBook, getAllBook, getSingleBook, removeSingleBook,
};
