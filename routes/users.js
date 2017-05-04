var express = require('express');
var router = express.Router();
const passport = require('passport');
var user_controller = require('../controllers/userController')
var jwt_helper = require('../helpers/jwt');



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// create user
router.post('/signup', user_controller.signup);
// router.post('/signin', user_controller.signin);
router.post('/signin', passport.authenticate('local', {session: false}) ,user_controller.signin_passport);

router.get('/instagram', user_controller.get_access_token);

router.get('/instagram/get_media_recent', user_controller.get_media_recent);
router.get('/instagram/get_media_recent/:tag', user_controller.get_media_recent_by_tag);

module.exports = router;
