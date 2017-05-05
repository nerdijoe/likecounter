var jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  verify_admin: (req, res, next) => {
    jwt.verify(req.headers.token, process.env.SECRET, (err, decoded) => {
      if(decoded) {
        console.log(`decoded data is: `, decoded);
        if(decoded.role === 0) {
          next();
        }
        else {
          res.send({message: `User doesn't have access.`})
        }

      } else {
        res.send(err);
      }
    }) // end of jwt.verify
  }, // end of verify_admin
  verify_normal: (req, res, next) => {
    jwt.verify(req.headers.token, process.env.SECRET, (err, decoded) => {
      if(decoded) {
        console.log(`decoded data is: `, decoded);
        next();
      } else {
        res.send(err);
      }
    }) // end of jwt.verify
  }// end of verify normal
}
