import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckOutForm } from '../CheckOutForm';

// const stripeKey = loadStripe('pk_test_51QXju6Bca28f02JwaVotnGcAKQWRDoUMzPJhuBZXuSYam1x77VuyGMf55ePWpxB5jkYLFQaJSl5xDexB26XKGwBn00PtHo671E');
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export const Element = (props) => (
    <Elements stripe={stripePromise} >
      <CheckOutForm total={props.payment}/>
    </Elements>
  );