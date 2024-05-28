const express = require('express');
const router = express.Router();

const { index, show, store, download } = require('../controllers/postsController');



router.get('/', index);

router.post('/', store);

router.get('/:slug', show);

router.get('/:slug/download', download);

module.exports = router;