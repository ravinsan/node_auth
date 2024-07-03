import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    },
    mobile:{
        type:String
    },
    image:{
        type:String
    },
    status:{
        type:Boolean,
        default:true
    }

}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;