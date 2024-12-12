import React, { useState } from 'react';
import { LuMenu } from "react-icons/lu";
import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router";
import { useCart } from "../context/CartContextProvider"

function NavBar() {
    const cart = useCart()
    const [nav, setNav] = useState(false)

    const handleNav = () => {
        setNav(!nav)
    }

    return (
        <div className='nav fixed w-full top-0 left-0 py-5 flex justify-between items-center lg:px-[7%] px-3 z-50'>
            <div className='text-[35px] font-bold'>
                E-Commerce
            </div>

            {/* WEB */}

            <div className='items-center lg:flex hidden font-sans'>
                <ul className='flex text-sm list-none pr-12 font-semibold'>
                    <NavLink to={'/'} className='pr-10 cursor-pointer'>
                        HOME
                    </NavLink>
                    <NavLink to={'/orders'} className='cursor-pointer pr-10'>
                        ORDERS
                    </NavLink>
                    <NavLink to={'/cart'} className='cursor-pointer flex items-center gap-1'>
                        <FaShoppingCart size={20} /><sup>{cart.cart.length}</sup>
                    </NavLink>
                </ul>
            </div>

            {/* MOBILE */}

            <div className='lg:hidden font-sans font-semibold'>
                <div className='border-2 rounded py-1 px-2 border-gray-600'>
                    <LuMenu onClick={handleNav} size={25} />
                </div>
                <div className={`${nav ? "translate-x-0" : "-translate-x-full"} flex transition-all duration-300 bg-[#040c16] list-none flex-col absolute mt-6 left-0 w-full items-start py-5 px-5 border-t border-gray-600 gap-5`}>
                    <li className={`${nav ? "opacity-100" : "opacity-0"} transition-all duration-[1500ms]`}>
                        HOME
                    </li>
                    <li className={`${nav ? "opacity-100" : "opacity-0"} transition-all duration-[1500ms]`}>
                        CARTS
                    </li>
                    <li className={`${nav ? "opacity-100" : "opacity-0"} transition-all duration-[1500ms]`}>
                        CONTACT
                    </li>
                    <li className={`${nav ? "opacity-100" : "opacity-0"} transition-all duration-[1500ms]`}>
                        ORDERS
                    </li>
                </div>
            </div>
        </div>
    )
}

export default NavBar
