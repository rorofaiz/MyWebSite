var pathimg="",typeOpration="AddProduct",productID;
function openFile(e,id)
{
    
    var input = e.target;
    var rd = new FileReader();
    rd.onload = function () {
        var dataURL = rd.result;
        if (id != null)
           document.getElementById(id).src = pathimg = dataURL;
    };
    rd.readAsDataURL(input.files[0]);
        
}
function CreateProductsStyle(index,data,className,id)
{
    var st = '<div class="'+className+'"  id="'+id+'-'+data[0]+'"  >'; 
    st += '<img src="' + data[1] + '"  Class="productStyleImg"  /><div class="producstylefooter flex_column"  id="productstylefooter" ><div class="productName flex_wrap" >'+ data[2] + '</div><div class="priceAndBoy flex_row" ><div class="price flex_column" style="font-size:1.3em">price:</div><div class="price flex_row" style="50%" >' + data[3]+" "+'<span style="font-size:.7em">SAR</span></div><a class="sv-plaint-btn2 boyproduct flex_column" href="/ProductDetails?id='+data[0]+'"   >show</a></div></div>';
    st += '</div>';
    return st;
}

/// Update Product  Continer
function UpdateProduct(ob,index)
{
    var Continer=document.getElementById('FormAddProduct');
    if(Continer!=null)
    {
        typeOpration="UpdateProduct";
        productID=myData.ProductInfo[index].id;
        Continer.children[0].children[0].innerText="Update Product";
        pathimg=myData.ProductInfo[index].image;
        Continer.children[0].children[1].src=pathimg;
        Continer.children[0].children[3].value=myData.ProductInfo[index].name;
        Continer.children[0].children[4].value=myData.ProductInfo[index].discription;
        Continer.children[0].children[5].value=myData.ProductInfo[index].price;    
    }
    IsDisplay('backgroundBlack'); 
}
function CreateBtnOptions(n,index,flag=false)
{
    // var isShow=(flag)?'flex':'none';style="display:'+isShow+'"
    var st = '<div class="flex_column  ContinerElementOptions" style="display:none" onmouseleave="DisplayContButtonOption(' + "'ContElementBtn" + n + "'" + ')"  id="ContElement' + n + '" ><div class="BtnOptions flex_column "   onclick="IsDisplay(' + "'ContElementBtn" + n + "'" + ')" >ooo</div>';
    st += '<div class="ContinerElements  flex_column "  id="ContElementBtn' + n + '" style="display:none"  >';
    st += '<div class="BtnOptions   flex_column" onclick="UpdateProduct(this.parentElement.parentElement.parentElement,+'+index+')"   >Edit</div><div class="BtnOptions   flex_column "  onclick="DeleteElement(this.parentElement.parentElement.parentElement)" >Del</div>';
    st += '</div></div>';
    return st;
}
function DeleteElement(element)
{
    if(element!=null)
    {
        var n=element.id.split('-')[1];
        element.parentElement.removeChild(element);
        alert("!! You will Delete the Element Are You Shure that");
        SendDataToServer(null,['btnSend','productID'],["DelProduct",n],"POST","/products",(msg)=>{alert(msg);})
    }

}
function DisplayContButtonOption(id)
{
    var ob = document.getElementById(id);
    if (ob != null && ob.offsetHeight > 0 && ob.style.display != 'none')
        IsDisplay(id);

}

function productDetails(index)
{
    SendDataToServer(null,['index'],[index],'GET',"/ProductDetails");
}

function AddProduct(index,data,continerID="")
{
    if(continerID!="")
    {   
        let ob = document.getElementById(continerID);
        let element = CreateProductsStyle(index,[data.id,data.image,data.name,data.price], 'productElementStyle flex_column', 'ContinerProdects');
        if(ob!=null)
        { let continer = (element + ob.innerHTML);
            ob.innerHTML = continer;
        }
    }
}

function RefreshProducts(text,continerID,images)
{
    
    var array=text.split('|');
    var arrt=[];
    if(array.length>0 && array[0].length>2)
    {
        let firstIndex=0;
        for(var i=0;i<array.length;i++)
        {   
            data=array[i].split(';');
            let length= parseInt(data[4]);
            let image=images.substring(firstIndex,firstIndex+length)
            firstIndex+=length;
            arrt[i]={"id":data[3],"name":data[0],"image":image,"discription":data[1],"price":data[2]};
            AddProduct(i,arrt[i],continerID);
        }
        myData.ProductInfo=arrt;
    }
}


function StyleInputsElement(name, element) 
{
    return '<label for="' + name + '" style="margin-top:5px;" >' + name + '</label>' + element;
}


function ShowContinerAddProduct(back_id,option)
{
   
    var Continer=document.getElementById('FormAddProduct');
    if(Continer!=null)
    {   
        typeOpration="AddProduct";

        if(option=='Add')
           Continer.children[0].children[0].innerText="Add Product";
           
        pathimg="";
        Continer.children[0].children[1].src="";
        Continer.children[0].children[3].value="";
        Continer.children[0].children[4].value="";
        Continer.children[0].children[5].value="";
    }

    IsDisplay(back_id);

}

function AddUpdateProduct()
{
    if(pathimg!="")
    {
        var ob =document.getElementById('FormAddProduct');
        var keys=['btnSend','image'];
        var values=[typeOpration,pathimg];

        if(typeOpration=="UpdateProduct")
        {
            keys[2]='productID';
            values[2]=productID;
        }

        SendDataToServer(ob,keys,values,'POST','/products',ShowStyle);
        IsDisplay('backgroundBlack');

        document.location.reload();
        
    }
    else if(typeOpration=="AddProduct")
            alert("!! You can not Add The Product With Out Image  Chose Image !!");

    pathimg="";
 
}



