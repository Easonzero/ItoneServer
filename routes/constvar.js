var controller = require('../controllers/constvarManager');
var router = require('express').Router();
/**
 * Created by eason on 5/31/16.
 */
router.post('/sms',controller.sms);
router.post('/course', controller.course);
router.post('/class', controller.class);
router.get('/university',controller.university);
router.post('/faculty',controller.faculty);

module.exports = router;
