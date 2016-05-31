var controller = require('../controllers/adviceManager');
var router = require('express').Router();

router.post('/', controller.advice);

module.exports = router;
