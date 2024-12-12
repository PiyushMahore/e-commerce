import React from 'react'
import { useCart } from '../context/CartContextProvider'

function Card({ img, title, price, id }) {
    const cart = useCart();

    const addToCart = () => {
        const item = {
            id,
            image: img,
            title,
            price
        }
        cart.addToCart(item)
    }
    return (
        <div className='bg-[#ffffff] w-[400px] h-[400px] border rounded text-black p-3'>
            <div className='p-1.5 w-full h-[70%] overflow-hidden border border-gray-500'>
                <img className='hover:scale-110 transition transform duration-500' src={img} />
            </div>
            <div className='h-[15%] w-full p-2 flex justify-between'>
                <h4 className='w-[80%] text-start'>{title}</h4>
                <h5 className='w-[20%] font-bold'>{price}-$</h5>
            </div>
            <div className='h-[15%] w-full p-2 flex justify-center'>
                <button onClick={addToCart} className='bg-blue-400 hover:bg-blue-700 transition-all duration-500 px-4 py-1 rounded'>Add To Cart</button>
            </div>
        </div>
    )
}

export default Card