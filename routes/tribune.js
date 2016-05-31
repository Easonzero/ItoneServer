var controller = require('../controllers/tribuneManager');
var router = require('express').Router();

router.post('/createIssue', controller.createIssue);

router.post('/getQuestions', controller.getQuestions);

router.post('/getIssue', controller.getIssue);

module.exports = router;
