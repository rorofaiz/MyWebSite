const express=require('express');
const homeRouter=express.Router();
const bodyPraser=require('body-parser');
const ProductModel=require('./models/tbProduct'); 
const productPage=require('./products'); 
const { Int32 } = require('mongodb');

homeRouter.use(bodyPraser.urlencoded({extended:true}));
homeRouter.use(express.json());

(function Start(){

homeRouter.get('/',async(req,res)=>
{
    


    ProductModel.find({},(err,events)=>
    {    
   
        if(!err)
        {
            if(events!=null && events.length>0)
            {
                var  data=ConvertJsonToString(events);  
                res.render('home',{products:data[0],images:data[1]});
            }
            else 
                res.render('home',{products:'',images:''});
        }
        else
            res.send("<script> alert('"+err+"')</script>")  
    
   }).sort({"date":-1}).limit(3)
 
});
module.exports=homeRouter;

})();

function ConvertJsonToString(events)
{
    if(events.length<1)
        return "";
 
    var  images=events[0].image;
    var txt=events[0].name+';'+events[0].discription+';'+parseFloat(events[0].price)+';'+ parseInt(events[0].pro_num)+';'+images.length;
    for( var i=1;i<events.length;i++)
    {
        txt+='|'+events[i].name+';'+events[i].discription+';'+parseFloat(events[i].price)+';'+ parseInt(events[i].pro_num)+';'+events[i].image.length;
        images+=events[i].image;
    }
        return [txt,images];
    
    
}



