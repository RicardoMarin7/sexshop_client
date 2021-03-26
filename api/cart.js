import { BASE_PATH, CART } from '../utils/constants'
import { getMeAPI } from '../api/user'
import { toast } from 'react-toastify'
import { size, find, remove, map} from 'lodash'
import { authFetch } from '../utils/fetch'
import { useReducer } from 'react'

export const getProductsCart = () => {
    const cart = JSON.parse(localStorage.getItem(CART))
    if(!cart){
        return null
    }else{
        return cart
    }
}

export const addProductCart = (product, quantity, size) =>{
    if(!quantity){
        toast.error("The product needs a quantity")
        return
    }

    if(!size){
        toast.error("The product needs a size")
        return
    }

    if(quantity > size.stock){
        toast.error("Insufficient stock")
        return
    }

    const cart = getProductsCart()

    if(!cart){
        localStorage.setItem(CART, JSON.stringify([{product: product, quantity:  parseInt(quantity), size: size.size}]))
        toast.success("Product added to cart successfully")
    }else{
        const productFound = find( cart, {product: product, size: size.size})
        if(productFound){
            toast.warning("Product already exists in your cart")
        }else{
            cart.push({product:product, quantity: parseInt(quantity), size: size.size})
            localStorage.setItem(CART, JSON.stringify(cart))
            toast.success("Product added to cart successfully")
        }
    }
}

export const countProductsCart = () =>{
    const cart = getProductsCart()

    if(!cart){
        return 0
    }else{
        let total = 0
        map(cart, cartItem => {
            if(cartItem.quantity){
                total += cartItem.quantity
            }
        })
        return total
    }
}

export const changeCartProductQuantity = (product, quantity, size) =>{
    if(!quantity) return null
    if(quantity > size?.stock){
        toast.error('Insufficient Stock')
        return null
    }
    const cart = JSON.parse(localStorage.getItem(CART))
    const cartTemp = []
    for(let i = 0; i < cart.length; i++){
        if(cart[i].product !== product.slug){
            cartTemp.push(cart[i])
        }else if(cart[i].size !== size.size){
            cartTemp.push(cart[i])   
        }else{
            cartTemp.push({product:product.slug, quantity:quantity, size: size.size})
        }
    }
    localStorage.setItem(CART, JSON.stringify(cartTemp))
}

export const removeProductCart = (slug, productSize) =>{
    const cart = JSON.parse(localStorage.getItem(CART))
    
    remove(cart, (item) =>{
        console.log(item)
        console.log((item.product === slug && item.size === productSize));
        return (item.product === slug && item.size === productSize)
    })

    if(size(cart) > 0 ){
        localStorage.setItem(CART, JSON.stringify(cart))
    }else{
        localStorage.removeItem(CART)
    }
}

export const paymentCartApi = async (token, products, idUser, address, shippingCost, shippingType, logout) =>{
    try {
        const addressShiping = address
        delete addressShiping.user
        delete addressShiping.createdAt
        delete addressShiping.updatedAt
        delete addressShiping.__v
        delete addressShiping._id
        delete addressShiping.id
        delete addressShiping.published_at
        delete addressShiping.title

        const productDetails = map(products, product =>(
            {
                title:product.title,
                slug:product.slug,
                size:product.size,
                quantity:product.quantity
            }
        ))

        const user = await getMeAPI(idUser)
        
        const userData = {
            email: user.email,
            name: user.name,
            lastname: user.lastname
        }

        const userEmail = user.email

        const url = `${BASE_PATH}/orders`
        const params ={
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token,
                products,
                idUser,
                addressShiping,
                productDetails,
                shippingCost,
                shippingType,
                userEmail,
                userData
            })
        }

        

        const result = await authFetch( url,params,logout )
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const removerAllProductsCart = () => {
    localStorage.removeItem(CART)
}