import User from "../models/User.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const createAuthor = catchAsync(async(req,res,next)=>{
    const {name,email,age,dob} = req.body;
    const newAuthor = User({
        name,
        email,
        age: Number(age),
        dob: new Date(dob),
        role:'Author'
    });

    await newAuthor.save()


    if(!newAuthor){
        return next(new AppError("Something went wrong",500))
    }

    res.status(200).json({
        status:true,
        message:"New author created successfully"
    })
})

export const getAllUsers = catchAsync(async(req,res,next)=>{
    const getUsers = await User.find({
        role:'Author'
    });
    if(!getUsers){
        return res.status(200).json({
            status:true,
            message:"No Author found"
        })
    }
    return res.status(200).json({
        status:true,
        users:getUsers
    });
})
// export const deleteAuthor = catchAsync(async(req,res,next)=>{
//     const role = req.user.role;
//     if(role !== 'Admin' && req.user._id !== req.params.userId) {
//         return next(new AppError("Can not remove other author",405))
//     }
//     const deletedAuthor = await User.findByIdAndRemove(req.params.userId);
//     if(!deletedAuthor){
//         return next(new AppError("This author not found",401))
//     }

//     res.status(200).json({
//         status:true,
//         message:"Author delete successfully"
//     })
// });

// export const getMe = catchAsync(async(req,res,next)=>{
//     const findMe = await User.findById(req.params.userId);
//     if(!findMe){
//         return next(new AppError("This user not found",401))
//     }
//     return res.status(200).json({
//         status:true,
//         user:findMe
//     })
// })

// export const UpdateMe = catchAsync((req,res,next)=>{})