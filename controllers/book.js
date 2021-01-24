const fs = require('fs');
const _ = require('lodash');
const { createBookValidation } = require('../validation/book');
const Book = require('../model/book');

const createBook = async (req, res) => {
  const { error } = createBookValidation(req.body);
  if (error) {
    if (req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(400).json({ message: error.details[0].message, success: false });
  }
  try {
    const book = await new Book(_.pick(req.body, ['name', 'tags', 'description', 'isPublished', 'price']));
    book.author = req.user.id;
    await book.save();
  } catch (ex) {
    console.log('Something Wrong!');
  }

  return res.status(200).json({ data: book, message: 'book created successfully', success: true });
};

module.exports = { createBook };
