const express=require('express')
const {connection}=require('./db')
const {userRouter} = require('./routes/user.routes')
const {notesRouter} =require('./routes/note.routes')
const {authenticate} =require('./middlewares/authenticate.middleware')
require('dotenv').config()


const app=express()

app.use(express.json())

app.get('/', (req,res) =>{
    res.send('Welcome')
    console.log('HOME PAGE')
})

app.use('/users', userRouter)
app.use(authenticate)
app.use('/notes', notesRouter)

app.listen(process.env.port, async() =>{
    try {
        await connection
        console.log('Connected to DB')
    } catch (err) {
        console.log(err.message)
    }
    console.log(`Server is running at port ${process.env.port}`);
})