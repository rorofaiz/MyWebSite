const express=require('express');
const router=express.Router();
const bodyPraser=require('body-parser');
const User=require('./models/tbUser') 

router.use(express.json());
var urlbodyparser=bodyPraser.urlencoded({extended:true});

(function Start(){
    router.post('/',urlbodyparser,async(req,res)=>
    { 

        if(req.body!=null)
              Register(req.body,function(msg){

                console.log(msg);
                res.send(msg);
              }); 
    });
    module.exports=router;
})();

//////////////////////////////////////

function Register(data,funMsg)
{


  if(data.btnSend=="LogIn")
  {
      

          User.find({userName:data.userName,password:data.password},(err,events)=>
          {     
            if(events!=null && events.length>0)
                funMsg('Seccussful Log In');
            else 
              funMsg(" userName or  Password Is Not Correct !!");
          }) 

   
  }
  else if(data.btnSend=="Register")
  {  
      User.find({userName:data.userName},(err,events)=>
      {
        if(events!=null && events.length>0)
           funMsg(" userName is not Correct !!");
        else 
        {
              let userModel=new User(
              { 
                name:data.name,
                userName:data.userName,
                password:data.password,
                date:Date.now()
          
              })     
              userModel.save().then(()=>  funMsg("Seccussful: Record was added !!")).catch(err=>funMsg("ERROR>>"+err));
        }
      });
    }
}