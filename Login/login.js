let form=document.getElementById("loginBOX")


form.addEventListener("submit",Login)


//login function  which check if userame inlcudes inthe db,
//if yes then checks if password matches
//if yes then checks if role matches
//if yes then redirect to user page

async function Login() {
    event.preventDefault()
    try{
        let label=document.getElementById("label1")
        let username=form.userbox.value
        let pass=form.passbox.value
        let role=form.role.value

        let data=await fetch(`http://localhost:3000/Users?Username=${username}`)
        let actualdata= await data.json()
        console.log(actualdata);
        console.log(username);
        console.log(pass);
        console.log(role);
        
        if(actualdata.length>0)
        {
            if(actualdata[0]["Password"]===pass)
            {
                if(actualdata[0]["role"]===role)
                {
                    alert("Correct Credentials")
                    if(role==="user")
                    {
                        let userdata=[actualdata]
                        localStorage.setItem("User",JSON.stringify(userdata))
                        window.location.href="../index.html"
                    }
                    else if(role==="admin")
                    {
                        let userdata=[actualdata]
                        localStorage.setItem("Admin",JSON.stringify(userdata))
                        window.location.href="../admin/admin.html"
                    }
                }
                else
                {
                    label.innerText=`Not Authorized for ${role}`
                }
                
            }
            else{
                label.innerText="Invalid Password"
            }
        }
        else{
            
            label.innerText="Invalid Username"
        }
    }
    catch(error)
    {
       console.log(error);
       
    }
    
    
}

