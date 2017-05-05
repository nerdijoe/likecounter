require('dotenv').config();
var jwt = require('jsonwebtoken');
var axios = require('axios');


class Insta {
  get_media_recent ( token, callback ) {

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if(decoded) {
        console.log(`decoded data is: `, decoded);
        console.log(typeof decoded);
        console.log(decoded.id_insta);

        var userid = decoded.id_insta;
        var access_token = decoded.access_token;

        var url = `https://api.instagram.com/v1/users/${userid}/media/recent/?access_token=${access_token}`

        axios.get(url)
        .then(function (response) {
          console.log(response);
          // res.send(response.data);
          callback(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
        // end of axios.get

      } // end of if(decoded)
      else {
        // res.send(err);
        callback(err);
      }
    }) // end of jwt.verify


  } // end of get_media_recent

  get_media_recent_by_tag (token, tag, callback ) {

    console.log(`search by tag: '${tag}'`);

    // decode token to get the instagram_id
    jwt.verify( token , process.env.TOKEN_SECRET, (err, decoded) => {
      if(decoded) {
        console.log(`decoded data is: `, decoded);
        console.log(typeof decoded);
        console.log(decoded.id_insta);
        var userid = decoded.id_insta;
        var access_token = decoded.access_token;

        var url = `https://api.instagram.com/v1/users/${userid}/media/recent/?access_token=${access_token}`

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
          // res.send(result);
          callback(result);

        })
        .catch(function (error) {
          console.log(error);
        });
        // end of axios.get


      } // end of if(decoded)
      else {
        // res.send(err);
        callback(result);
      }
    }) // end of jwt.verify

  } // end of get_media_recent_by_tag

}

module.exports = Insta;
