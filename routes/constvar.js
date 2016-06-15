var controller = require('../controllers/constvarManager');
var router = require('express').Router();
/**
 * Created by eason on 5/31/16.
 */
rouer.post('/sms',controller.sms);
router.post('/course', controller.course);
router.post('/class', controller.class);
router.get('/university',controller.university);

module.exports = router;