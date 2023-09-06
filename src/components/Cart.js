import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [cart, setCart] = useState([]);
  
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleCheckout = async () => {
    if (!stripe || !elements) {
      return;
    }

    // Create a payment intent on your server and get a client secret
    const response = await fetch('/your-server-endpoint-for-payment-intent');
    const data = await response.json();
    
    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
        },
      },
    });

    if (result.error) {
      console.error(result.error);
    } else if (result.paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded');
    }
  };

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <form onSubmit={handleCheckout}>
        <CardElement />
        <button type="submit">Checkout</button>
      </form>
    </div>
  );
};

export default CheckoutForm;