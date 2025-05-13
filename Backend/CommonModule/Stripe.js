require('dotenv').config();
const stripe = require("stripe")(
process.env.SECRET_STRIPE_KEY
);
const createCustomer = async (name,email) => {
  const customer = await stripe.customers.create({
    name: name,
    email: email,
  });
  return customer;
};
const customerCard = async (tokenId,customerId) => {
  console.log('customerId :>> ', customerId);
  console.log('tokenId :>> ', tokenId);
  const customerSource = await stripe.customers.createSource(customerId, {
    source: tokenId,
  });
  return customerSource;
};

const paymentIntents=async(amount,cardId,custId)=>{

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
    payment_method:cardId,
    customer:custId,
    confirm:true,
    return_url:"http://localhost:5173/customer/home"
  });
  return paymentIntent;
}


// const createCharge=async(email)=>{
//   const charge = await stripe.charges.create({
//     receipt_email :email,
//     amount: amount,
//     currency: 'usd',
//     card: cardId,
//     customer:customerId
//   });
// }
module.exports = { createCustomer, customerCard , paymentIntents };
