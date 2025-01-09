const Admin = require('../models/AdminUser');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

const getTeam = async(req, res) => {
  try {
    const response = await Admin.find();
    const users = response.map((user)=>{
      const name = user.name, email=user.email,position= user.position;
      return {name,email,position};
    })
    if(users){
      res.status(200).json(users)
    }
    else
      res.status(400).json({message: "Error in the Admin User Controller"});
  } catch (error) {
    res.status(500).json(error.message);
  }
}

//Register the Admin
const adminRegister = async(req, res) => {
    const { name,displayname, email, password, position, mobile, role } = req.body;
    const userExists = await Admin.findOne({ email });
  
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
   
    const newUser = await Admin.create({
      name,
      displayname,
      email,
      password,
      position,
      mobile,
      role
    });
    if (newUser) {
      const response = await Admin.find();
      res.status(201).json(response);
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
}

//Login 
const adminLogin =async (req, res) => {
 try {   
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });
    // if(!user)
    //   res.json({message:"User Not Found"})
    // console.log(user);
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        message: "Login Success",
        id: user._id,
        name: user.name,
        displayname: user.displayname,
        email: user.email,
        mobile: user.mobile,
        position: user.position,
        role: user.role,
        password: user.password,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid email or password' });
    }
  }
  catch(err){
    res.status(500).json({Error: err.message});
  }
}

const adminUpdate = async(req, res) => {
try {  
  const { name,displayname, email, password, position, mobile, role } = req.body;
  const userExists = await Admin.findOne({ email });
 if(userExists){
  const user = await Admin.updateOne({email:email},{
    displayname,
    position
  });
  const newUser = await Admin.findOne({ email });
  if (newUser) {
    res.status(200).json({
      id: newUser._id,
      name: newUser.name,
      displayname: newUser.displayname,
      email: newUser.email,
      mobile: newUser.mobile,
      position: newUser.position,
      role: newUser.role,
      mobile: newUser.mobile,
      token: generateToken(newUser._id),
    });
  } }
  else {
    res.status(400).json({ message: 'Invalid user data' });
  }
}
catch(error){
  res.status(500).json({Error: error.message});
}

}

module.exports = { adminLogin, adminRegister, adminUpdate, getTeam}
