import React, { useEffect, useState } from 'react';
import axios from "axios";
import Card from "../components/Card"

function Home() {
    const [procucts, setProducts] = useState([])

    useEffect(() => {
        const getAllProducts = async () => {
            await axios.get('https://fakestoreapi.com/products')
                .then((data) => setProducts(data.data))
        }
        getAllProducts();
    }, [])

    return (
        <div className='w-screen mt-24 flex flex-wrap gap-4'>
            {
                procucts.map((procuct) => (
                    <div key={procuct.id}>
                        <Card id={procuct.id} img={procuct.image} price={procuct.price} title={procuct.title} />
                    </div>
                ))
            }
        </div>
    )
}

export default Home