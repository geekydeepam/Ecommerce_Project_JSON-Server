let id_label=document.getElementById("id_label")

setNewID()

async function setNewID() {
    let data=await fetch("http://localhost:3000/Products")
    let actualdata =await data.json()
    id_label.innerText=parseInt(actualdata[actualdata.length-1]["id"])+1
}


let form=document.getElementById("form-section")
form.addEventListener("submit",InsertData)


function InsertData()
{
    event.preventDefault()
    let id=id_label.innerText

    let name=form.name.value
    let description=form.description.value
    let price=form.price.value
    let Category=form.Category.value
    let Image=form.imageurl.value
    let Rating=form.rate.value
    let Count=form.count.value

    let rating={
        rate:Rating,
        count:Count
    }
    let Product={
        id,
        title:name,
        price,
        description,
        category:Category,
        image:Image,
        rating,
    }

    PostData(Product)
}

async function  PostData(params) {
    await fetch("http://localhost:3000/Products",{
        method:"POST",
        body:JSON.stringify(params),
    headers:{
        "Content-Type":"application/json"
    }
    })

    alert("Saved Succesfully")
}