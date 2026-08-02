//We use OOP as it is more leaned to real world -> digital objects

function Cart(localStorageKey){ //pascal case
  const cart = 
  { 
    cartItems: undefined,
    loadFromStorage(){ //method as inside object
      this.artItems = JSON.parse(localStorage.getItem(localStorageKey)); //string to array

      if(!this.cartItems){  //this gives name of outer obj
          this.cartItems = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
          },
          {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
          }];
      } //default cart value
    },

    saveToStorage(){
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },


    addToCart(productId){
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if(productId === cartItem.productId){
          matchingItem = cartItem;
        }
      })

      if(matchingItem){
        matchingItem.quantity += 1;
      }
      else{
        this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
      } 

      this.saveToStorage();  //to access the function inside obj
    },


    removeFromCart(productId){
      const newCart = [];

      this.cartItems.forEach((cartItem) => {
        if(cartItem.productId !== productId){
          newCart.push(cartItem);
        }
      });

      this.cartItems = newCart;

      this.saveToStorage();
    },


    updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.deliveryOptionId = deliveryOptionId;
    }

    this.saveToStorage();
  }
  };

  return cart;
}

const cart1 = Cart('cart-oop');
const cart2 = Cart('cart-business');


cart.loadFromStorage(); //due to mock running before in tests we re-run



//just copying a cart, we were able to create another similar business cart object 