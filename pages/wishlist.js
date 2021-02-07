import React, { useState, useEffect } from 'react'
import BasicLayout from '../layouts/BasicLayout'
import { Grid, Loader } from 'semantic-ui-react'
import { size, forEach, map } from 'lodash'
import {getMyFavoritesApi} from '../api/favorite'
import useAuth from '../hooks/useAuth'
import ListProduct from '../components/ListProduct'



const Wishlist = () => {
    const [products, setProducts] = useState(null);
    const { auth, logout } = useAuth()
    const [ reloadWishlist, setReloadWishlist ] = useState(false)
    
    useEffect(() => {
        (async () =>{
            const response = await getMyFavoritesApi(auth.idUser, logout)
            if(size(response) > 0){
                const productList = []
                forEach(response, (data) =>{
                    productList.push(data.product)
                })
                setProducts(productList)
            }
            else{
                setProducts([])
            }
        })()
        setReloadWishlist(false)
    }, [reloadWishlist]);

    return (
        <BasicLayout>
            <div className="Wishlist">
                <h1 className="Wishlist__title">Wishlist</h1>
                <div className="Wishlist__products">
                    <Grid>    
                            {!products && <Loader active>Loading Products</Loader>}
                            {products && size(products) === 0 &&(
                                <h3>No products in your wishlist</h3>
                            )}
                            
                            {size(products) > 0 && (
                                map(products, (product)=>{
                                    return(
                                    <Grid.Column mobile={16} tablet={8} computer={4} key={product._id}>
                                        <ListProduct product={product} favorite auth={auth} logout={logout} setReloadWishlist={setReloadWishlist} />
                                    </Grid.Column>)
                                })
                            )}
                    </Grid>
                </div>
            </div>
        </BasicLayout>
    );
}
 
export default Wishlist;