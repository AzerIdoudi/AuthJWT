const mongoose=require('mongoose');

const usersSchema= mongoose.Schema({
  fullName:{
    type:String,
  },  
  email:{
    type:String,
  },  
  password:{
    type:String,
  },  
});
module.exports=mongoose.model('users',usersSchema);