const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        unique:true,
    },
    lastName:{
        type:String,
        required:true,
        unique:true,
    },
    gender:{
        type:String,
        enum: ['Male', 'Female']
    }
})

module.exports=mongoose.model('User',userSchema)