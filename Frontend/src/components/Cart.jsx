import React from 'react';
import { useCart } from '../context/CartContextProvider';
import CardForCart from './CardForCart'

function Cart() {
    const cart = useCart();

    return (
        <div className='w-screen'>
            <h1 className='text-5xl text-left my-4'>
                CART
            </h1>
            <div className='flex flex-wrap gap-4'>
                {
                    cart.cart.map((procuct) => (
                        <div key={procuct.id}>
                            <CardForCart img={procuct.image} price={procuct.price} title={procuct.title} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Cart