import React, { useState, useEffect } from 'react'
import { Grid, Icon, Button } from 'semantic-ui-react'
import ProductCarousel from '../ProductCarousel'
import { isFavoriteApi, addFavoriteApi, removeFavoriteApi } from '../../../api/favorite'
import useAuth from '../../../hooks/useAuth'
import { size, map } from 'lodash'
import { useRouter } from 'next/router'
import useCart from '../../../hooks/useCart'
import classNames from "classnames"
import { toast } from 'react-toastify'

const ProductHeader = ({product}) => {
    const { auth , logout} = useAuth()
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);
    const [isFavorite, setIsFavorite ] = useState(false)
    const [reloadFavorite, setReloadFavorite] = useState(false)
    const router  = useRouter()
    const { addProductCart } = useCart()

    const onQuantityChange = e =>{
        setQuantity(e.target.value)
    }

    const addFavorite = async () =>{
        if(auth){
            setReloadFavorite(true)
            await addFavoriteApi(auth.idUser, product.id, logout)
        }
        else{
            router.push('/login')
        }
    }
    
    const removeFavorite = async () =>{
        if(auth){
            setReloadFavorite(true)
            await removeFavoriteApi(auth.idUser, product.id, logout)
        }
        else{
            router.push('/login')
        }
    }

    useEffect(() => {
        if(auth){
            (async () => {
                const response = await isFavoriteApi(auth.idUser, product.id, logout)
                if(size(response) > 0) setIsFavorite(true)
                else setIsFavorite(false)
            })()
        }
        setReloadFavorite(false)
    }, [product, reloadFavorite]);

    return ( 
        <Grid centered className="ProductHeader">
            <Grid.Column mobile={16} tablet={6} computer={8}>
                <ProductCarousel photos={product.photos} id={product._id}/>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={10} computer={8}>
                <Grid.Row>
                    <h2 className="ProductHeader__title">{product.title}</h2>
                </Grid.Row>
                <Grid.Row>
                    <p className="ProductHeader__description">{product.description}</p>
                </Grid.Row>
                <Grid.Row >
                    <div className="ProductHeader__price">
                        <p>${product.price}<span> Tax Included</span></p>
                        <link itemProp="availability" href="https://schema.org/InStock"></link>
                        <meta itemProp="priceCurrency" content="USD"></meta>
                    </div>
                </Grid.Row>
                <Grid.Row >
                    <div className="ProductHeader__sizes">
                        <p>Select a size</p>
                        {map(product.sizes , productSize =>{
                            if(productSize.stock > 0){
                                return (
                                    <Button
                                    className={classNames("ProductHeader__sizes__button",{
                                            active: selectedSize?.id === productSize.id
                                    })} 
                                    key={productSize._id}
                                    onClick={() => setSelectedSize(productSize)}
                                    >
                                        {productSize.size}
                                    </Button>
                                )
                            }
                            else{
                                return <Button className="ProductHeader__sizes__button" disabled key={productSize._id}>{productSize.size}</Button>
                            }
                        })}
                        {selectedSize ? <p className="ProductHeader__sizes__stock">({selectedSize.stock} in stock)</p> : null}
                    </div>
                </Grid.Row>
                <Grid.Row>
                    <div className="ProductHeader__actions">
                        <input type="number" value={quantity} name="quantity" id="quantity" className="quantity" onChange={onQuantityChange} required/>
                        <div className="ProductHeader__actions__verticalArrows">
                            <Button icon onClick={() => setQuantity(quantity+1)}>
                                <Icon name='arrow up' />
                            </Button>
                            <Button icon onClick={() => {quantity > 1 ? setQuantity(quantity-1) : null}}>
                                <Icon name='arrow down' />
                            </Button>
                        </div>
                        <Button icon labelPosition='left' onClick={ () => addProductCart(product.slug , quantity, selectedSize)} type='submit'>
                            <Icon name='shopping cart' />
                            Add to Cart
                        </Button>
                        <Button icon className="favorite" type="button" onClick={isFavorite ? removeFavorite : addFavorite} loading={reloadFavorite}>
                            <Icon name={isFavorite ? 'heart' : 'heart outline' } />
                        </Button>
                    </div>
                </Grid.Row>
            </Grid.Column>
        </Grid>
    );
}
 
export default ProductHeader;