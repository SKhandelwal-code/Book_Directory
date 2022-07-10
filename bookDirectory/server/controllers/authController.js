import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { promisify } from 'util';


import User from '../models/User.js';
import catchAsync from "../utils/catchAsync.js";
import AppError from '../utils/appError.js';

const signToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })
}

export const signUp = catchAsync(async (req,res,next)=>{
    const {name,email,password,confirmPassword,age,dob} = req.body;

    if(!name || !email || !password || !confirmPassword || !age || !dob){
        console.log( {name,email,password,confirmPassword,age,dob})
        return next(new AppError("Please provide all filelds",401))
    }

    if(password !== confirmPassword) {
       return next(new AppError("Password does not match",401))
    }

    const hashPassword = await bcrypt.hash(password,12);

    const newUser = User({
        name,
        email,
        password:hashPassword,
        age,
        dob
    });


    await newUser.save()

    const token = signToken(newUser._id)

    res.status(200).json({
        status:true,
        // user:newUser,
        token
    })
})
export const signIn = catchAsync(async (req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password) {
        return next(new AppError("Please provide all fields",401))
    }

    const foundUser = await User.findOne({email}).select("+password");

    if(!foundUser){
        return next(new AppError("This user not exists",401))
    }

    if(!(await foundUser.checkPassword(password,foundUser.password))){
        return next(new AppError("Password does not match",401))
    }

    const token = signToken(foundUser._id)

    res.status(200).json({
        status:true,
        token,
        user:foundUser
    })

});
export const protect = catchAsync(async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token) {
        return next(new AppError("You are not loggedin",401))
    }

    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET)

    const currentUser = await User.findById(decoded.id)

    if(!currentUser){
        return next(new AppError('This User no longer exists',401))
    }

    req.user = currentUser;
    res.locals.user = currentUser;
    next();
})
export const restrictTo = catchAsync((req,res,next)=>{})