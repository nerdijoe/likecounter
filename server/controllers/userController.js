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
    address: req.body.address,
    zipcode: req.body.zipcode,
    phone: req.body.phone
  })

  console.log(newUser);

  console.log("passwordHash test: ", passwordHash.verify(req.body.password, newUser.password));

  newUser.save( (err, user) => {
    if(err) res.send(err);

    res.send(user)
  })

}


exports.signin = (req, res, next) => {
  console.log("here");
  User.findOne( {username: req.body.username}, (err, user) => {
    if (err) res.send(err);

    // if user exists
    console.log(user);

    if(user){
      // verify password
      // console.log(`req.body.password="${req.body.password}"`)
      // console.log(`password hash="${passwordHash.generate(req.body.password)}"`)
      // console.log(passwordHash.verify(req.body.password, user.password));
      // console.log(user.password);
      if( passwordHash.verify(req.body.password, user.password)) {
        // generate token
        var token = jwt.sign(
          { username: user.username, email: user.username, phone: user.phone},
          process.env.TOKEN_SECRET,
          { expiresIn: '1h' }
        );
        res.send(token);
      }
      else {
        res.send({message: `User entered wrong username and password`})
      }
    }
    else {
      // res.send({message: `User entered wrong username and password`})
      res.send({message: `User not found`})
    }
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
