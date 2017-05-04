const axios = require('axios');
require('dotenv').config();
var querystring = require('querystring');

 let keys = {}

keys.something = (callback)=>{
  axios.get(`https://api.instagram.com/v1/users/self/?access_token=${process.env.ACCESS_TOKEN}`)
  .then((response)=>{
    // console.log(response.data);
    callback(response.data)
  })
  .catch((err)=>{
    callback(err)
  })
}

keys.userId = (params, callback)=>{
  console.log(`${params}`);
  console.log(`dapet ${process.env.ACCESS_TOKEN}`);
  axios.get(`https://api.instagram.com/v1/users/${params}?access_token=${process.env.ACCESS_TOKEN}`)
  .then((response)=>{
    console.log(response.data);
    callback(response.data)
  })
  .catch((err)=>{
    // console.log(err);
    callback(err)
  })
}

keys.comment = (id, comment, callback)=>{
  axios.post(`https://api.instagram.com/v1/media/1493602869021027831_493881988/comments`,querystring.stringify({
    access_token:process.env.ACCESS_TOKEN,
    text:comment
  })
)
  .then((response)=>{
    console.log(response.data);
    // callback(response.data)
  })
  .catch((err)=>{
    console.log(err.request);
    // callback(err)
  })
}

module.exports = keys;
