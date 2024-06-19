require('dotenv').config()
const bodyParser = require('body-parser');
const express= require('express');
const mongoose = require('mongoose');
const cors= require('cors');
const app = express();
app.use(cors())
app.use(bodyParser.json());
const port=3000;
mongoose.connect(process.env.DATABASE_URL).then(()=>console.log("Database Connected Successfully"))
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    contactNumber:Number
},{
    timestamps:true
})
const userModel=mongoose.model('user', userSchema);
app.post('/post',async (req,res)=>{
    const {name,contactNumber,email}=req.body
    const user=await userModel.create({
        name,
        email,
        contactNumber
    })
    await user.save();
    console.log("Received: ",req.body)
    res.json(req.body)
})

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})

