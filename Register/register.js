let form=document.getElementById("registerform")

form.addEventListener("submit",Register)
let id;
getnewID()

//Stores Users Input in a Object, Pass it into Function PostData()
function Register() {

    try {
        if(form.pass.value!==form.Cpass.value)
        {
            alert("Password Does not Match")
        }
        else
        {
            
            if(SameUserExist(form.username.value)==true)
            {
                alert("Username Already Exist")
            }
            else
            {
                event.preventDefault()
                let NewUser={
                    id:id,
                    Username:form.username.value,
                    Password:form.pass.value,
                    Fullname:form.fullname.value,
                    role:form.role.value,
                    Mobile:form.mob.value,
                    Email:form.email.value
                }
                PostData(NewUser)
    
                alert("Registered Succesfully , Login Now")
            }
            
        }
           
    } catch (error) {
        alert(`Error : ${error}`)
    }

    
}

//Check If Users Username is already Takenn by another user
async function SameUserExist(username)
{
let data=await fetch(`http://localhost:3000/Users?Username=${username}`)
let actualdata=await data.json()


if(actualdata.length==0)
{
    return false
}
else{
    return true
}
}

//get new id which can be assigned for the new registered user
async function getnewID() 
{
    let data=await fetch("http://localhost:3000/Users")
    let actualdata=await data.json()
    id = parseInt(actualdata[actualdata.length-1]["id"])+1
}

//post the data into db.json
async function  PostData(obj) 
{
    await fetch(`http://localhost:3000/Users`,
        {
            method:"POST",
            body:JSON.stringify(obj),
              headers:{
                "Content-Type":"application/json"
              }
        })
}