import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Input, Button, Icon, Dropdown } from 'semantic-ui-react'
import useAuth from '../../hooks/useAuth'
import { getMeAPI } from '../../api/user'
import { getCategoriesApi } from '../../api/categories'
import { map } from 'lodash'

const  Header = ({href}) => {
    const { logout, auth} = useAuth()
    
    const [ categories, setCategories] = useState([])
    const [ menuActive, isMenuActive ] = useState(false)
    const [ user, setUser ] = useState(undefined)


    useEffect(() => {
        (async () =>{
            const response = await getMeAPI(logout)
            setUser(response)
        }
        )()
    }, [auth]);

    useEffect(() => {
        (async () =>{
            const response = await getCategoriesApi()
            setCategories(response || [])
        })()
    }, []);

    return (
        <>
        <div className="TopBar">
            <div className="TopBar__Phone">
                <Phone />
            </div>

            <div className="TopBar__Nav">
                <Message />
                { auth ? <DropDown logout={logout} name={user?.name} Link={Link} /> : <Login />}
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

                        {map(categories, (category) =>(
                            <Link href={`/category/${category.slug}`} key={category._id}>
                                <a 
                                    className='Header__link'
                                >
                                    {category.title}
                                </a>
                            </Link>
                        ))}
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
        <Link href="/login">
            <a>Log In</a>
        </Link>
    </Button>
)

const DropDown = ({logout, name, Link}) =>{
    let user = ''
    if(name) user = name
    return(
        <Dropdown 
            className="Header__dropdown" 
            trigger={
                <span>
                    <Icon name='user' /> {`Hi,${user}`}
                </span>
            }
        >
            <Dropdown.Menu>
                <Dropdown.Item>
                    <Link href="/account">
                        <a>Account</a>
                    </Link>
                </Dropdown.Item>

            <Dropdown.Item
                text="Cerrar sesión"
                onClick={logout}
            />
            </Dropdown.Menu>
        </Dropdown>
    )
}
