const express = require('express');
const auth=require('./routes/auth');
const mongoose=require('mongoose');
mongoose.connect(
    'mongodb+srv://coadmin:PuAxQEkfvLz3Npk7@cluster0.9mskojx.mongodb.net/',
    (err) => {
     if(err) console.log(err) 
     else console.log("mongdb is connected");
    }
  );
app=express();
app.use(express.json());
app.use('/auth',auth);
app.get('/',(req,res)=>{
    res.send('TEST');
});
app.listen(3000,()=>{
    console.log('Server is online');
});