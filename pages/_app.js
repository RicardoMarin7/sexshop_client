import React, { useMemo, useState, useEffect } from 'react'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'semantic-ui-css/semantic.min.css'
import '../scss/global.scss'
//Toastify
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
//Token
import AuthContext from '../context/AuthContext'
import CartContext from '../context/CartContext'
import { setToken, getToken, removeToken} from '../api/token'
import { addProductCart, changeCartProductQuantity, countProductsCart, getProductsCart, removeProductCart} from '../api/cart'
import jtwDecode from 'jwt-decode'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {

  const [ auth, setAuth ] = useState(undefined)
  const [ reloadUser, setReloadUser ] = useState(false)
  const [ totalProductsCart, setTotalProductsCart ] = useState(0)
  const [ reloadCart, setReloadCart ] = useState(false)
  const router = useRouter()

  useEffect( () => {
    const token = getToken()
    if(token){
      setAuth({
        token,
        idUser: jtwDecode(token).id
      })
    }
    else{
      setAuth(null)
    }
    setReloadUser(false)
  }, [reloadUser])

  useEffect(() => {
    setTotalProductsCart(countProductsCart())
    setReloadCart(false)
  }, [reloadCart, auth]);

  const login = (token) =>{
    setToken(token)
    setAuth({
      token,
      idUser: jtwDecode(token).id
    })
  }

  const logout = () =>{
    if(auth){
      removeToken()
      setAuth(null)
      router.push('/')
    }
  }

  const addProduct = (product, quantity) =>{
    const token = getToken()
    if(token){
      addProductCart(product, quantity)
      setReloadCart(true)
    }else{
      toast.warning('To buy products you need to log in')
    }
  }

  const removeProduct = (product) =>{
    removeProductCart(product)
    setReloadCart(true)
    toast.warning('Product deleted')
  }

  const changeQuantity = (product, quantity) =>{
    changeCartProductQuantity(product, quantity)
    setReloadCart(true) 
  }

  const authData = useMemo(
    ()=>({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  )

  const cartData = useMemo(
    ()=>({
      productsCart: totalProductsCart,
      addProductCart: (product, quantity) => addProduct(product, quantity),
      getProductsCart,
      removeProductCart: (product) => removeProduct(product) ,
      removerAllProductsCart: () => null,
      changeCartProductQuantity: (product, quantity) => changeQuantity(product, quantity),
    }),
    [totalProductsCart]
  )

  if(auth === undefined) return null

  return(
    <AuthContext.Provider value={authData}>
      <CartContext.Provider value={cartData}>
        <Component {...pageProps} />
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </CartContext.Provider>
    </AuthContext.Provider>
    )
}

export default MyApp
