var controller = require('../controllers/messageManager');
var router = require('express').Router();

router.post('/send', controller.sendMessage);

router.post('/getMessage', controller.getMessage);

module.exports = router;
