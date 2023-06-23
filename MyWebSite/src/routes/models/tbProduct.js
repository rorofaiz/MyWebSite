
const { Decimal128, Int32 } = require("mongodb");
let mongoose=require("mongoose");
let product= new mongoose.Schema({
    
    pro_num:{type:Decimal128,required:true,unique:true},
    name:{type:String,require:true},
    discription:{type:String,required:true},
    price:{type:Decimal128,required:true},
    image:{type:Buffer,required:true},
    date:{type:Date,required:true}
});
module.exports=mongoose.model('product',product,"productModel");