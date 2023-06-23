const express=require('express');
const router=express.Router();
(function Start(){

    router.get('/',async(req,res)=>
    { 
        res.render('aboutUs');
    });
    module.exports=router;

})();


