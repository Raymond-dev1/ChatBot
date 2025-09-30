const botMessage=(text)=>{
            const itemsContainer= document.getElementById('items-container')
            const messageDiv = document.createElement('div')
            messageDiv.className= 'message bot';
            messageDiv.textContent =text;
            itemsContainer.appendChild(messageDiv);
            itemsContainer.scrollTop=itemsContainer.scrollHeight;
        }
 const userMessage=(text)=>{
            const itemsContainer = document.getElementById('items-container')
            const messageDiv = document.createElement('div')
            messageDiv.className='message user';
            messageDiv.textContent=text
            itemsContainer.appendChild(messageDiv)
        }
  
        //GET ALL ITEMS FUNCTION
  const fetchAllItems=async () =>{
            try {
                const response = await fetch('/api/v1/items', {
                    method :'GET',
                    headers:{
                        'content-Type': 'application/json'
                    }
                });
                const result= await response.json();
                if (result.success){
                    console.log('items retrieved', result.data)
                    displayItemsAsChat(result.data)
                }else{
                    console.error('Error', result.message);
                    botMessage('sorry , could not fetch menu items')
                }
            }catch(error){
                console.error('error in fetch all service', error);
                botMessage('Sorry , something went wrong')
            }
        }


//  ADD ITEMS TO CART FUCNTION
const AddToCart= async( itemId, itemName, quantity)=>{
    try{
        const response = await fetch('/api/v1/items/add-to-cart', {
                    method :'POST',
                    credentials:'include',
                    headers:{
                        'Content-Type': 'application/json'},
                        body:JSON.stringify({itemId:itemId, quantity: quantity || 1, itemName:itemName})
                    })
                    const result = await response.json();

                    if(result.success){
                        console.log('items added' , result.data)
                        botMessage('item added to cart successfully')
                        botMessage('click 97 to view current orders')
                    }else{
                        console.error('error adding items', result.message) 
                        botMessage('Sorry could not add items, please login to continue')
                        window.location.href='/api/v1/login'
                    }
    }catch(error){
        console.error('Error in add to cart function', error);
        botMessage('Internal server error')
    }
}



//VIEW CART FUNCTION
const viewCurrentCart= async ()=>{
    try{
        const response =await fetch('/api/v1/items/cart',{
            method: 'GET',
            credentials:'include',
            headers:{
                'Content-Type': 'application/json'
            },
        })
        const result =await response.json();
        
        if(result.success && result.data && result.data[0]){

            const cart = result.data[0]
            displayCartAsChat(cart)

            // cart.items.forEach(cartItem=>{
            //     const Item = cartItem.itemId;
            //     const quantity = cartItem.quantity
            //     const itemMessage= `${Item.name} *${quantity} *${Item.description} *${Item.vendor} - $${(Item.price * quantity).toFixed(2)}`
            //     botMessage(itemMessage)
            // });
            
            // botMessage(`Total: $${cart.total.toFixed(2)}`)
            botMessage('To proceed to checkout, type 99.');
            return cart.total;
        }else{
            botMessage('Your Cart is empty')
        }
    }catch(error){
        console.error('Error fetching cart', error);
        botMessage('Sorry, could not load cart.');
    }
}

//REMOVE CART FUNCTION 
const removeFromCart = async (itemId)=>{
    try{
        const response=await fetch(`/api/v1/items/cart/${itemId}`,{
            method:'DELETE',
            headers:{
                "Content-Type":'application/json'
            },
            credentials:'include',
        })

        console.log("cart id to delete from remove cart func", itemId)
        // console.log('userId from remove cart fun.', userId)
        
      const result = await response.json();


    if(result.success){
        botMessage('Item removed from cart successfully');
        await viewCurrentCart();
    }else{
        console.error('Error removing item', result.message);
        botMessage('Sorry, could not remove item from cart, No item found in cart.');
    }
}catch(error){
    console.error('Error in removeFromCart function', error);
    botMessage('Internal server error. Please try again later.');
}
}

//DISPLAY CART AS CHART FUNCTION 
const displayCartAsChat=(cart)=>{
    botMessage('Here is your current cart:')

    const container = document.getElementById('items-container');
    if(!container){
        console.error('Cart container not found');
        return;
    }

        const itemDiv=document.createElement('div');
        itemDiv.className='message bot cart-item-message'

        let cartContent= `
        <div class="cart-header">
        </div>
        <div class="cart-items">
        `;


 cart.items.forEach((cartItem, index)=>{
    const item = cartItem.itemId;
    if(!item) return;
   cartContent +=`
    <div class="cart-item-details">
        <h4> ${index+1}.${item.name}-- ₦${(item.price).toFixed(2)}</h4>
        <span class="quantity"> Quantity: ${cartItem.quantity}</span>
        <p> <span class="price"> </span></p>

    <button class='remove-from-cart-btn' onclick="removeFromCart('${item._id}')">
    Remove 
    </button>
      </div>
    `
        });
        
        cartContent += `
        </div>
        <div class="cart-footer">
            <strong>Total: ₦${cart.total.toFixed(2)} </strong>
        </div>
        `;

        itemDiv.innerHTML =cartContent;
    container.appendChild(itemDiv);
     container.scrollTop=container.scrollHeight
}


        // DISPLAY ITEM AS CHAT FUNCTION 
const displayItemsAsChat=(items)=>{
            botMessage('Here are our available items')
            console.log('dipslayed items', items)

             const container = document.getElementById('items-container');
            if(!container){
                console.error(error, ('items container not found'))
                return;
            }
            let itemContent=`
            <div class="items">
            `;

                const itemDiv = document.createElement('div');
                itemDiv.className= 'message bot item-message'

    items.forEach((item, index)=>{
      itemContent += `
            <div class="item-details">
                <h4>${index +1} . ${item.name}</h4>
                <p>${item.description}</p>
                <span class="price">₦${item.price}</span>
            </div>
            <button class="add-to-cart-btn" onclick="AddToCart('${item._id}',)">
                Add to Cart
            </button>
            </div>
        `;
       
        });

        itemContent +=`
        </div>
        `
        itemDiv.innerHTML=itemContent
        container.appendChild(itemDiv)
         container.scrollTop = container.scrollHeight;
         botMessage('To add an item to your cart, click the "Add to Cart" button next to the item.');
       
 }
 
    //EMAIL COLLECTION FUNCTION
 const emailCollection= async(amount)=>{
    const container = document.getElementById('items-container');
    const emailFromDiv= document.createElement('div');
    emailFromDiv.className=('message bot email-form')

    emailFromDiv.innerHTML=`
    <div class="email-collection-form">
    <h4>Please enter your email to proceed with payment of ₦${amount.toFixed(2)}</h4>
    <div class = "email-input-details">
    <input type ="email" id= "transaction-email" placeholder='Enter your email' required />
    <button class="submit-email-btn" onClick="checkoutOrder(${amount})">Proceed To Payment</button>
    </div>
    </div>
    `;

    container.appendChild(emailFromDiv);
    container.scrollTop=container.scrollHeight;

 }       

 //CHECKOUT ORDER FUNCTION
const checkoutOrder=async () =>{
    try{
        let amount = await viewCurrentCart();

        amount =parseFloat(amount) 
        botMessage(`processing payment for ₦${amount.toFixed(2)}....`);
        console.log('amount in checkout order function', amount , typeof amount )


        await emailCollection(amount);
        //EMAIL VALIDATION
        const email = document.getElementById('transaction-email').value.trim();
        if(!email|| !email.includes('@')|| !email.includes('.')){
           botMessage('Please enter a valid email address');
            return; 
        }

        botMessage(`Processing payment for ₦${amount.toFixed(2)}...`);

    

        const response= await fetch('/api/v1/payment/initiate',{
            method:'POST',
            headers:{
                "Content-Type": 'application/json'
            },
            credentials:'include',
            body:JSON.stringify({
                amountInNaira: amount,
                email:email
            })
        });

        const result =await response.json();
        console.log("result after response", result)
        console.log("result fter response data", result.data)

        if(result.success===true && result.data && result.data.authorization_url){
            botMessage('Redirecting to payment gateway...');
            window.location.href=result.data.authorization_url;
        }else{
            console.error('Error initiating payment', result.message);
            botMessage('Sorry, could not initiate payment. Please try again.');
        }
    }catch(error){
        console.error('Error in checkoutOrder  function', error);
        botMessage('Internal server error. Please try again later.');
    }
}

//PAYMENT WEBHOOK
const verifyPayment= async (reference)=>{
    try{
        const response= await fetch(`/api/v1/payment/verify/?reference=${reference}`, {
             method:'GET',
            headers:{
                "Content-Type": 'application/json'
            },
            credentials:'include',
        });
        
        const result = await response.json()

        if(result.success){
            await viewCurrentCart()
            botMessage("Payment succesful")
            botMessage('Order Created')
          
              const container = document.getElementById('items-container');
            const cartElements = container.getElementsByClassName('cart-item-message');
            while(cartElements.length > 0) {
                cartElements[0].remove();
            }
              botMessage("Type 98 to view order history")
        }else{
            console.error("Payment verification failed", result.message);
        }
    }catch(error){
        console.error("Error in verifyPayment (frnt)", error)
        return{status:500, success:false, message: "internal server error"}
    }
}

const orderHistory =async()=>{
    try{
    const response = await fetch('/api/v1/orders/get-order',{
        method:'GET',
      credentials:'include',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    const result = await response.json();
    if(result.success && result.data && result.data.length>0){
        displayOrderHistory(result.data)
    }else{
        botMessage('No order history found')
    }
    }catch(error){
        console.error('Error fetching order history', error);
        botMessage('Sorry, could not fetch order history. Please try again later.');
    }
}

const displayOrderHistory = async(orders)=>{
     const container = document.getElementById('items-container');
    
    orders.forEach((order, index) => {
        const orderDiv = document.createElement('div');
        orderDiv.className = 'message bot order-message';
        
        let orderContent = `
        <div class="order-details">
            <h4>Order #${index+1}.${order.orderNumber}</h4>
            <p>Status: ${order.status}</p>
            <p>Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
            <div class="order-items">
                <h5>Items:</h5>
        `;

        order.items.forEach(item => {
            orderContent += `
                <div class="order-item">
                    <span>${item.itemId.name}</span>
                    <span>Quantity: ${item.quantity}</span>
                    <span>Price: $${(item.itemId.price * item.quantity).toFixed(2)}</span>
                </div>
            `;
               });

        orderContent += `
            </div>
            <div class="order-total">
                <strong>Total: $${order.total.toFixed(2)}</strong>
            </div>
        </div>
        `;

        orderDiv.innerHTML = orderContent;
        container.appendChild(orderDiv);
    });

    container.scrollTop = container.scrollHeight;
}

//  FORM event listener
const form = document.getElementById('form')
form.addEventListener('submit', function(e){
    e.preventDefault();
    const input =document.getElementById('input');
    const userInput =input.value.trim()

    if (userInput){
        userMessage(userInput);
        handleUserInput(userInput);
        input.value= ''
    }
}) ;


const handleUserInput = async(input)=>{
    const number =  parseInt(input);
    if(number===1){
        fetchAllItems ();

     } else if( number ===97){
        viewCurrentCart();

     }else if( number ===99){
        checkoutOrder();

    }else if( number ===98){
        orderHistory();

        }else if( number ===0){

        }else{
            botMessage('INVALID INPUT, PLEASE FOLLOW INSTRUCTION !!')
        }
}

      
// Get UserId from cookies  --DOC

// const userId=()=>{
//     const cookies = document.cookie.split(';');
//         const userIdCookie=cookies.find(cookie=>cookie.trim().startsWith('userId=')
//     );
//     if(!userIdCookie){
//         console.log('no cookies found')
//         botMessage('please log in')
//         return ;
//     }
//     const value = userIdCookie.split('=')[1];
//     return value || null
// }
