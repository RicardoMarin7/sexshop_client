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
import HomeConfigContext from '../context/HomeConfigContext'
import { setToken, getToken, removeToken} from '../api/token'
import { addProductCart, changeCartProductQuantity, countProductsCart, getProductsCart, removeProductCart, removerAllProductsCart} from '../api/cart'
import { getHomeSettings } from '../api/home'
import jtwDecode from 'jwt-decode'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {

  const [ auth, setAuth ] = useState(undefined)
  const [ reloadUser, setReloadUser ] = useState(false)
  const [ totalProductsCart, setTotalProductsCart ] = useState(0)
  const [ reloadCart, setReloadCart ] = useState(false)
  const [homeConfig, setHomeConfig] = useState(undefined)
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

  useEffect(()=>{
    getHomeConfig()
  },[])

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

  const addProduct = (product, quantity, size) =>{
    const token = getToken()
    if(token){
      addProductCart(product, quantity, size)
      setReloadCart(true)
    }else{
      toast.warning('To buy products you need to log in')
    }
  }

  const removeProduct = (product, productSize) =>{
    removeProductCart(product, productSize)
    setReloadCart(true)
    toast.warning('Product deleted')
  }

  const changeQuantity = (product, quantity, size) =>{
    changeCartProductQuantity(product, quantity, size)
    setReloadCart(true) 
  }

  const getHomeConfig = async () =>{
    const response = await getHomeSettings()
    if(response) setHomeConfig(response)
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
      addProductCart: (product, quantity,size) => addProduct(product, quantity,size),
      getProductsCart,
      removeProductCart: (product, productSize) => removeProduct(product, productSize) ,
      removerAllProductsCart,
      changeCartProductQuantity: (product, quantity, size) => changeQuantity(product, quantity, size),
    }),
    [totalProductsCart]
  )

  const homeConfigData = useMemo(
    ()=>({
      homeConfig,
      getHomeConfig
    }),
    [homeConfig]
  )

  if(auth === undefined) return null

  return(
    <HomeConfigContext.Provider value={homeConfigData}>
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
    </HomeConfigContext.Provider>
    )
}

export default MyApp
