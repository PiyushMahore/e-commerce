import { createContext, useContext, useState } from "react";
import axios from "axios";
import { loadStripe } from '@stripe/stripe-js';
const CartContext = createContext()

const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [clientSecret, setClientSecret] = useState("")

    const addToCart = (cart) => {
        setCart((prev) => [...prev, cart])
    }

    const Checkout = async (product_name, product_price, product_quantity, product_Img) => {
        try {
            const stripe = await loadStripe("pk_test_51QXPNvG0DKp8Ly3TT8YbwN1uzuRIKQOKmFhRc71DOoKvc0g5aNBM1Goi5FwqGxopaTUvvCxs8aw1w9xYLSZ87tYn00uBiDtjWv");
            const response = await axios.post('http://localhost:9000/api/v1/orders/checkout', {
                product_name: product_name,
                product_price: product_price,
                product_quantity: product_quantity,
                product_Img: product_Img
            }, {
                withCredentials: true
            });
            const result = stripe.redirectToCheckout({
                sessionId: response.data.data.sessionId
            })
            if (result.error) {
                console.log('failed to redirect to checkout', result.error);
            }
        } catch (error) {
            console.log('failed to checkout', error);
        }
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, Checkout, setClientSecret, clientSecret }}>
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => useContext(CartContext)

export { CartContextProvider, useCart }