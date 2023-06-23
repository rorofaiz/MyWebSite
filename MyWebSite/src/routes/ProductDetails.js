
const express=require('express');
const routerPro=express.Router();
const bodyPraser=require('body-parser');
const producModel=require('./models/tbProduct'); 
var urlbodyparser=bodyPraser.urlencoded({extended:true});
routerPro.use(express.json());

(function Start()
{

    routerPro.get('/',(req,res)=>
    { 
        producModel.find({pro_num:req.query.id},(err,events)=>
        { 

            if(!err)
            {
                if(events!=null && events.length>0)
                {
                    let info=events[0].name+';'+events[0].discription+';'+parseFloat(events[0].price)+';'+parseInt(events[0].pro_num);
                     res.render('ProductDetails',{productInfo:info,image:events[0].image});
                }
                else 
                res.render('ProductDetails',{productInfo:'',images:''});    
            }
            else
                res.send("<script> alert('"+err+"')</script>")  
        })
    })
    module.exports=routerPro;

})();