import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Input, Button, Icon, Dropdown } from 'semantic-ui-react'
import useAuth from '../../hooks/useAuth'
import { getMeAPI } from '../../api/user'
import { getCategoriesApi } from '../../api/categories'
import { map } from 'lodash'
import { useRouter } from 'next/router'

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
                { auth ? <DropDown logout={logout} name={user?.name} Link={Link} /> : <Login router={router} />}
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
    const [query, setQuery ] = useState('')
    const [load, setLoad] = useState(false);
    const router = useRouter()

    useEffect(() => {
        if(load){
            router.push(`/search?query=${query}`)
        }
        setLoad(true)
    }, [query]);

    
    return(
        <Input
            id='search'
            icon={{
                name:'search'
            }}
            value={router.query.query}
            onChange={(_,data) => setQuery(data.value)}
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
    <Link href="/login">
        <a>
        <Button icon>
            <Icon name="lock" />
            Log In
        </Button>
        </a>
    </Link>
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
                
                <Dropdown.Item>
                    <Link href="/wishlist">
                        <a>Wishlist</a>
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
