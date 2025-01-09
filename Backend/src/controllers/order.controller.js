import asyncHandler from "../utils/asyncHandler.js";
import Stripe from "stripe";
import apiResponse from "../utils/apiResponse.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
})

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

const checkout = asyncHandler(async (req, res) => {
    let { product_name, product_price, product_quantity, product_Img } = req.body;

    product_price = parseInt(product_price);

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product_name,
                        images: [product_Img],
                    },
                    unit_amount: product_price * 100,
                },
                quantity: product_quantity,
            },
        ],
        customer_email: req.user.email,
        mode: 'payment',
        success_url: `${process.env.ORIGIN}/success`,
        cancel_url: `${process.env.ORIGIN}/cancel`,
    });

    return res
        .status(200)
        .json(new apiResponse(200, { sessionId: session.id }, "Session Created Successfully"));
});

export { checkout }
