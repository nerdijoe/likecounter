
const insta = require('../model/insta');

let controller = {}

controller.something = (req,res,next)=>{
  insta.something((data)=>{
    res.send(data)
  })
}

controller.userId = (req,res,next)=>{
  insta.userId(req.body.id, (data)=>{
    res.send(data)
  })
}

controller.comment = (req,res,next)=>{
  insta.comment(req.params.id, req.body.text, (data)=>{
    res.send(data)
  })
}

module.exports = controller;