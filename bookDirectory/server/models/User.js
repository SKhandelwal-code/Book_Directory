import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        // required:String,
        min:6,
        select:false
    },
    age:{
        type:Number,
        required:true
    },
    dob:{
        type:Date,
        require:true
    },
    role:{
        type:String,
        enum:['Admin','Author'],
        default:'Admin'
    }
},{
    timestamps:true
});

userSchema.methods.checkPassword = async function(enteredPassword,userPassword){
    return await bcrypt.compare(enteredPassword,userPassword)
}

const User = mongoose.model('User',userSchema);
export default User;