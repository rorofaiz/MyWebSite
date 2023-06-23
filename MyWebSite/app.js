const express=require('express');
const app=express();
const http=require('http');
const port= 5000;
const bodyPraser=require('body-parser');
const conDb=require('./config/dataBase') 

// widenlaly
app.use(express.json());

//====== Static files ======================================

app.use(express.static('public'));
app.use('/css',express.static(__dirname+'public/css'))
app.use('/js',express.static(__dirname+'public/js'))
app.use('/img',express.static(__dirname+'public/img'))

//======== Templating Engine ===============================

app.set('views','./src/views');
app.set('view engine','ejs');


// //==== Routes ===============================================
var router=require('./src/routes/home'); 
app.use('/',router)

router=require('./src/routes/ProductDetails'); 
app.use('/ProductDetails',router)

router=require('./src/routes/products'); 
app.use('/products',router)

router=require('./src/routes/aboutUs'); 
app.use('/aboutUs',router)

router=require('./src/routes/contactUs'); 
app.use('/contactUs',router)

router=require('./src/routes/AccountUsers'); 
app.use('/AccountUsers',router)


////========= Server Listening ==============================
app.listen(port,()=> console.log(' Listening on port ${'+port+'}'));



