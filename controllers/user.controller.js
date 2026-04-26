import {user} from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, passward, role } = req.body;

        if (!fullName || !email || !phoneNumber || !passward || !role) {
            return res.status(400).json({
                message: 'All fields are required',
                success: false
            });
        }

        const existingUser = await user.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists',
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(passward, 10);

        await user.create({
            fullName,
            email,
            phoneNumber,
            passward: hashedPassword,
            role,
        });

        return res.status(201).json({
            message: "User registered successfully",
            success: true
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const login = async (req, res) => {
    try {
        const { email, passward, role } = req.body;

        if (!email || !passward || !role) {
            return res.status(400).json({
                message: 'Something is missing',
                success: false
            });
        }

        let existingUser = await user.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({
                message: 'User not found',
                success: false
            });
        }

        const isMatch = await bcrypt.compare(passward, existingUser.passward);

        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials',
                success: false
            });
        }

        if (existingUser.role !== role) {
            return res.status(400).json({
                message: 'Invalid role',
                success: false
            });
        }

        const tokenData = {
            userId: existingUser._id,
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        return res
            .status(200)
            .cookie('token', token, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'strict'
            })
            .json({
                message: `Welcome back ${existingUser.fullName}`,
                success: true,
                token
            });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout=async(req,res)=>{
    try{
        return res.status(200).cookie('token','',{maxAge:0}).json({
            message:`Logged out successfully`,
            success:true,
        })

    }catch(error){
        console.log(error);
        res.status(500).json({message:'Server error'})
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, bio, skill,passward } = req.body;

        let skillarr;
        if (skill) {
            skillarr = skill.split(',');
        }

        const user_id = req.id;

        const existingUser = await user.findById(user_id);

        if (!existingUser) {
            return res.status(400).json({
                message: 'User not found',
                success: false
            });
        }
        if(passward){
            const hashedPassword = await bcrypt.hash(passward, 10);
            existingUser.passward = hashedPassword;
        }
        if (fullName) existingUser.fullName = fullName;
        if (email) existingUser.email = email;
        if (phoneNumber) existingUser.phoneNumber = phoneNumber;
        if (bio) existingUser.profile.bio = bio;
        if (skill) existingUser.profile.skills = skillarr;

        await existingUser.save();

        return res.status(200).json({
            message: 'Profile updated successfully',
            success: true,
            user: existingUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};




export const getProfile = async (req, res) => {
    try {
        const existingUser = await user.findById(req.id).select("-passward");

        if (!existingUser) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        return res.status(200).json({
            user: existingUser,
            success: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};