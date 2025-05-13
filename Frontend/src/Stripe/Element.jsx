import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { CheckoutForm } from "./CheckoutForm";

// const stripekey = loadStripe(
//   "pk_test_51QXju6Bca28f02JwaVotnGcAKQWRDoUMzPJhuBZXuSYam1x77VuyGMf55ePWpxB5jkYLFQaJSl5xDexB26XKGwBn00PtHo671E"
// );
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);


export const Element = ({ price }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm price={price} />
  </Elements>
);
