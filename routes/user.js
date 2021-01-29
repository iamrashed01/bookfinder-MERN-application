const router = require('express').Router();
const auth = require('../middleware/auth');
const upload = require('../utils/multer');
const { getProfileController, updateProfileController } = require('../controllers/user');
/**
 *@parent_route /api/profile
 */
router.get('/', auth, getProfileController);
router.post('/', auth, upload.single('picture'), updateProfileController);

module.exports = router;
