const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogPostRoutes = require('./blogPostRoutes');


router.use('/users', userRoutes);
router.use('/blogPosts', blogPostRoutes);

module.exports = router;