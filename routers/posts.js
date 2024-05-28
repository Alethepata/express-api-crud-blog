const express = require('express');
const router = express.Router();

const { index, show, store, download, destroy } = require('../controllers/postsController');

const slugNotFound = require('../middleware/slugNotFound.js')


router.get('/', index);

router.post('/', store);

router.get('/:slug', show);

router.delete('/:slug', slugNotFound, destroy);

router.get('/:slug/download', download);

module.exports = router;