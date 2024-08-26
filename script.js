
let api=""
let per_page=5

let userdata=JSON.parse(localStorage.getItem("User"))
console.log(userdata);

let idname=document.getElementById("lblName")
let usrdrp=document.getElementById("usrdropdown")
let userbtn=document.getElementById("userbtn")

let pagechange=document.getElementById("PerPageChange")
pagechange.value=5
let cat_name=document.getElementById("cat_name")






if(userdata===null)
{
idname.innerHTML="<a href=\"Login/login.html\" class=\"button-48\"><span class=\"text\">Login Now</span></a>"
userbtn.setAttribute("hidden","true")
}
else
{
    usrdrp.innerText=userdata[0][0]["Username"]
    userbtn.removeAttribute("hidden")
}


let logbtn=document.getElementById("logoutBtn")
logbtn.addEventListener("click",Logout)
function Logout()
{
    localStorage.removeItem("User")
    window.location.href="index.html"
}






let product=document.getElementById("Products")
// PostData On Page Load

//making a api variable so that on filtering based on category, we can asisgn api based on cat

pagechange.addEventListener("blur",ChangePerPages)//on change of perpage text box, we change the per page variable

getProducts()

function ChangePerPages()//on changing perpage we executes this function where depending on the current 
//api value we execute the function getproducts,or getmens... vice versa
{
    
    per_page=pagechange.value
    
    switch (api) {
        case "http://localhost:3000/Products":
            getProducts()
            break;
        case "http://localhost:3000/Mens":
            getMensProduct()
            break;
        case "http://localhost:3000/Womens":
            getWomensProduct()
            break
        case "http://localhost:3000/Electronics":
            getElecProduct()
            break
        case "http://localhost:3000/Jewelery":
             getJewProduct()
             break;
        default: getProducts()
            break;
    }
}

async function getProducts() {
    api="http://localhost:3000/Products"
    let data= await fetch(`${api}`)
    let actualdata=await data.json()
    
//this function will makes pages button
    Pagination(actualdata.length)

//from here we will mapdata, with only first 5 elements,this will defaultly make page one appear
//when we change the catgeory ** even on this page's first load only first 5 element will appear
    product.innerHTML=""
    let data1=await fetch(`${api}?_page=1&_per_page=${per_page}`)
    let actualdata1=await data1.json()
    actualdata1.data.forEach(mapdata)

    cat_name.innerText="All Category"
    
}

//map data in products 
 function mapdata(el)
{
    let card=document.createElement("div")
    card.setAttribute("class","cards")

    let ProductName=document.createElement("div")
    ProductName.setAttribute("class","cardTitles")
    ProductName.innerText=el.title


    let description=document.createElement("h4")
    description.setAttribute("class","cardDescription")
    description.innerText=el.description

    let rating=document.createElement("h3")
    rating.setAttribute("class","rating")

    let ratingPoint=document.createElement("span")
    ratingPoint.setAttribute("class","ratingPoint")
    ratingPoint.innerHTML= `<i class="fa-solid fa-star"></i>  ${el.rating.rate}`

    let ratingReviews=document.createElement("span")
    ratingReviews.setAttribute("class","ratingReviews")
    ratingReviews.innerHTML=`<i class="fa-regular fa-user-magnifying-glass"></i>  ${el.rating.count}`

    rating.append(ratingPoint,ratingReviews)

    let price=document.createElement("h2")
    price.setAttribute("class","price")
    price.innerText=`${el.price} /-`

    let ProductImage=document.createElement("img")
    ProductImage.setAttribute("class","Image")
    ProductImage.src=el.image

    let ProductLink=document.createElement("a")
    ProductLink.setAttribute("class","Product_details")
    ProductLink.href=`./Product_details.html/${el.id}`

    let Productinfo=document.createElement("div")
    Productinfo.setAttribute("class","ProductInfo")

    Productinfo.append(ProductName,price,rating)
    
    ProductLink.append(ProductImage,Productinfo)

    let btnCart=document.createElement("button")
    btnCart.setAttribute("class","btn btn-secondary")
    
    btnCart.value=el.id//we gave a array as value to the add to product button
    //array contain product id,name and price.
    
    btnCart.innerText="Add to Cart"
    btnCart.addEventListener("click",Addtocart)

    card.append(ProductLink,btnCart)

    product.append(card)

}


//load all product on all Category Click
let catall=document.getElementById("CatAll")
catall.addEventListener("click",getProducts)
 
//load mens Product on mens Category Click
let catmen=document.getElementById("CatMen")
catmen.addEventListener("click",getMensProduct)
 
async function getMensProduct() {
    api="http://localhost:3000/Mens"
    let data= await fetch(`${api}`)
    let actualdata =await data.json()

    Pagination(actualdata.length)
    product.innerHTML=""
   
    let data1=await fetch(`${api}?_page=1&_per_page=${per_page}`)
    let actualdata1=await data1.json()
    actualdata1.data.forEach(mapdata)

    cat_name.innerText="Men's"
}

//load womens Product on womens Category Click
let catwomen=document.getElementById("CatWomen")
catwomen.addEventListener("click",getWomensProduct)

async function getWomensProduct() {
    api="http://localhost:3000/Womens"
    let data= await fetch(`${api}`)
    let actualdata =await data.json()

    Pagination(actualdata.length)
    product.innerHTML=""
    
    let data1=await fetch(`${api}?_page=1&_per_page=${per_page}`)
    let actualdata1=await data1.json()
    actualdata1.data.forEach(mapdata)

    cat_name.innerText="Women's"
}

//load electronics Product on electronics Category Click
let catele=document.getElementById("CatElec")
catele.addEventListener("click",getElecProduct)

async function getElecProduct() {
    api="http://localhost:3000/Electronics"
    let data= await fetch(`${api}`)
    let actualdata =await data.json()

    Pagination(actualdata.length)
    product.innerHTML=""
    
    
    let data1=await fetch(`${api}?_page=1&_per_page=${per_page}`)
    let actualdata1=await data1.json()
    actualdata1.data.forEach(mapdata)

    cat_name.innerText="Electronics's"
}

//load electronics Product on electronics Category Click
let catjew=document.getElementById("CatJwel")
catjew.addEventListener("click",getJewProduct)

async function getJewProduct() {
    api="http://localhost:3000/Jewelery"
    let data= await fetch(`${api}`)
    let actualdata =await data.json()

    Pagination(actualdata.length)
    product.innerHTML=""
    
    let data1=await fetch(`${api}?_page=1&_per_page=${per_page}`)
    let actualdata1=await data1.json()
    actualdata1.data.forEach(mapdata)

    cat_name.innerText="Jewelery's"
}



//Pagination
let pages=document.getElementById("pageination")

function Pagination(obj)
{
    let pagesNum=Math.ceil(obj/per_page)
    console.log(pagesNum);

    pages.innerHTML=""
    for(let i=1;i<=pagesNum;i++)
    {
        makePagebtn(i)
    }  
}
function makePagebtn(num)
{
    let li=document.createElement("li")
    li.setAttribute("class","page-item")

    let btn=document.createElement("button")
    btn.setAttribute("class","page-link")
    btn.value=num
    btn.innerText=num
    btn.addEventListener("click",openPage)
    li.append(btn)
    pages.append(li)
}

async function openPage() {
    let data=await fetch(`${api}?_page=${this.value}&_per_page=${per_page}`)
    let actualobj=await data.json()
    product.innerHTML=""
    actualobj.data.forEach(mapdata)
}






//on click of add to card button on a product it will be added in the card endpoint
let newcartID;
async function Addtocart()
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


let ProfileBtn=document.getElementById("ProfileBtn")
ProfileBtn.addEventListener("click",ViewProfile)

function ViewProfile()
{
    window.location.href="Profile/profile.html"
}

let cartbtn=document.getElementById("OrdersBtn")
cartbtn.addEventListener("click",SendToCart)

function SendToCart()
{
    window.location.href="Cart/cart.html"
}

// document.getElementById("SortPrice").addEventListener("click",SortByPrice)

// async function SortByPrice()
// {
//     api=`${api}?_sort=price`
//     let data=await fetch(`${api}?`)
//     let actualdata=await data.json()

//     Pagination(actualdata.length)
//     product.innerHTML=""
   
//     let data1=await fetch(`${api}&_page=1&_per_page=${per_page}`)
//     let actualdata1=await data1.json()
//     actualdata1.data.forEach(mapdata)   
// }

