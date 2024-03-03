import asyncHandler from "express-async-handler";


const processPayment = asyncHandler(async (req, res, next) => {
  const myPayment = await process.env.STRIPE_SECRET_KEY.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

const sendStripeApiKey = asyncHandler(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});

export {processPayment,sendStripeApiKey}
