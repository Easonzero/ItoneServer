var render = require('../controllers/render');
var router = require('express').Router();

/* GET home page. */
router.get('/', render.home);

module.exports = router;
