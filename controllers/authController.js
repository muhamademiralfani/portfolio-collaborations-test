import Auth from "../models/authModels.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const registerController = async (req, res) => {
    const {username, email, password} = req.body

    if(!username) {
        return res.status(400).json({success: false, message: "Username is required"});
    }

    if(!email) {
        return res.status(400).json({success: false, message: "Email is required"});
    }

    if(!password) { 
        return res.status(400).json({success: false, message: "Password is required"});
    }

    const existEmail = await Auth.findOne({email: email})
    if(existEmail) {
        return res.status(400).json({success: false, message: "Email already exists"});
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Auth.create({username, email, password: hashedPassword});
        res.status(201).json({success: true, data: user});
    } catch (error) {
        res.status(500).json({success: false, message: "internal server error"});
    }

}

export const loginController = async (req, res) => {
    const {email, password} = req.body

    if(!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required"
        })
    }

    if(!password) {
        return res.status(400).json({
            success: false,
            message: "Password is required"
        })
    }

  
  try {
    const user = await Auth.findOne({email})
    if(!user) {
        return res.status(400).json({
            success: false,
            message: "Email not found"
        })
    }

    const passwordIsMatch = await bcrypt.compare(password, user.password)
    if(!passwordIsMatch) {
        return res.status(400).json({
            success: false,
            message: "Password is incorrect"
        })
    }

    const token = jwt.sign({ id : user._id}, process.env.JWT_SECRET, {expiresIn : "1d"  })
    res.status(200).json({token})

  } catch (error) {
    res.status(500).json({
        message : error.message
    })
}
}