const express=require('express');
const path=require('path');
const app=express()
require('./models');
const router=require('./routes/index');
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/',router)

app.get('/',(req,res)=>{
    res.render('home')
});

app.listen(3310);