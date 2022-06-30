import User from "../db/models/User.js";
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';



//Register
export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    let existingUser;


    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        return console.log(err);
    }

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }


    if (!existingUser) {
        

        const user = await new User({
            name,
            email,
            password,
            notes: [], //Add blogs field to user
        });

        const token = user.createJWT()


        try {
            await user.save();
        } catch (error) {
            return console.log(error)
        }

        return res.status(201).json({ user });


    }

};



//Login
export const Login = async (req, res) => {
    
    const email = req.body.email
    const password =req.body.password

    if (!email || !password) {
        return res.status(404).json({msg: "Enter all fields please."})
    }
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        return res.status(404).json({ msg: "Invalid credentials." })
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        return res.status(404).json({ msg: "Invalid Credentials" })
    }
    const token = user.createJWT()
    user.password = undefined
    return res.status(200).json({ msg: "Logged In", user: user, token: token });

}

//Reset Password

export const resetPassword = async (req, res, next) => {
    const email = req.body.email;

    const userFound = User.findOne({ email }).select('password');


    if (!userFound) {
        return res.status(400).json({ msg: "User does not exist" });
    }


    


}
