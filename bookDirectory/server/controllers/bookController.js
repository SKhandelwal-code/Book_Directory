import Book from "../models/Book.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

export const createBook = catchAsync(async(req,res,next)=>{
    const {name,price,author,publishedOn} = req.body;

    if(!name || !price || !author){
        next(new AppError("Please provide all fields"))
    }

    const newBook = Book({
        name,
        price,
        author,
        publishedOn
    })

    await newBook.save();

    res.status(200).json({
        status:true,
        message: "New book created"
    })


})
export const getAllBooks = catchAsync(async(req,res,next)=>{
    const allBooks = await Book.aggregate([{
        $lookup:{
            from:'users',
            localField:'author',
            foreignField:'_id',
            as:'authorDetails'
        }
        },{
            $project:{
                _id:'$_id',
                name:'$name',
                publishedOn:'$publishedOn',
                author:'$authorDetails.name',
                price:'$price'
            }
        }]);

    if(!allBooks){
        return res.status(200).json({
            status:false,
            message:"No book created"
        })
    }
    res.status(200).json({
        status:true,
        allBooks
    })
})
export const getBook = catchAsync(async (req,res,next)=>{
    const getBook = await Book.findById(req.param.bookId);

    if(!getBook){
        return next(new AppError("This book not found",404))
    }
    res.status(200).json({
        status:true,
        getBook
    })
})
export const deleteBook = catchAsync(async(req,res,next)=>{
    const deleteBook = await Book.findByIdAndRemove(req.params.bookId);
    if(!deleteBook){
        return next(new AppError("This book not found",404))
    }
    res.status(200).json({
        status:true,
        message:"Book deleted successfully"
    })
})
// export const updateBook = catchAsync((req,res,next)=>{})