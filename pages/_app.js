import React, { useMemo, useState, useEffect } from 'react'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'semantic-ui-css/semantic.min.css'
import '../scss/global.scss'
//Toastify
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
//Token
import AuthContext from '../context/AuthContext'
import { setToken, getToken, removeToken} from '../api/token'
import jtwDecode from 'jwt-decode'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {

  const [ auth, setAuth ] = useState(undefined)
  const [ reloadUser, setReloadUser ] = useState(false)
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

  const authData = useMemo(
    ()=>({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  )



  if(auth === undefined) return null

  return(
    <AuthContext.Provider value={authData}>
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
    </AuthContext.Provider>
    )
}

export default MyApp
