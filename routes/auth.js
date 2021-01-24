const router = require('express').Router();
const upload = require('../utils/multer');
const { localRegister } = require('../controllers/auth');

/**
 *@route /api/auth/register
 */

router.post('/register', upload.single('picture'), localRegister);

module.exports = router;
