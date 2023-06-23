const mongoose = require('mongoose');
let server='0.0.0.0:27017';
let dbName='myDataBase1';
var con=mongoose.connect('mongodb://'+server+'/'+dbName);
con.then((err)=>console.log("Database connection seccessful")).catch(err=>console.log(" DB Connection >> "+err));








