var controller = require('../controllers/constvarManager');
var router = require('express').Router();
/**
 * Created by eason on 5/31/16.
 */
router.post('/course', controller.course);

router.post('/university',controller.university);

module.exports = router;