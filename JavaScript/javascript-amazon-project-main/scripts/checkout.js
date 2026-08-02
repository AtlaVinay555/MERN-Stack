import {renderOrderSummary} from './checkout/orderSummary.js';

import {renderPaymentSummary} from './checkout/paymentSummary.js';

import { loadBackendProducts ,loadProductsFetch} from '../data/products.js';

import { loadBackendCart } from '../data/cart.js';


// import '../data/cart.js';  //runs all code in this file (no import)

// import '../data/backend-practice.js';

//We can use backend to load files instead of files in our PC

async function loadPage(){ //async returns promise 
  try{ //error handling in async await
    //throw 'error1'; //manual error and goes to catch(error  )
    await loadProductsFetch(); //same as then(), can be used in async func only (always)
    const variable = await new Promise((resolve, reject)=>{ 
      //reject is a function used to create error in future 
      //throw 'error2'; in promises and in sync manner (normal code)
      //error goes to .catch
      loadBackendCart(()=>{
        //reject('error3');
        resolve('value_2');
      });
    }); //return value can be saved in var without then()
  } catch(error){
    //above error callback contains info about error 
    console.log('Error here MF! Try fucking with code.');
  }

  //try-catch can be used with normal code
  //when error in try, it will skip rest of code and catch it
  //try-catch used for unexpected errors only

  renderOrderSummary();
  renderPaymentSummary();

  //return 'param' is saved as in resolve and can be used in then()
}
loadPage();

/*
Promise.all([  //give it array of promises and it runs both at same time instead of waiting for each promise one by one
  loadProductsFetch(),
  new Promise((resolve)=>{
    loadBackendCart(()=>{
      resolve('value_2');
    });
  })

]).then((values)=>{  //gives array of values from Promises #1 and #2
  renderOrderSummary();
  renderPaymentSummary();
});


/*
new Promise((resolve)=>{ //runs inner function immediately
  loadBackendProducts(()=>{ //load products asyncly
    //wait for products and finish loading
    resolve(); //signal finished and move to next step
    //we can give manual next step which runs on seperate thread
    //from the normal flow of loadBackendProducts()
  });
}).then(()=>{
  //next step
  return new Promise((resolve)=>{
    loadBackendCart(()=>{
      resolve(); //we can give a arg to resolve and get param at then
    })
  })
}).then(()=>{
  //next step #2
  renderOrderSummary();
  renderPaymentSummary();
}) //resolve lets us control when to go to next step (like done())


//promises help keep our code flat unlike callbacks with nesting


/*

loadBackendProducts(()=>{
  loadBackendCart(()=>{
   renderOrderSummary();
   renderPaymentSummary();
  })
});  //but multiple callbacks cause nesting and indents which is bad

*/



