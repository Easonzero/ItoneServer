var controller = require('../controllers/bookManager');
var router = require('express').Router();

router.post('/search', controller.search);

router.post('/booklist',controller.booksBySubject);

router.post('/download',controller.download);

router.post('/userbooks',controller.userbooks);

module.exports = router;
