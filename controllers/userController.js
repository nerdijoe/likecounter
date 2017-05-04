var User = require("../models/user");
require('dotenv').config();

var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');


exports.signup = (req, res, next) => {
  var newUser = User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: passwordHash.generate(req.body.password),
    username_insta: req.body.address,
    access_token: req.body.zipcode
  })

  console.log(newUser);

  console.log("passwordHash test: ", passwordHash.verify(req.body.password, newUser.password));

  newUser.save( (err, user) => {
    if(err) res.send(err);

    res.send(user)
  })

}

exports.signin_passport = (req, res, next) => {
  // authentication is handled by passport
  let user = req.user;
  console.log(user);

  var token = jwt.sign(
    { username: user.username, email: user.username, phone: user.phone},
    process.env.TOKEN_SECRET,
    { expiresIn: '1h' }
  );
  res.send(token);
}
