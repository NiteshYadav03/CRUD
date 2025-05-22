const express = require('express')
const app = express()
const userRouter = require('./routes/user.routes')
const indexRouter = require('./routes/index.routes')
const dotenv=require('dotenv')
dotenv.config()
const connectToDB= require('./config/db')
connectToDB()
const cookieParser=require('cookie-parser');

app.set('view engine','ejs')
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',indexRouter)
app.use('/user',userRouter)


app.listen(3000,()=>{
    console.log("server is running on port 3000")
})

