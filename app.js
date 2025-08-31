const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const config = require('./config/dbConfig');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routers/user.router');
const itemRoutes =require('./routers/items.router')


const app =express()

dotenv.config();

config.connectDB();

app.get('/', (req , res ) =>{
    res.send('Welcome to Restaurant ChatBot')
})

app.use(cookieParser());

app.use(express.json());
// app.use(express.urlencoded({extended:true}));

app.use('/api/v1/users' ,userRoutes)
app.use('/api/v1/items', itemRoutes)



const PORT=process.env.PORT 

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
