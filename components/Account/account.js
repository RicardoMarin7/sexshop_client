import React, { useState, useEffect } from 'react'
import { Button } from 'semantic-ui-react'
import ChangePassword from './ChangePassword'
import Addresses from './Addresses'
import { useRouter } from 'next/router'


const Account = ({user,logout}) => {
    const [ content, setContent] = useState('addresses')
    const router = useRouter()
    const { query } = router

    useEffect(() => {
        if(query.menu){
            setContent(query.menu)
        }
    }, [query]);

    return (
        <div className="Account">
                <HorizontalSidebar
                    setContent = {setContent}
                    router={router}
                />
            <div className="Account__content">
                <Content 
                    content={content} 
                    user={user}
                    logout={logout}
                />
            </div>
        </div>
    );
}

const HorizontalSidebar = ({router}) => (
    <div className="Account__sidebar">
        <Button 
            basic
            onClick={() => router.push('/account?menu=addresses')}
        >
            <a className='Account__sidebar__link'>
            Addresses</a>
        </Button>
        
        <Button 
            basic
            onClick={() => router.push('/account?menu=changepassword')}
        >
            <a className="Account__sidebar__link">Change Password</a>
        </Button>
    </div>
)

const Content = ({content, user, logout}) => {
    switch(content){
        case 'addresses':
            return <Addresses />
        
        case 'home':
            return <h1>Home</h1>
        
        case 'changepassword':
            return(
                <ChangePassword
                    user={user}
                    logout={logout}
                />
            )

        default:
            return 'home'
    }
}



export default Account;