let tbody=document.getElementById("tbody")


getProducts()

async function getProducts() {
    try{
        let data= await fetch("http://localhost:3000/Products")
    let actualdata=await data.json()

    actualdata.forEach(mapdata)
    }
    catch(error)
    {
        console.log(error);
        
    }
    
    
    
}

 function mapdata(el,i,arr)
{
    let newRow=document.createElement("tr")

    let id=document.createElement("td")
    id.innerText=el.id
    id.setAttribute("class","id")

    let title=document.createElement("td")
    title.innerText=el.title
    title.setAttribute("class","name")

    let price=document.createElement("td")
    price.innerText=el.price
    price.setAttribute("class","price")

    let description=document.createElement("td")
    description.innerText=el.description
    description.setAttribute("class","desc")

    let category=document.createElement("td")
    category.innerText=el.category
    category.setAttribute("class","cat")

    let imageR=document.createElement("td")
    imageR.setAttribute("class","img")

    let image=document.createElement("img")
    image.src=el.image
    image.setAttribute("class","Images")

    imageR.append(image)

    let rating=document.createElement("td")
    rating.setAttribute("class","ratings")
    rating.innerText=`${el.rating.rate}/${el.rating.count}`

    let crud=document.createElement("td")
    crud.setAttribute("class","crud")
    
    let edit=document.createElement("a")
    edit.setAttribute("class","btn btn-primary mt-2")
    edit.href=`../Edit/Edit.html`
    edit.innerText="EDIT"
    let editdiv=document.createElement("div")
    editdiv.append(edit)

    let del=document.createElement("button")
    del.setAttribute("class","btn btn-danger mt-2")
    del.value=`${el.id}`
    del.innerText="DELETE"
    del.addEventListener("click",deleteME)
    let deldiv=document.createElement("div")
    deldiv.append(del)

    let details=document.createElement("a")
    details.setAttribute("class","btn btn-success mt-2")
    details.href=""
    details.innerText="ANALYTICS"
    let detdiv=document.createElement("div")
    detdiv.append(details)

    crud.append(editdiv,deldiv,detdiv)

    let ed=document.createElement("td")
    
    let edbtn=document.createElement("button")
    edbtn.value=[`${el.id}`,`${el.status}`]
    edbtn.addEventListener("click",EnaDisa)

    if(el.status)
    {
        edbtn.setAttribute("class","btn btn-success")
        edbtn.innerText="Enabled"
    }
    else{
        edbtn.setAttribute("class","btn btn-danger")
        edbtn.innerText="Disabled"
    }
    ed.append(edbtn)

    newRow.append(id,title,price,description,category,imageR,rating,crud,ed)

    tbody.append(newRow)

}

async function  deleteME(params) {
    await fetch(`http://localhost:3000/Products/${this.value}`,{
        method:"DELETE"
    })
    alert("Deleted Succesfully")
}

let searchBtn=document.getElementById("inpbtn")
let id;

searchBtn.addEventListener("click",getProductByID)

async function getProductByID()
{
    event.preventDefault()
    id=document.getElementById("inpbox").value
    let data=await fetch(`http://localhost:3000/Products/${id}`)
    let actualdata=data.json()

    mapProductData(actualdata)
}

async function mapProductData(obj) {
    


    let newRow=document.createElement("tr")

    let id=document.createElement("td")
    id.innerText=obj.id
    id.setAttribute("class","id")

    let title=document.createElement("td")
    title.innerText=obj.title
    title.setAttribute("class","name")

    let price=document.createElement("td")
    price.innerText=obj.price
    price.setAttribute("class","price")

    let description=document.createElement("td")
    description.innerText=obj.description
    description.setAttribute("class","desc")

    let category=document.createElement("td")
    category.innerText=obj.category
    category.setAttribute("class","cat")

    let imageR=document.createElement("td")
    imageR.setAttribute("class","img")

    let image=document.createElement("img")
    image.src=obj.image
    image.setAttribute("class","Images")

    imageR.append(image)

    let rating=document.createElement("td")
    rating.setAttribute("class","ratings")
    rating.innerText=`${obj.rating.rate}/${obj.rating.count}`

    let crud=document.createElement("td")
    crud.setAttribute("class","crud")
    
    let edit=document.createElement("a")
    edit.href=""
    edit.innerText="EDIT"
    let editdiv=document.createElement("div")
    editdiv.append(edit)

    let del=document.createElement("a")
    del.href=""
    del.innerText="DELETE"
    let deldiv=document.createElement("div")
    deldiv.append(del)

    let details=document.createElement("a")
    details.href=""
    details.innerText="DETAILS"
    let detdiv=document.createElement("div")
    detdiv.append(details)

    crud.append(editdiv,deldiv,detdiv)


    newRow.append(id,title,price,description,category,imageR,rating,crud)

    tbody.append(newRow)
}

async function  EnaDisa() {
    console.log(this.value);
    
    if(this.value[1])
    {
        console.log("if");
        
        await fetch(`http://localhost:3000/Products/${this.value[0]}`,{
            method:"PATCH",
            body:JSON.stringify({"status":false}),
            headers:{
              "Content-Type":"application/json"
            }
        })
        this.value[1]==false;
        
    }
    else{
        console.log(("else"));
        
        await fetch(`http://localhost:3000/Products/${this.value[0]}`,{
            method:"PATCH",
            body:JSON.stringify({"status":true}),
            headers:{
              "Content-Type":"application/json"
            }
        })
        this.value[1]==true;
    }
}