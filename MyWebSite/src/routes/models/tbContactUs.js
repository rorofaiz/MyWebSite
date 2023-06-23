
const { Decimal128, Int32 } = require("mongodb");
let mongoose=require("mongoose");
let contactUs= new mongoose.Schema({
    
    name:{type:String,require:true},
    email:{type:String,require:true},
    phone:{type:Number,require:true},
    city:{type:String,require:true},
    message:{type:String,require:true},
    date:{type:Date}
});

module.exports=mongoose.model('Message',contactUs,"Messages");