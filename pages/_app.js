import React, { useMemo, useState, useEffect } from 'react'
import 'semantic-ui-css/semantic.min.css'
import '../scss/global.scss'
//Toastify
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
//Token
import AuthContext from '../context/AuthContext'
import { setToken, getToken } from '../api/token'
import jtwDecode from 'jwt-decode'

function MyApp({ Component, pageProps }) {

  const [ auth, setAuth ] = useState(undefined)
  const [ reloadUser, setReloadUser ] = useState(false)

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

  const authData = useMemo(
    ()=>({
      auth,
      login,
      logout: () => null,
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
