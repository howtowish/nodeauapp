const express = require("express")

const path=require('path');
const bodyParser =require('body-parser');
const cors=require('cors');
const passport=require('passport');
const mongoose =require('mongoose')
const app=express();
const config= require('./config/database')

//connect to database
mongoose.connect(config.database);

//On connect
mongoose.connection.on('connected',()=>{
    console.log('Connected to database '+ config.database)
})

//on error 
mongoose.connection.on('error',(err)=>{
    console.log('database error: '+ err)
})

const users= require('./routes/users')

const port = 3000;

//passport middleware 
app.use(passport.initialize())
app.use(passport.session())
 require('./config/passport')(passport)

//CORS middleware
app.use(cors())

//Set static Folder
app.use(express.static(path.join(__dirname,'public')))

//Body parser middleware 
app.use(bodyParser.json())

app.use('/users',users)

app.get("/",(req,res)=>{
    res.send("test")
})
app.listen(port,()=>{
    console.log("server started with port: "+ port)
})