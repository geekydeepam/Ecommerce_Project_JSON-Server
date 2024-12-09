let itemData=JSON.parse(localStorage.getItem("Item"))
let userdata=JSON.parse(localStorage.getItem("User"))


let ItemDetCard=document.getElementById("ProDetail")
document.getElementById("backtohome").addEventListener("click",backtohome)
displayItemDetails()


function  displayItemDetails()
{
    let itemCard=document.createElement("div")
    itemCard.setAttribute("class","p-5 row border ")


    let imgDiv=document.createElement("div")
    imgDiv.setAttribute("class","col-4 text-center ")

    let img=document.createElement("img")
    img.setAttribute("class","card-img")
    img.style="heigth:20rem;"
    img.src=itemData.image

    imgDiv.append(img)

    let itemDetDiv=document.createElement("div")
    itemDetDiv.setAttribute("class","col-8 ps-5 pt-2 pb-2 d-flex flex-column align-items-start ")


    let itemname=document.createElement("h1")
    itemname.setAttribute("class","card-title")
    itemname.textContent=itemData.title

    

    let price=document.createElement("h3")
    price.setAttribute("class","card-subtitle p-2 text-danger d-flex align-items-center" )
    price.innerHTML=`&#8377 ${itemData.price}`

    let rating=document.createElement("h5")
    rating.setAttribute("class","rating d-flex justify-content-center") 


    let ratingPoint=document.createElement("span")
    ratingPoint.setAttribute("class","ratingPoint d-flex")

    for(let i=1;i<=5;i++)
    {
        let  star=document.createElement("h5")
        star.setAttribute("class","text-warning")
        if(i<=Math.floor(parseInt(itemData.rating.rate)))
        {
        star.innerHTML="<i class=\"fa-solid fa-star\"></i>"
        }
        else{
             star.innerHTML="<i class=\"fa-regular fa-star\"></i>"
        }
        ratingPoint.append(star)   
    }

    let ratingReviews=document.createElement("h5")
    ratingReviews.setAttribute("class","ratingReviews")
    ratingReviews.innerHTML=`<i class="fa-regular fa-user-magnifying-glass"></i>  ${itemData.rating.count}`

    rating.append(ratingPoint,ratingReviews)
    
    let String_desc=itemData.description.split('.')

    let itemdesc=document.createElement("ul")
    
    itemdesc.setAttribute("class","text-capitalize list-group list-group-flush")

    for(let i=0;i<String_desc.length-1;i++)
    {
        let desc_li=document.createElement("li")
        desc_li.setAttribute("class","list-item mt-2")
        desc_li.textContent=String_desc[i]
        itemdesc.append(desc_li)
    }
    
    let addtocart=document.createElement("button")
    addtocart.setAttribute("class","btn btn-warning text-dark mt-3 fw-semibold")
    addtocart.textContent="Add to Cart"
    addtocart.value=itemData.id
    addtocart.addEventListener("click",AddtoCart)

    itemDetDiv.append(itemname,price,rating,itemdesc,addtocart)
    itemCard.append(imgDiv,itemDetDiv)
    ItemDetCard.append(itemCard)
    
}
function backtohome()
{
    localStorage.removeItem("Item")
    window.location.href="../index.html"
}
let newcartID;
async function AddtoCart()
{
    if(userdata===null)
    {
        alert("Login or Register First")
    }
    else
    {
        try{
            //wether product already exist in the Cart Or not
            if(!(await ProductExist(this.value)))
            {
                let productdet= await getProductDet(this.value)
        
                let Productdata= await fetch(`http://localhost:3000/Products/${this.value}`)
                let actualdataproduct=await Productdata.json()
    
    
                let newcartid= await getCartId()
                let CarProduct=
                {
                  id:`${newcartid}`,
                  Product_ID:productdet["ProductID"],
                  ProductName:productdet["ProductName"],
                  image:productdet["image"],
                  UserID:userdata[0][0]["id"],
                  Username:userdata[0][0]["Username"],
                  Quantity:1,
                  total:productdet["total"]
                }

                PostTocart(CarProduct)
            
            }else{
                alert("Product Already in Cart")
            }
    
        
        }
        catch(error)
        {
            alert(error)
        }
    }
    
    
}

async function ProductExist(id)
{
    let data=await fetch(`http://localhost:3000/Cart?UserID=${userdata[0][0]["id"]}`)
    let actualdata =await data.json()
    console.log(actualdata);
    

    for(let i=0;i<actualdata.length;i++)
    {
        if(actualdata[i]["Product_ID"]==id)
        {
            return true
        }
    }
    return false
}

async function PostTocart(obj) 
{
    await fetch("http://localhost:3000/Cart",{
        method:"POST",
        body:JSON.stringify(obj),
    headers:{
        "Content-Type":"application/json"
    }
    })

    alert("Added to Cart Succesfully")
}


async function  getCartId() {
    let data=await fetch("http://localhost:3000/Cart")
    let actualdata =await data.json()
    return parseInt(actualdata.length)+1
}


async function  getProductDet(obj) {
    let data=await fetch(`http://localhost:3000/Products/${obj}`)
    let actualdata= await data.json()

    let ProdArray={
        ProductID:actualdata["id"],
        ProductName:actualdata["title"],
        total:actualdata["price"],
        image:actualdata["image"]
    }
    
    return ProdArray
}


