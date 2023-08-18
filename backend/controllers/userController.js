const User=require("../models/userModel")
const {hashPassword,comparePasswords}=require("../utils/hashPassword")
const generateAuthToken = require("../utils/generateAuthToken")


exports.registerUser = async(req,res) => {
    try{
        const {name,email,password,phone} = req.body;
        if(!(name && email && password && phone)){
            return res.status(400).send("All inputs are required")
        }
        const userExists = await User.findOne({email})
        if(userExists){
            return res.status(400).send("User exists")
        }else{
            const hashedPassword=hashPassword(password)
            const user = await User.create({name,email:email.toLowerCase(),
            password:hashedPassword,
        
        phone})
            res.cookie(
                "accees_token",generateAuthToken(user._id,user.name,user.email,user.phone),{
                    httpOnly:true
                    
                }
            ).status(201).json({
                success:"User Created",
                userCreated:{
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    phone:user.phone
                }
            })
        }
            }
            catch(err){
                res.status(500).json({error:err.message}) 
            }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
          return res.status(400).send("All inputs are required");
        }
    
        const user = await User.findOne({ email }).orFail();
        if (user && comparePasswords(password, user.password)) {
          let cookieParams = {
            httpOnly: true,
          };
    
          return res.cookie(
            "access_token",
            generateAuthToken(
              user._id,
              user.name,
              user.email,
             
            ),
            cookieParams
          ).json({
              success: "user logged in",
              userLoggedIn: { _id: user._id, name: user.name, email: user.email,phone:user.phone}
          });
        } else {
           return res.status(401).send("wrong credentials") 
        }
      } catch (err) {
        res.status(500).json({error:err.message}) 
      }
}


exports.logout = async (req, res) => {
    try{
        res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
    
        res.status(200).json({
            success: true,
            message: 'Logged out'
        })
    }
    catch(err){
        res.status(500).json({error:err.message}) 
    }
}