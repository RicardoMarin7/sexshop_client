import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import BasicLayout from '../layouts/BasicLayout'
import useCart from '../hooks/useCart'
import useAuth from '../hooks/useAuth'
import FullCart from '../components/Cart/FullCart'


const Cart = () => {
    const { getProductsCart, removeProductCart, changeCartProductQuantity} = useCart()
    const [products, setProducts] = useState(getProductsCart())
    const { auth } = useAuth()
    const router  = useRouter()

    if(!auth){
        router.push('/')
        toast.error('You need to log in to see your cart')
        return null
    }

    return !products ? <EmptyCart /> : 
    <FullCart products={products} 
        removeProductCart={removeProductCart}
        changeCartProductQuantity={changeCartProductQuantity}
    />
}

const EmptyCart = () => {
    return (
        <BasicLayout>
            <h2 className="EmptyCart__title">Your cart is empty</h2>
        </BasicLayout>
    );
}
export default Cart;