import { createContext, useContext, useState } from "react";

const CartContext = createContext()

const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const addToCart = (cart) => {
        setCart((prev) => [...prev, cart])
    }

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => useContext(CartContext)

export { CartContextProvider, useCart }