


let cartdiv=document.getElementById("cartDiv")

let userdata=JSON.parse(localStorage.getItem("User"))


getCartProducts()


async function getCartProducts() {
     let data=await fetch(`http://localhost:3000/Cart?UserID=${userdata[0][0]["id"]}`)
     let actualdata=await data.json()
     console.log(actualdata);
     

     if(actualdata.length>0)
     {
        actualdata.forEach(MapCard)
        getTotal()
     }
     else{
        ShowEmptyCart()
     }

}

function ShowEmptyCart()
{
    console.log(Empty);
    
}

function MapCard(el)
{
    let card=document.createElement("div")
    card.setAttribute("class","container")
    card.setAttribute("id","OuterBox")

    let cardI=document.createElement("div")
    cardI.setAttribute("class","card")
    cardI.setAttribute("id","innerbox")

    let row=document.createElement("div")
    row.setAttribute("class","row")

    

    let imagebox=document.createElement("div")//////////////////////////
    imagebox.setAttribute("class","col-3")
    imagebox.setAttribute("id","imgbox")

    let pinfo=document.createElement("div")////////////////////////////
    pinfo.setAttribute("class","col-6")

    let pricebox=document.createElement("div")//////////////////////////
    pricebox.setAttribute("class","col-3 text-end")

    let img=document.createElement("img")
    img.src=el.image
    img.setAttribute("class","card-image")

    imagebox.append(img)

    let titlebox=document.createElement("div")
    titlebox.setAttribute("class","row")

    let title=document.createElement("h4")
    title.setAttribute("class","card-title")
    title.innerText=el.ProductName

    titlebox.append(title)

    let qtybox=document.createElement("div")
    qtybox.setAttribute("class","row")

    let Dbtn=document.createElement("button")
    Dbtn.innerHTML="<i class=\"fa-solid fa-minus\"></i>"
    Dbtn.setAttribute("class","btn w-25 btn-outline-danger")
    Dbtn.value=el.id
    Dbtn.addEventListener("click",DecreaseQTY)

    let qtlblspan=document.createElement("h5")
    qtlblspan.setAttribute("class","mt-2 text-success")
    qtlblspan.innerText="Quantity"

    let qtytxt=document.createElement("input")
    qtytxt.setAttribute("class","form-control w-25")
    qtytxt.setAttribute("readonly",true)
    qtytxt.type="number"
    qtytxt.value=el.Quantity
    qtytxt.min=1

    let Ibtn=document.createElement("button")
    Ibtn.innerHTML="<i class=\"fa-solid fa-plus\"></i>"
    Ibtn.setAttribute("class","btn w-25 btn-outline-success")
    Ibtn.value=el.id
    Ibtn.addEventListener("click",IncreaseQTY)

    qtybox.append(qtlblspan,Dbtn,qtytxt,Ibtn)

    let del=document.createElement("div")
    del.setAttribute("class","row")

    let delbtn=document.createElement("button")
    delbtn.setAttribute("class","btn btn-danger w-25 mt-2")
    delbtn.value=el.id
    delbtn.innerText="Delete"
    delbtn.addEventListener("click",DeleteFromCart)

    del.append(delbtn)
    pinfo.append(titlebox,qtybox,del)

    let pricelbl=document.createElement("label")
    pricelbl.setAttribute("class","form-label fw-bolder text-success me-3")
    pricelbl.innerText="Price : "

    price=document.createElement("label")
    price.setAttribute("class","form-label text-danger fw-bold fs-5")
    price.innerHTML=`&#8377; ${el.total}` 

    pricebox.append(pricelbl,price)

    row.append(imagebox,pinfo,pricebox)
    cardI.append(row)
    card.append(cardI)

    document.getElementById("cartDiv").append(card)
}


async function DeleteFromCart()
{
    event.preventDefault()
    await fetch(`http://localhost:3000/Cart/${this.value}`,{
        method:"DELETE"
    })

    alert("Succesfully Removed From Cart")
}



//increase quantity
async function DecreaseQTY() {
    let data=await fetch (`http://localhost:3000/Cart/${this.value}`)
    let actualdata= await data.json()

    let Q=actualdata["Quantity"]
    

    if(Q>1)
    {
        await fetch(`http://localhost:3000/Cart/${this.value}`,{
            method:"PATCH",
            body:JSON.stringify({
                Quantity:Q-1
            }),
        headers:{
            "Content-Type":"application/json"
        }
        })
    }
    else{
        alert("Else You Can Just delete Item")
    }
    
}

//decrese quantity
async function IncreaseQTY() {
    let data=await fetch (`http://localhost:3000/Cart/${this.value}`)
    let actualdata= await data.json()
    let Q=actualdata["Quantity"]
    

    if(Q<=5)
    {
        await fetch(`http://localhost:3000/Cart/${this.value}`,{
            method:"PATCH",
            body:JSON.stringify({
                Quantity:Q+1
            }),
        headers:{
            "Content-Type":"application/json"
        }
        })
    }
    else{
        alert("Limtited Stock available")
    }
}


let subtotal=document.getElementById("SubTotal")


async function getTotal()
{
    let TotalItemsInCart=await Cart_items_nums()
    let TotalAmountOfItems=await getTotalPrice()


    let totalh4=document.createElement("h4")
    totalh4.innerText=`Subtotal (${TotalItemsInCart } items) : ${TotalAmountOfItems}`

    let deliveryEligible=document.createElement("p")

    if(TotalAmountOfItems<500)
    {
        deliveryEligible.innerHTML=`Add Items Worth &#8377;<strong class="text-danger">${500-TotalAmountOfItems}</strong> For <strong class="fw-bold">Free Delivery</strong>`
    }
    else{
        deliveryEligible.innerHTML=`<i class="fa-solid fa-square-check"></i> Your Order Is Eligible for <strong>Free Delivery</strong>`
        deliveryEligible.setAttribute("class","text-success")
    }

    let CheckoutBtn=document.createElement("button")
    CheckoutBtn.setAttribute("class","btn btn-warning")
    CheckoutBtn.innerText="Proceed to Buy"
    CheckoutBtn.addEventListener("click",ProceedtoBuy)
   

    subtotal.append(totalh4,deliveryEligible,CheckoutBtn)

}


async function Cart_items_nums()
{
let data =await fetch (`http://localhost:3000/Cart?UserID=${userdata[0][0]["id"]}`)
let actualdata =await data.json()


return actualdata.length
}

async function getTotalPrice() 
{
    let data =await fetch (`http://localhost:3000/Cart?UserID=${userdata[0][0]["id"]}`)
    let actualdata =await data.json()

   let totalAmount=0
   for(let i=0;i<actualdata.length;i++)
    {
    totalAmount+=(actualdata[i]["Quantity"]*actualdata[i]["total"])
}

return totalAmount
}

function ProceedtoBuy()
{
    window.location.href="../Purchase/Purchase.html"
}
