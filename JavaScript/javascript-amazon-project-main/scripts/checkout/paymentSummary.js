import { cart } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';
import { addOrder } from '../../data/orders.js';

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  let totalItems = 0;

  cart.forEach((cartItem) => {
    totalItems += cartItem.quantity;

    const product = getProduct(
      cartItem.productId
    );

    productPriceCents +=
      product.priceCents *
      cartItem.quantity;

    const deliveryOption =
      getDeliveryOption(
        cartItem.deliveryOptionId
      );

    shippingPriceCents +=
      deliveryOption.priceCents;
  });

  const totalBeforeTaxCents =
    productPriceCents +
    shippingPriceCents;

  const taxCents =
    Math.round(totalBeforeTaxCents * 0.1);

  const totalCents =
    totalBeforeTaxCents +
    taxCents;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${totalItems}):</div>
      <div class="payment-summary-money">
        $${formatCurrency(productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping & handling:</div>
      <div class="payment-summary-money">
        $${formatCurrency(shippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>
  `;

  document.querySelector(
    '.js-payment-summary'
  ).innerHTML = paymentSummaryHTML;

  document.querySelector('.js-place-order').addEventListener
  ('click',async()=>{
    try{
      const responce = await fetch('https://supersimplebackend.dev/orders',{
        method: 'POST', //create something on backend
        headers: { //headers give backend more info about request
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart
        })
      });
      const order = await responce.json();
      addOrder(order);
      //localStorage.getItem('orders') in conslole
      //gets order details
      //localStorage.removeItem('orders') in console
    } catch(error){
      console.log('Unexpected Error!');
    }

    window.location.href = 'orders.html'
    //this changes URL in address bar 
    //URL Params let us save data directly in URL
    //can be added by adding '?orderId=123&productId=456' after tracking.html in URL  (in line 100 of orders.html)
  });
}

//Sending data to request in 4 types
// {GET,POST,PUT,DELETE}