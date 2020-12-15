import { useState } from 'react'
import Link from 'next/link'
import { Input, Button, Icon } from 'semantic-ui-react'



const  Header = ({href}) => {

    const [ menuActive, isMenuActive ] = useState(false)

    return (
        <>
        <div className="TopBar">
            <div className="TopBar__Phone">
                <Phone />
            </div>

            <div className="TopBar__Nav">
                <Message />
                <Login />
            </div>
        </div>
        <header className="Header__primary">
                <div className="Header__logo">
                    <h1>Sex<span>Shop</span></h1>
                </div>

                <nav className="Header__menu">

                    <div className={`Header__links ${ menuActive ? 'active' : ''}`}>
                        <Link href="/">
                            <a 
                                className='Header__link'>
                            Home</a>
                        </Link>
                        
                        <Link href="!#">
                            <a className="Header__link">Lingerie</a>
                        </Link>
                        
                        <Link href="!#">
                            <a className="Header__link">Accesories</a>
                        </Link>

                        <Link href="!#">
                            <a className="Header__link">Massage</a>
                        </Link>

                        <Link href="!#">
                            <a className="Header__link">A Propos</a>
                        </Link>
                    </div>
                    
                    

                    <div className="Header__icons">
                    <Search />

                    <Cart />

                </div>

                <div 
                        className={`Header__burguer ${ menuActive ? 'active' : ''}`}
                        onClick={ () => isMenuActive(!menuActive)}

                    >
                        <span></span>
                        <span></span>
                        <span></span>
                </div>

                </nav>
        </header>
        </>
    );
}
export default  Header;

const Search = () =>{
    return(
        <Input
            id='search'
            icon={{
                name:'search'
            }}
        />
    )
}

const Cart = () => (
    <Button icon>
        <Icon name="shopping bag" />
    </Button>
);

const Phone = () => (
    <Link href="tel:0123-456-789">
        <a><Icon name="phone volume"/>0123-456-789</a>
    </Link>

);

const Message = () =>(
    <Link href="!#">
        <a><Icon name="envelope"/></a>
    </Link>
)

const Login = () =>(
    <Button icon>
        <Icon name="lock" />
        Iniciar Sesión
    </Button>
)
