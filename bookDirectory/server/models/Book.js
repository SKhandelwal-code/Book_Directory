import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    publishedOn:{
        type:Date,
        required:true
    },
    author:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
},{
    timestamps:true
})
const Book = mongoose.model('Book',bookSchema);

export default Book;