const router = require('express').Router();
const auth = require('../middleware/auth');
const { createBook } = require('../controllers/book');
const upload = require('../utils/multer');

/**
 *@parent_route /api/books
 */

router.post('/', auth, upload.single('image'), createBook);

module.exports = router;
