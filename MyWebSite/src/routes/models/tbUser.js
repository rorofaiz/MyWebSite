
let mongoose=require("mongoose");
let userSchema= new mongoose.Schema({
    name:
    {      
        type:String,
        unique:true,
        require:true
    },
    userName:
    {  
        type:String,
        unique:true,
        require:true
    },
    password:
    {  
        type:String,
        require:true
    },
    date:Date
});

module.exports=mongoose.model('User',userSchema,"Users");