
let searchForm=document.getElementById("search-form")
searchForm.addEventListener("submit",getIDData)
let id;
FormDisabled()
let Post_form=document.getElementById("form-section")

Post_form.addEventListener("submit",PostData)

let del=document.getElementById("delete")
del.addEventListener("click",delItem)



function FormDisabled()
{
    document.getElementById("name").setAttribute("disabled","true")
    document.getElementById("description").setAttribute("disabled","true")
    document.getElementById("price").setAttribute("disabled","true")
    document.getElementById("Category").setAttribute("disabled","true")
    document.getElementById("rate").setAttribute("disabled","true")
    document.getElementById("count").setAttribute("disabled","true")
    document.getElementById("image").setAttribute("disabled","true")
    document.getElementById("submit").setAttribute("disabled","true")
    document.getElementById("cancel").setAttribute("disabled","true")
    document.getElementById("delete").setAttribute("disabled","true")
}

function FormEnabled()
{
    document.getElementById("name").removeAttribute("disabled")
    document.getElementById("description").removeAttribute("disabled")
    document.getElementById("price").removeAttribute("disabled")
    document.getElementById("Category").removeAttribute("disabled")
    document.getElementById("rate").removeAttribute("disabled")
    document.getElementById("count").removeAttribute("disabled")
    document.getElementById("image").removeAttribute("disabled")
    document.getElementById("submit").removeAttribute("disabled")
    document.getElementById("cancel").removeAttribute("disabled")
    document.getElementById("delete").removeAttribute("disabled")
}

async function getIDData() {
    
    event.preventDefault()
    try{
        id=document.getElementById("inpbox").value
        let data=await fetch(`http://localhost:3000/Products/${id}`)
        let actualdata=await data.json()
        Filldata(actualdata)
        FormEnabled()
    }
    catch(error)
    {
        alert(error)
        Cancel()
    }
}
    

function Filldata(obj)
{
    
    
    console.log(obj);
    console.log("Enabled");

    
    let inpform=document.getElementById("form-section")

    let title=inpform.name
    title.value=obj.title

    let desc=inpform.description
    desc.value=obj.description

    let prc=inpform.price
    prc.value=obj.price

    let cat=inpform.Category
    cat.value=obj.category

    let image=inpform.imageurl
    image.value=obj.image

    let rating=obj.rating

    let rate=inpform.rate
    rate.value=rating["rate"]

    let count=inpform.count
    count.value=rating["count"]
}

 async function PostData()
{
    event.preventDefault()
    let obj=getdata()
    await fetch(`http://localhost:3000/Products/${id}`,{
        method:"PUT",
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    })

    alert("Saved Succesfully")
}

function getdata()
{
    let title=Post_form.name.value
    let desc=Post_form.description.value
    let price=Post_form.price.value
    let cat=Post_form.Category.value
    let img=Post_form.imageurl.value
    let rate=Post_form.rate.value
    let count=Post_form.count.value
    let rating={
        rate,
        count
    }

    let obj={
        title,
        price,
        description:desc,
        category:cat,
        image:img,
        rating
    }

    return obj
}

 async function delItem()
{event.preventDefault()
    await fetch(`http://localhost:3000/Products/${id}`,{
        method:"DELETE"
    })

    alert("Succesfully Deleted")
}


document.getElementById("cancel").addEventListener("click",Cancel)

function Cancel()
{
window.location.href="Edit.html"
}