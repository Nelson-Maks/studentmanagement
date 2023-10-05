const express = require('express')
// const dotenv = require('dotenv').config()
// const cors = require('cors')
const mongoose = require('mongoose')
const { Server } = require('socket.io')
const app = express()
const cookieParser = require('cookie-parser')
const http = require('http')
// const { Console } = require('console')
const server = http.createServer(app)
const Admin = require('./models/message')
// const router = express.Router()



mongoose.connect('mongodb+srv://NELSON:NEWFP123@cluster0.oozycvm.mongodb.net/', ).then(()=>{
    console.log('connected successfully')
}).catch((err)=>{
    console.log(`error occured due to ${err}`)
})





// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use('/', require('./routes/authRoutes'))





const io = new Server(server, {
    cors:{
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }

}) 

io.on('connection', (socket)=>{
    console.log(`User Connected: ${socket.id}`)

    socket.on("join_room", (data)=>{
        socket.join(data)
        console.log(`user with ID: ${socket.id} joined room: ${data}`)
    })



    socket.on("send_message", data => {
        const message = new Admin({ data })

        message.save().then(()=>{
            socket.to(data.room).emit("recieve_message", data)
            const message = new Admin({ data })
            message.save()

        })
        
    })




    socket.on('disconnect', ()=>{
        console.log(`user disconnected: ${socket.id}`)
    })

})


// io.on('connection', (socket)=>{
//     console.log('a user connected')

//     socket.emit('message', 'Hello world')

//     socket.on('disconnect', ()=>{
//         console.log('user disconnected')
//     })

//     socket.on('chatMessage', msg =>{
//         const message = new AdminText({msg})
//         message.save().then(()=>{
//             io.emit('message', msg)

//         })
//     })
// })












server.listen(8000, ()=>{
    console.log(`server running`)
})