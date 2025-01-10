const express = require('express');
const User = require('../Models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchUser = require('../Middleware/fetchUser')

const JWT_SECRET = 'Developmentisagoodthing';

//ROUTE 1 => Create a user using : POST : /api/auth/createUser
router.post('/createUser',[
    body('name','Enter a valid Name').isLength({ min: 3 }),
    body('email','Enter  valid Email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 }),
],async (req,res)=>{
  let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
      //Checking whether emailId already exists in database
      let user = await User.findOne({email : req.body.email})
      if(user){
        success = false
        return res.status(400).json({error : "Sorry a user with this EmailId already exists"})
      }

      //Hashing and Adding Salt to the password to prevent it from leaking
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password,salt);

      //Create a new user
        user = await User.create({
          name: req.body.name,
          email : req.body.email,
          password: secPass
        })
        //Used for authentication
        const data = {
          user : {
            id : user.id
          }
        }
        const authtoken = jwt.sign(data,JWT_SECRET);
        success = true
        res.json({success,authtoken : authtoken})
    }
    //Showing error if some other unexpected error occurs
    catch(error){
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
})

//ROUTE 2 => Logging in using user's crdentials: POST : /api/auth/login
router.post('/login',[
  body('email','Enter a valid Email').isEmail(),
  body('password','Password cannot be blank').exists(),
],async (req,res)=>{
  let success = false;
  //If there are any errors return Bad Request 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //Credentials entered by user
  const {email,password} = req.body;

  try{
    //trying to find email from database
    let user = await User.findOne({email});
    if(!user){
      success = false;
      return res.status(400).json({error: "Please enter valid login credentials"});
    }
    //matching the user entered password with the password in the database
    const passCompare = await bcrypt.compare(password,user.password);
    if(!passCompare){
      success = false;
      return res.status(400).json({success, error: "Please enter valid login credentials"});
    }
    //Used for authentication
    const data = {
      user : {
        id : user.id
      }
    }
    const authtoken = jwt.sign(data,JWT_SECRET);
    success = true;
    res.json({success, authtoken : authtoken})
}
  catch(error){
    console.log(error.message);
    res.status(500).send("Some error occured");
  }
})

//ROUTE 3 => Get user details from JWT token : POST : /api/auth/getuser
router.post('/getuser',fetchUser,async (req,res)=>{
  try{
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  }
  catch(error){
    console.log(error.message);
    res.status(500).send("Some error occured");
  }
})

module.exports = router;