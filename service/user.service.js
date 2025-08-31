const User=require('../models/user.model');

const CreateUser=async(firstName,lastName)=>{
    const existingUser=await User.findOne({firstName,lastName});

    if(existingUser){
        return {status : 409 , success : false , message : 'User already exists'};  
    }
    const newUser=await User.create({firstName,lastName});
    return {status : 201 , success : true , message : 'User created successfully', data : newUser};
}

const LoginUser=async(firstName,lastName)=>{
    const user=await User.findOne({firstName,lastName});
    if(!user){
        return {status : 404 , success : false , message : 'User not found'};
    }
    return {status : 200 , success : true , message :`Welcome Back, ${firstName}` , data :user};
}





module.exports={
    CreateUser,
    LoginUser
}