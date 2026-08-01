import {addToCart, cart, loadFromStorage} from '../../javascript-amazon-project-main/data/cart.js';

describe('test suite: addToCart', () => { //create test suite
  it('adds existing product to cart', () => { //create tests
    spyOn(localStorage, 'setItem'); //we do not want changes in original cart so we create mock
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }]);
    }); //mock
    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);  //compare 
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(3);
  });    



  it('adds new product to the cart', () => { //create tests
    spyOn(localStorage, 'setItem'); //we do not want changes in original cart so we create mock
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([]);       //return empty local storage array to fix errors by creating mock (fake) getItem method
    }); //mock
    loadFromStorage(); //reloads cart after mocking
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);  //compare 
    expect(localStorage.getItem).toHaveBeenCalledTimes(1); //how many times called (expected is 1) and works when mocked only
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });                                        
})

//test coverage - how much code is being tested

//Flaky Test - A test that sometimes passes and sometimes fails

//Mock - lets us replace method with fake version

//Unit Test - Tests a single part of code

//Integration Test - Tests many pieces of code together

