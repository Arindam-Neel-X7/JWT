const router = require('express').Router();
const User = require ('../model/User');
const {registerValidation} = require('../routes/validation');
const bcrypt = require ('bcryptjs');

router.post('/register', function (req,res){

// Lets validate the data before giving access as an user
  const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

// Checking if the User already exist in our database or not
User.findOne({email: req.body.email}, function(err,emailExist){
  if (emailExist) {
      return res.status(400).send("Email already exists.");
}
else {
// Hashed password
bcrypt.genSalt(10, function(err, salt) {
  bcrypt.hash(req.body.password, salt, function(err, hashedPassword) {
      // Store hash in your password DB.
      // Create a new user
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      });
      user.save((err,savedUser)=>{
        if (err)
        return console.log(err)
        return res.json(savedUser)
      });
    });
      });
  }
});
});


module.exports = router;
