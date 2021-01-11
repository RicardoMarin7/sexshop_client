import React, { useState, useEffect } from 'react'
import BasicLayout from '../layouts/BasicLayout'
import AccountComponent from '../components/Account'
import { useRouter } from 'next/router'
import { getMeAPI } from '../api/user'
import useAuth from '../hooks/useAuth'

const Account = () => {
    const [user, setUser] = useState(undefined)
    const { auth, logout } = useAuth();
    const router = useRouter()

    useEffect(() => {
        (async () =>{
            const response = await getMeAPI(logout)
            setUser( response || null )
        })()
    }, [auth]);

    if(user === undefined) return null
    if(!auth && !user){
        router.replace('/')
        return null
    }

    return ( 
        <BasicLayout>
            <AccountComponent />
        </BasicLayout>
    );
}
export default Account;