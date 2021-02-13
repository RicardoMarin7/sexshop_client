import { BASE_PATH, CART } from '../utils/constants'
import { toast } from 'react-toastify'
import { size, find, remove, map} from 'lodash'

export const getProductsCart = () => {
    const cart = JSON.parse(localStorage.getItem(CART))
    if(!cart){
        return null
    }else{
        return cart
    }
}

export const addProductCart = (product, quantity) =>{
    if(!quantity){
        toast.error("The product needs a quantity")
        return
    }

    const cart = getProductsCart()

    if(!cart){
        localStorage.setItem(CART, JSON.stringify([{product: product, quantity:  parseInt(quantity)}]))
        toast.success("Product added to cart successfully")
    }else{
        const productFound = find( cart, {product: product})
        if(productFound){
            toast.warning("Product already exists in your cart")
        }else{
            cart.push({product:product, quantity: parseInt(quantity)})
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

export const changeCartProductQuantity = (product, quantity) =>{
    const cart = JSON.parse(localStorage.getItem(CART))
    const cartTemp = []
    for(let i = 0; i < cart.length; i++){
        if(cart[i].product !== product.slug){
            cartTemp.push(cart[i])
        }else{
            cartTemp.push({product:product.slug, quantity:quantity})
        }
    }
    localStorage.setItem(CART, JSON.stringify(cartTemp))
}

export const removeProductCart = (product) =>{
    const cart = JSON.parse(localStorage.getItem(CART))
    
    remove(cart, (item) =>{
        return item.product === product
    })

    if(size(cart) > 0 ){
        localStorage.setItem(CART, JSON.stringify(cart))
    }else{
        localStorage.removeItem(CART)
    }
    
}
