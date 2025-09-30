const loginForm=document.getElementById('login-form')

const LoginUser= async ()=>{
    const firstName=document.getElementById('firstName').value.trim()
    const lastName=document.getElementById('lastName').value.trim()

     if(!firstName || !lastName ){
        alert('please fill in the fields', 'error')
        return;
       }   

       try{
        const response=await fetch('/api/v1/users/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                firstName,
                lastName
            })
         }) 
         
        const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
         const result = await response.json();

         if (result.success){
            setTimeout(()=>{
                alert(`Welcome Back ${firstName}`)
                window.location.href='/api/v1/chat'
            } ,1000);
            console.log('user logged in successfully', result.data)
         }else{
            alert(result.message || 'login failed', 'error')
            console.error('Error', result.message)
         }
     }else{
            const errorText =await response.text()
            console.error('unexpected response format :', errorText)
            alert('server error , received unexpected text format')
        }
     }catch(error){
        console.error('error in login user', error.message)
        alert('Connection error , please try again')
       }
}

loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    LoginUser();
})


 const loginButton=document.getElementById('login')
 loginButton.addEventListener('click', (e)=>{
    e.preventDefault();
    LoginUser();
 })