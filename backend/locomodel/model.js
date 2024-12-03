import mongoose from "mongoose"; 


const UserSchema = new mongoose.Schema({
   username:{
    type: String, 
    required: true,
   }, 
   email:{
    type: String, 
    required: true, 
    unique: true,
   }, 
   gender:{
    type: String, 
    required: true, 
   },
   place:{
    type: String, 
    required: true,
   },
}, {timestamps: true})

const Data = mongoose.model('User', UserSchema); 

export default Data;