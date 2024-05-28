const express = require('express');
const router = express.Router();

const { index, show, create, download  } = require('../controllers/postsController');

router.get('/', index);
router.get('/create', create);
router.get('/:slug', show);
router.get('/:slug/download', download);

module.exports = router;