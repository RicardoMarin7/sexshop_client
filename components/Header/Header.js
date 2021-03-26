import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Input, Button, Icon, Dropdown, Label, Image } from 'semantic-ui-react'
import useAuth from '../../hooks/useAuth'
import { getMeAPI } from '../../api/user'
import { getCategoriesApi } from '../../api/categories'
import { map } from 'lodash'
import { useRouter } from 'next/router'
import useCart from '../../hooks/useCart'
import useHomeConfig from '../../hooks/useHomeConfig'

const  Header = ({href}) => {
    const { logout, auth} = useAuth()
    
    const [ categories, setCategories] = useState([])
    const [ menuActive, isMenuActive ] = useState(false)
    const [ user, setUser ] = useState(undefined)
    const { homeConfig } = useHomeConfig()
    
    const router = useRouter()

    const getLogo = () =>{
        if(homeConfig?.logo?.formats?.thumbnail){
            return homeConfig.logo.formats.thumbnail.url
        }
        return homeConfig.logo.url
    }

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
                <Phone homeConfig={homeConfig} />
            </div>

            <div className="TopBar__Nav">
                <Message />
                { auth ? <DropDown logout={logout} name={user?.name} Link={Link} /> : <Login router={router} />}
            </div>
        </div>
        <header className="Header__primary">
                <div className="Header__logo">
                    <Link href='/'>
                        <a>
                            {homeConfig?.logo ? <Image src={getLogo()} /> : (<h1>Vares<span>Bros</span></h1>)}
                        </a>
                    </Link>
                        
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
                    <Search router={router} />

                    <Cart useCart={useCart} router={router}/>

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

const Search = ({router}) =>{
    const [searchStr, setSearchStr ] = useState("")
    const [load, setLoad] = useState(false);

    useEffect(() => {
        if(load){
            router.push(`/search?query=${searchStr}`)
        }
        setLoad(true)
    }, [searchStr]);

    
    return(
        <Input
            id='search'
            icon={{
                name:'search'
            }}
            value={searchStr}
            onChange={( _, data) => setSearchStr(data.value)}
        />
    )
}

const Cart = ({useCart, router}) => {
    const { productsCart } = useCart()
    
    return(
        <Button icon >
            <Icon name="shopping bag" onClick={ () => router.push('/cart')} />
            <Label color="red" floating circular>
                {productsCart}
            </Label>
        </Button>
    )
}

const Phone = ({homeConfig}) => {
    const phone = homeConfig?.phone || ''
    return(
        <Link href={`tel:${phone}`}>
            <a><Icon name="phone volume"/>{phone}</a>
        </Link>
    )
}


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

                <Dropdown.Item>
                    <Link href="/orders">
                        <a>Orders</a>
                    </Link>
                </Dropdown.Item>

                <Dropdown.Item
                    text="Log out"
                    onClick={logout}
                />
            </Dropdown.Menu>
        </Dropdown>
    )
}
