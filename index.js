const express = require('express')
const app = express();
const dotenv = require('dotenv')
const connectDB = require('./DB/db')
const user = require('./router/user')
const cors = require('cors')
app.use(cors())

dotenv.config()
app.use(express.json())

connectDB();



const PORT = process.env.PORT || 5000;


app.use('/api',user)




app.get('/',(req,res)=>{
    console.log('first get request')
    res.send('hellow world')
})

app.listen(PORT,()=>{
    console.log("server is live")
})