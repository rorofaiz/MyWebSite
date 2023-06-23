const express=require('express');
const  contactRouter=express.Router();
const bodyPraser=require('body-parser');
const  ContactModel =require('./models/tbContactUs'); 

contactRouter.use(express.json());
var urlbodyparser=bodyPraser.urlencoded({extended:true});



(function Start(){

    contactRouter.get('/',async(req,res)=>  res.render('contactUs',{message:""}));

    contactRouter.post('/',urlbodyparser,async(req,res)=>
    { 
        if(req.body!=null)
            AddContact(req.body,(txt)=>
            { 
                res.render('contactUs',{message:txt});
            }) 
    });
    
    module.exports=contactRouter;

})();


function AddContact(data,callBack)
{
    let contactModel=new ContactModel(
        {  
            name:data.name,
            email:data.email,
            phone:parseInt(data.phone),
            city:data.city,
            message:data.message,
            date:Date.now()

        })     
        contactModel.save().then(()=>  callBack("Seccussful: Record was added !!")).catch(err=>callBack("ERROR>>"+err));
       
}