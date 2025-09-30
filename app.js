const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const config = require('./config/dbConfig');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routers/user.routes');
const itemRoutes =require('./routers/items.routes')
const orderRoutes=require('./routers/order.routes')
const paymentRoutes = require('./routers/payment.routes')
const socketio=require('socket.io')
const http = require('http')
const session = require('express-session')

const app =express()

dotenv.config();

config.connectDB();

// app.get('/check-session', (req, res) => {
//     res.json({
//         sessionID: req.sessionID,
//         userId: req.session.userId,
//         hasUserId: !!req.session.userId
//     });
// });

app.use(session({
    secret: process.env.SESSION_SECRET || "itTookMeTimeToGetHereButIAmHereNow",
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        maxAge: 24*60*60*1000, 
    }
}))

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(__dirname + '/public'))


app.use('/api/v1/users' ,userRoutes)
app.use('/api/v1/items', itemRoutes)
app.use('/api/v1/orders', orderRoutes)
app.use('/api/v1/payment', paymentRoutes)


const PORT=process.env.PORT 

const server =http.createServer(app)
//Socket.io Server

const io=new socketio.Server(server)
 


app.get('/', (req , res ) =>{
    // res.send('Welcome to Restaurant ChatBot')
    res.sendFile(__dirname + '/public/index.html' )
})

app.get('/api/v1/chat',(req,res)=>{
    res.sendFile(__dirname +'/public/chat.html')
})
app.get('/api/v1/login' ,(req, res)=>{
    res.sendFile(__dirname + '/public/login.html')
})

// io.on('connection', (socket)=>{
//     console.log('A user tapped in' ,socket.id);
    
//     socket.on('disconnect', ()=>{
//         console.log('connection disconnected', socket.id)
//     })
//     socket.on('chat message', (data)=>{
//         console.log(data)
//         socket.broadcast.emit('chat message' , data)
//     })
// })

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
