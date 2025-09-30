   const signupForm=document.getElementById('signup-form')
          
    /**
     * Displays a message to the user.
     * @param {string} message - The message to display.
     * @param {'success'|'error'|'loading'} type - The type of message which affects styling.
     */


    const showMessage = (message, type = 'success') => {
        const messageArea = document.getElementById('message-area');
        messageArea.textContent = message;
        
        // Reset classes
        messageArea.className = '';
        
        // Apply new style based on type
        messageArea.classList.add(type); // You can define .success, .error, .loading in your CSS
        messageArea.style.color = type === 'error' ? 'red' : 'green'; // Simple inline style for now
    };
    
    const createUser=async()=>{
        const firstName = document.getElementById('firstName').value.trim();
       const lastName = document.getElementById('lastName').value.trim();
       const gender = document.getElementById('gender').value;

       if(!firstName || !lastName || !gender){
        showMessage('please fill in the fields', 'error')
        return;
       }   

       //Added loading Button
        showMessage('Creating your account...', 'loading');
        const submitBtn = document.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating Account...';

        //api fetching
            try{
                const response = await fetch('/api/v1/users/signup', {
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        firstName,
                        lastName,
                        gender
                    })
                })
                const result= await response.json();
                
                if(result.success){
                    showMessage(`welcome ${firstName}`)

                    //Redirection
                    setTimeout(() => {
                        alert("Redirecting Now")
                         window.location.href='/api/v1/chat';
                    }, 3000);
                    console.log('user created successfully', result.data)
                }else{
                    showMessage(result.message || 'signup failed', 'error')
                     console.error('Error', result.message)
            }
            }catch(error){
                console.error('error in create user ', error)
                showMessage('connection error , plaese try again', 'error')
                alert("error during process")
            }finally{
                //Button Re-enabling
                submitBtn.disabled=false
                submitBtn.textContent='sign up';
            }
        };

           signupForm.addEventListener('submit', (e)=>{
            e.preventDefault();
            createUser();
        })

const redirect=document.getElementById('redirect')

redirect.addEventListener('click', (e)=>{
    console.log('login button clicked')
        e.preventDefault();
    window.location.href='/api/v1/login'
})



   
    const submitButton=document.getElementById('submit')
     submitButton.addEventListener('click', (e)=>{
        e.preventDefault();
        createUser();
     })


    

        