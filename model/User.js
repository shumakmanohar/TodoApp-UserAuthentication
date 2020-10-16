var mongoose = require('mongoose')

const Task =  new mongoose.Schema({
  task:String,
  checked:false
})
const UserSchema = new mongoose.Schema({
   
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tasks:[
      Task
    ]
})

const User = mongoose.model('User', UserSchema)
module.exports = User