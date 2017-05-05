var User = require("../models/user");
require('dotenv').config();

var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
var axios = require('axios');

var Insta = require('../models/insta');
var insta = new Insta();


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

  // create token
  var token = jwt.sign(
    { username: user.username, id_insta: user.id_insta, access_token: user.access_token, profile_picture: user.profile_picture},
    process.env.TOKEN_SECRET,
    { expiresIn: '1h' }
  );
  res.send(token);
}

exports.instagram_login = (req, res, next) => {
/*
https://api.instagram.com/oauth/authorize/?client_id=ecac160cc15b4bce8ead50131549992d&redirect_uri=http://localhost:3000/users/instagram&scope=public_content&response_type=code
*/
  let url = `https://api.instagram.com/oauth/authorize/?client_id=${process.env.INSTAGRAM_CLIENT_ID}&redirect_uri=${process.env.INSTAGRAM_REDIRECT_URI}&scope=public_content&response_type=code`

  res.redirect(url)
}

// this only gets access token
exports.get_access_token = (req, res, next) => {
  console.log(`req.query.code = ${req.query.code}`);

  let code = req.query.code

  console.log(process.env.INSTAGRAM_CLIENT_ID)
  var querystring = require('querystring');
  axios.post('https://api.instagram.com/oauth/access_token', querystring.stringify({
    client_id: process.env.INSTAGRAM_CLIENT_ID,
    client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: process.env.INSTAGRAM_REDIRECT_URI,
    code: code
  }))
  .then(function (response) {
    console.log(response);
    res.send(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}


// this one gets access token and create user
exports.get_access_token_and_create_user = (req, res, next) => {
  console.log(`req.query.code = ${req.query.code}`);

  let code = req.query.code

  // querystring will format data json similar to postman's POST body
  var querystring = require('querystring');

  // get Instagram access_token
  axios.post('https://api.instagram.com/oauth/access_token', querystring.stringify({
    client_id: process.env.INSTAGRAM_CLIENT_ID,
    client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: process.env.INSTAGRAM_REDIRECT_URI,
    code: code
  }))
  .then(function (response) {
    let insta_data = response.data;
    console.log('insta_data', insta_data);
    console.log(insta_data.user.username);

    // find or create user
    User.findOne({username: insta_data.user.username}, (err, user) => {
      if(err) res.send(err);

      // if user is not found, create user
      // for now, set password value to username
      if(!user){
        var newUser = User({
          name: insta_data.user.full_name,
          username: insta_data.user.username,
          password: passwordHash.generate(insta_data.user.username),
          username_insta: insta_data.user.username,
          id_insta: insta_data.user.id,
          profile_picture: insta_data.user.profile_picture,
          access_token: insta_data.access_token
        })

        newUser.save( (err, user) => {
          if(err) res.send(err);

          // token is created when user is signin normally
          res.redirect('http://localhost:8080')
        })
      }
      // user is already existed, just redirect to index
      else {
        // token is created when user is signin normally
        res.redirect('http://localhost:8080')
      }

    }) // end of User.findOne
  })
  .catch(function (error) {
    console.log(error);
  });
}


exports.get_media_recent = (req, res, next) => {
  insta.get_media_recent( req.headers.token , data => {
    res.send(data);
  })
}

exports.get_media_recent_by_tag = (req, res, next) => {
  var tag = req.params.tag;
  console.log(`search by tag: '${tag}'`);

  insta.get_media_recent_by_tag( req.headers.token, tag, (data) => {
    res.send(data);
  })

}
