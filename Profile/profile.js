let userdata=JSON.parse(localStorage.getItem("User"))
let form=document.getElementById("profile")





document.getElementById("updprofile").setAttribute("hidden",true)
document.getElementById("updpass").setAttribute("hidden",true)
document.getElementById("password").setAttribute("disabled",true)
document.getElementById("cancel").setAttribute("hidden",true)

getProfile()



let UserWelcome=document.getElementById("UserWelcome")
UserWelcome.innerText=`Welcome, ${(userdata[0][0]["Fullname"]).split(" ")[0]}`



document.getElementById("editprofilebtn").addEventListener("click",EditProfile)
function EditProfile() {
    event.preventDefault()
    disablebtns()
    enable()
    document.getElementById("updprofile").removeAttribute("hidden")
    document.getElementById("cancel").removeAttribute("hidden") 
}


document.getElementById("changepassbtn").addEventListener("click",ChangePass)



disable()
function disable()
{
    document.getElementById("username").setAttribute("disabled","true")
    document.getElementById("mob").setAttribute("disabled","true")
    document.getElementById("email").setAttribute("disabled","true")
}

function enable()
{
    document.getElementById("username").removeAttribute("disabled")
    document.getElementById("mob").removeAttribute("disabled")
    document.getElementById("email").removeAttribute("disabled")
}

function disablebtns()
{
    document.getElementById("editprofilebtn").setAttribute("disabled","true")
    document.getElementById("changepassbtn").setAttribute("disabled","true")
    document.getElementById("delprofbtn").setAttribute("disabled","true")
}

 function  getProfile() {

    form.username.value=userdata[0][0]["Username"]
    form.mob.value=userdata[0][0]["Mobile"]
    form.email.value=userdata[0][0]["Email"]
    form.password.value=userdata[0][0]["Password"]
}





async function getDataAfterUpdate(ID) {
    alert("1")
    let data=await fetch(`http://localhost:3000/Users/id=${ID}`)
    let actualdata=await data.json()
alert(2)
    let userdata1=[actualdata]
    localStorage.setItem("User",JSON.stringify(userdata1))
    alert(3)
    userdata=JSON.parse(localStorage.getItem("User"))
    alert(4)
    alert(userdata)
    
}



function ChangePass()
{
    event.preventDefault()
    document.getElementById("password").removeAttribute("disabled")
    document.getElementById("updpass").removeAttribute("hidden")
document.getElementById("cancel").removeAttribute("hidden")

}


document.getElementById("updpass").addEventListener("click",UpdatePassword)

async function UpdatePassword() 
{
    event.preventDefault()
    await fetch(`http://localhost:3000/Users/${userdata[0][0]["id"]}`,{
        method:"PATCH",
        body:JSON.stringify({
            Password:form.password.value
        }),
    headers:{
        "Content-Type":"application/json"
    }
    })

    localStorage.removeItem("User")

    window.location.href="../Login/login.html"
    alert("Login Now")
}





document.getElementById("updprofile").addEventListener("click",UpdateProfile)

async function UpdateProfile() {
   event.preventDefault()
    await fetch(`http://localhost:3000/Users/${userdata[0][0]["id"]}`,{
        method:"PATCH",
        body:JSON.stringify({
            "Username":form.username.value,
            "Mobile":form.mob.value,
            "Email":form.email.value
        }),
    headers:{
        "Content-Type":"application/json"
    }
    })
    

    localStorage.removeItem("User")
window.location.href="../Login/login.html"
    alert("Login Now")

    
}
