import { renderOrderSummary } from '../../javascript-amazon-project-main/scripts/checkout/orderSummary.js';
import {
  loadFromStorage
} from '../../javascript-amazon-project-main/data/cart.js';

import { loadBackendProducts,loadProductsFetch } from '../../javascript-amazon-project-main/data/products.js';

describe('test suite: renderOrderSummary', () => {

  beforeAll((done)=>{  //done function by Jasmine waits for async call
    loadProductsFetch().then(()=>{
      done();
    });
  });
  
  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        },
        {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2'
        }
      ]);
    });

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-os"></div>
      <div class="js-payment-summary"></div>
    `;

    loadFromStorage();
    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('displays the cart', () => {

    expect(
      document.querySelectorAll('.js-cart-i-c').length
    ).toEqual(2);

    expect(
      document.querySelector(
        '.js-product-quantity-e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
      ).innerText
    ).toContain('Quantity:');

    expect(
      document.querySelector(
        '.js-product-quantity-e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
      ).innerText
    ).toContain('2');

  });

  it('removes a product', () => {

    document.querySelector(
      '.js-product-id-e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
    ).click();

    expect(
      document.querySelectorAll('.js-cart-i-c').length
    ).toEqual(1);

    expect(
      document.querySelector(
        '.js-product-quantity-e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
      )
    ).toEqual(null);

  });

});