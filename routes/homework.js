var controller = require('../controllers/homeworkManager');
var router = require('express').Router();

router.post('/send', controller.sendHomework);

router.post('/getHomework', controller.getHomework);

module.exports = router;