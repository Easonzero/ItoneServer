var controller = require('../controllers/bookManager');
var router = require('express').Router();

router.get('/search', controller.search);

router.get('/booklist',controller.booksBySubject);

router.get('/download',controller.download);

router.get('/booksbyuser',controller.booksByUser);

module.exports = router;
