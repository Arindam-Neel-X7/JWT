const router = require('express').Router();
const User = require ('../model/User');

router.post('/register', function (req,res){
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  user.save((err,savedUser)=>{
    if (err)
    return console.log(err)
    return res.json(savedUser)
  })
});

module.exports = router;
