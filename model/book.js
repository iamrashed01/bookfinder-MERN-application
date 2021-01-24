const mongoose = require('mongoose');

const Book = mongoose.model('Book', new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tags: [String],
  description: String,
  isPublished: Boolean,
  price: {
    type: Number,
    required() {
      return this.isPublished;
    },
  },
}, { timestamps: true }));

module.exports = Book;
