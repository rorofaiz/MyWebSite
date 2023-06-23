var express=require('express');
var productRouter=express.Router();
var ProductModel=require('./models/tbProduct');
var bodyPraser=require('body-parser');
var fs=require('fs');
var formidable=require('formidable');
const multer=require('multer');
const upload=multer({dest:'uploads/'});
const { render } = require('express/lib/response');
const { Decimal128 } = require('mongodb');
const { Console } = require('console');

productRouter.use(express.json());
var urlencoded=bodyPraser.urlencoded({extended:true});

////////////////////////////////////////
(function Start()
{
    ////// Refresh Products Page  /////////////////
    productRouter.get('/',async(req,res)=>{ 

        /// Get All Products And Send Them To Products Page
        ProductModel.find({},(err,events)=>
         {      
             if(!err)
             {
                if(events!=null && events.length>0)
                {
                    var  data=ConvertJsonToString(events);  
                    res.render('products',{products:data[0],images:data[1]});
                }
                else 
                   res.render('products',{products:'',images:''});
             }
             else
                res.send("<script> alert('"+err+"')</script>")  
        })  
    });

    /////// Products Requests  ////////////////
    productRouter.post('/',urlencoded,upload.single('productImage'),(req,res,next)=>
    {
        if(req.body!=null)
            if(req.body.btnSend=="AddProduct")
            {    
                ///Add Product
                AddProduct(req.body,(msg)=>res.send(msg));
            }
            else if(req.body.btnSend=="UpdateProduct")
            {
                /// Update Product
                UpdateProduct(req.body,(msg)=>res.send(msg));
            }
            else if(req.body.btnSend=="DelProduct")
            {   
                ///Delete Product
                ProductModel.findOneAndDelete({pro_num:req.body.productID},(err)=>
                {
                        if(!err)
                            res.send("Deleted Is seccessful");
                        else 
                            console.log(err);
                }) 
            }
    })
    module.exports=productRouter;
    
})();
////////////////////////////////////////
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
///////////////////////////////////////

