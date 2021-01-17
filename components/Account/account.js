import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import ChangePassword from './ChangePassword'
import Addresses from './Addresses'


const Account = ({user,logout}) => {
    const [ content, setContent] = useState('home')
    return (
        <div className="Account">
                <HorizontalSidebar
                    setContent = {setContent}
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

const HorizontalSidebar = ({setContent}) => (
    <div className="Account__sidebar">
        <Button 
            basic
            onClick={() => setContent('Addresses')}
        >
            <a className='Account__sidebar__link'>
            Addresses</a>
        </Button>
        
        <Button 
            basic
            onClick={() => setContent('lingerie')}
        >
            <a className="Account__sidebar__link">
                    Lingerie
            </a>
        </Button>
        
        <Button 
            basic
        >
            <a className="Account__sidebar__link">Accesories</a>
        </Button>

        <Button 
            basic
        >
            <a className="Account__sidebar__link">Massage</a>
        </Button>

        <Button 
            basic
            onClick={() => setContent('changePassword')}
        >
            <a className="Account__sidebar__link">Change Password</a>
        </Button>
    </div>
)

const Content = ({content, user, logout}) => {
    switch(content){
        case 'Addresses':
            return <Addresses />
        
        case 'home':
            return <h1>Home</h1>
        
        case 'changePassword':
            return(
                <ChangePassword
                    user={user}
                    logout={logout}
                />
            )

        default:
            return null
    }
}



export default Account;