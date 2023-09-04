var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../model/User.model');


/* GET users listing. */
router.post('/login', async function(req, res, next) {
  const {email, password} = req.body;
  let ifUserFound = await User.find({email:email}); //or findOne
  if(ifUserFound.length == 0){
    return res.status(404).send("User not found");
  }
  let isPasswordMatched = await bcrypt.compare(password, ifUserFound[0].password);
  if(!isPasswordMatched){
    return res.status(403).send("Password incorrect");
  }
  else{
    return res.send({
      status: "success",
      data: ifUserFound[0]
    });
  }
});

router.post('/register', async function(req, res, next) {
  const {employeeName, dob, phoneNumber, username, email, password} = req.body;
  
  let ifUserFound = await User.find({email:email});
  if(ifUserFound.length != 0){
    return res.status(409).send("User already exists");
  }
  
  let hashedPassword = await bcrypt.hash(password,10);
  let user = new User({
    employeeName: employeeName,
    dob: dob,
    phoneNumber: phoneNumber,
    username: username,
    email: email,
    password: hashedPassword,
  });
  let dataSaved = await user.save();
  if(dataSaved){
    return res.status(200).send("User registered successfully");
  }
  return res.status(500).send("Error in registering user");
});

module.exports = router;