var controller = require('../controllers/appManager');
var router = require('express').Router();

router.post('/update', controller.update);

module.exports = router;
