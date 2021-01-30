const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  createBook, getAllBook, getSingleBook, removeSingleBook,
} = require('../controllers/book');
const upload = require('../utils/multer');

/**
 *@parent_route /api/books
 */

router.post('/', auth, upload.single('image'), createBook);
router.get('/', auth, getAllBook);
router.get('/:id', auth, getSingleBook);
router.delete('/:id', auth, removeSingleBook);

module.exports = router;
