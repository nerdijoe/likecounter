var express = require('express');
var router = express.Router();
const controller = require('../controller/insta');


/* GET home page. */
router.get('/', controller.something);
// router.get('/search', controller.searchOne);
router.post('/', controller.userId);
router.post('/:id', controller.comment);

module.exports = router;
