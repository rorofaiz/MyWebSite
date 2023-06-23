   
function   AnyXmlHttpRequest(methode,url,data,collback=null,flag=true){
        
 
    var xml=new XMLHttpRequest();
    if(collback!=null)
        xml.onreadystatechange=function()
        {
        if(this.readyState===4 && this.status===200)
        collback(this.responseText);
        };
  
        xml.open(methode,url,flag);
        xml.setRequestHeader('Content-Type','application/json');
        xml.send(data);
    
}

function  SendDataToServer(ob=null,Ar_Elements,Ar_values,methode,url,collback=null,flag=true)
  {
    var FD=new FormData((ob!=null && ob.nodeName=='FORM')?ob:undefined);
    if(Ar_Elements!=null)
    for(var i=0;i<Ar_Elements.length;i++)
        FD.append(Ar_Elements[i],Ar_values[i]);

      /////convert FormData  To JSON Object
       var objData={};
       FD.forEach((value,key)=>objData[key]=value);

       AnyXmlHttpRequest(methode,url,JSON.stringify(objData),collback,flag);
}

function GetResponseData(text)
{
    alert(text);

}

function IsDisplay(id)
{
   
    if (id != "")
    {
        var ob = document.getElementById(id);
        if (ob != null)
            ob.style.display = (ob.style.display == 'none') ? 'flex' : 'none';
    }
}

/// ============= Register ================ 
function GroupBox(style, title, content, textAlign) {

    var st = '<form ' + style + '  action="/AccountUsers"  method="POST"   style="border:0.1px solid rgba(0,0,0,0.1);margin:50px 0px 10px 0px;border-radius:10px" >';
    st += '<div class="groupBoxText" style="text-align:' + textAlign + ';" >' + title + '</div>' + content + '</form>';
    return st;
}  
function CreateContinerAcount(n) 
{
    var form=document.getElementById('ContinerAccount')
    if (form== null) 
    {
        document.body.innerHTML += '<div class="continerAccount flex_column setBackColor1"  id="ContinerAccount" style="width:400px;top:'+document.getElementById('Main_Header').offsetHeight+'px;"  >' + DrawAccountContiner() + '</div>';
    }
    else
        IsDisplay('ContinerAccount');
    document.getElementById('ContAccountDeptLogIn').style.display=(n==0)?'flex':'none';
    document.getElementById('ContAccountDeptCreate').style.display=(n==1)?'flex':'none'; 
}
function ShowStyle(msg)
{
    alert(msg);
}
function DrawAccountContiner()
{
    
  var st='<div class="formAccount  flex_column"   id="FormAccount"  >';
    var content = '<input type="text" class="inputStyle inputAccount"  name="userName" placeholder="userName"required><input type="password" name="password"  class="inputStyle inputAccount" placeholder="password" required/><div   class="sv-plaint-btn btnAccount flex_column"  onclick="RegisterORLogIn(1)"  >LogIn</div>';
    st += GroupBox('class="contAccountDept flex_column"  id="ContAccountDeptLogIn"  style="display:flex"', "LogIn", content, "left");
    content = '<input type="text" class="inputStyle inputAccount" name="name" placeholder="Name" required/><input type="text" class="inputStyle inputAccount" id="userName" name="userName" placeholder="userName" required /><input type="password" class="inputStyle inputAccount" name="password"  placeholder="password" required/><div   class="sv-plaint-btn btnAccount flex_column"  onclick="RegisterORLogIn(0)"  >Register</div>';

    st += GroupBox(' class="contAccountDept flex_column" id="ContAccountDeptCreate" style="display:flex" ', "Register ", content,"left");
    st += '</div>';
    return st;
}
function RegisterORLogIn(n)
{

    var formId="ContAccountDeptCreate",typeOp="Register";
    if(n==1)
    {
        formId="ContAccountDeptLogIn";
        typeOp="LogIn";
    }
     
    var ob=document.getElementById(formId);
    SendDataToServer(ob,['btnSend'],[typeOp],'POST',"/AccountUsers",ShowStyle);
   
}




