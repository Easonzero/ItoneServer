var controller = require('../controllers/userManager');
var router = require('express').Router();

router.post('/login', controller.login);

router.post('/modify',controller.modify);

router.get('/userbaseinfo',controller.baseInfo);

router.get('/userelseinfo',controller.plusInfo);

router.get("/getrank",controller.measureRank);

router.post('/register',controller.create);

router.get("/logout",controller.logout);

router.get("/usersbyorder",controller.sortUsers);

module.exports = router;
