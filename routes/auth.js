const router = require('express').Router();
const upload = require('../utils/multer');
const auth = require('../middleware/auth');
const { localRegister, localLogin, accountVerify } = require('../controllers/auth');

/**
 *@parent_route /api/auth
 */

router.post('/register', upload.single('picture'), localRegister);
router.get('/login', localLogin);
router.post('/verify', auth, accountVerify);

module.exports = router;
