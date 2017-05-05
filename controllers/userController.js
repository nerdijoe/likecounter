var User = require("../models/user");
require('dotenv').config();

var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');

var axios = require('axios');

var InstagramAPI = require('instagram-api');
var instagramAPI = new InstagramAPI(process.env.ACCESS_TOKEN);

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
    { username: user.username, email: user.username, access_token: user.access_token},
    process.env.TOKEN_SECRET,
    { expiresIn: '1h' }
  );
  res.send(token);
}

exports.get_access_token = (req, res, next) => {
  console.log(`req.query.code = ${req.query.code}`);

  // var ACCESS_TOKEN = "187611459.ecac160.5d1ca500b51f431f8dc00895ac9fd625"
  // axios.get(`https://api.instagram.com/v1/users/nerdijoe/media/recent/?access_token=${ACCESS_TOKEN}`)
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  // });

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

exports.get_media_recent = (req, res, next) => {
  // instagramAPI.userMedia("nerdijoe")
  // .then ( result => {
  //   console.log(result.data);
  //   res.send(result);
  // }, err => {
  //   console.log(err)
  // })

  // var userid = "187611459" //nerdijoe
    var userid = "5418877821"

  // var userid = "493881988"

  var url = `https://api.instagram.com/v1/users/${userid}/media/recent/?access_token=${process.env.ACCESS_TOKEN}`

  axios.get(url)
  .then(function (response) {
    console.log(response);
    res.send(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

}

exports.get_media_recent_by_tag = (req, res, next) => {
  var tag = req.params.tag;
  console.log(`search by tag: '${tag}'`);

  var userid = "187611459"
  // var userid = "493881988"
  var url = `https://api.instagram.com/v1/users/${userid}/media/recent/?access_token=${process.env.ACCESS_TOKEN}`

  axios.get(url)
  .then(function (response) {
    // console.log(response);
    let media = response.data.data;

    console.log(media);

    let result = []
    media.map( m => {
      if (m.tags.includes(tag))
        result.push(m);
    })


    res.send(result);
  })
  .catch(function (error) {
    console.log(error);
  });

}
