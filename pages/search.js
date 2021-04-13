import React, { useState, useEffect } from 'react'
import BasicLayout from '../layouts/BasicLayout'
import { searchProductApi } from '../api/product'
import { useRouter } from 'next/router'
import { size, map } from 'lodash'
import { Loader, Grid } from 'semantic-ui-react'
import ListProduct from '../components/ListProduct'
import Seo from '../components/Seo'

const Search = () => {
    const [products, setProducts] = useState(null)
    const { query, asPath } = useRouter()

    useEffect(() => {
        document.getElementById("search").focus()
    }, []);

    useEffect(() => {
        (async () =>{
            if( size(query.query) > 1 ){
                const response = await searchProductApi(query.query)
                if(size(response) > 0){
                    setProducts(response)
                }else{
                    setProducts([])
                }
            }else{
                setProducts([])
            }
        })()
    }, [query]);

    return (
        <BasicLayout>
            <Seo 
                title={`Search: ${query.query}`}
                url={`${asPath}`}
                description={'Find all the items you need to fulfill your fantasies'}
            />
            <div className="Search">
                <h1 className="Search__title">Search</h1>
                <h2 className="Search__query">{query.query}</h2>
                <div className="Search__results">
                    <Grid>    
                            {!products && <Loader active>Loading Products</Loader>}
                            {products && size(products) === 0 &&(
                                <h3>No products match your search criteria </h3>
                            )}
                            
                            {size(products) > 0 && (
                                map(products, (product)=>{
                                    return(
                                    <Grid.Column mobile={16} tablet={8} computer={4} key={product._id}>
                                        <ListProduct product={product} />
                                    </Grid.Column>)
                                })
                            )}
                    </Grid>
                </div>
            </div>
        </BasicLayout>
    );
}
 
export default Search;