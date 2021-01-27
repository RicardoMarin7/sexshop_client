import React, { useState, useEffect } from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import { useRouter } from 'next/router'
import { getProductByCategoryApi, getTotalProductsCategory  } from '../../api/product'
import { getCategoryApi } from '../../api/categories'
import { size, map } from 'lodash'
import { Loader, Grid} from 'semantic-ui-react'
import Pagination from '../../components/Pagination'
import ListProduct from '../../components/ListProduct'

const Category = () => {
    const {query} = useRouter()
    const limitPerPage = 3
    const [ products, setProducts ] = useState(null)
    const [ totalProducts, setTotalProducts ] = useState(null)
    const [category, setCategory] = useState(null);

    const getStartItem = () =>{
        const currentPage = parseInt(query.page);
        if(!query.page || currentPage === 1){
            return 0
        }
        else return currentPage * limitPerPage - limitPerPage
    }

    useEffect(() => {
        (async ()=>{
            if(query.category){
                const response = await getProductByCategoryApi(query.category, limitPerPage, getStartItem())
                setProducts(response)
            }
        })()
    }, [query]);

    useEffect(() => {
        (async ()=>{
            const response = await getTotalProductsCategory(query.category)
            setTotalProducts(response)
        })()
    }, [query]);

    useEffect(() => {
        (async ()=>{
            const response = await getCategoryApi(query.category)
            setCategory(response[0])
        })()
    }, [query]);

    

    return (
        <BasicLayout>
            <div className="Category">
                <div className="Category__poster">
                    {category?.poster ? (<img src={category.poster.formats.large ? category.poster.formats.large.url : category.poster.url } alt={category.poster.alternativeText}/>) : null}
                </div>
                <div className="Category__content">
                    <div className="Category__sidebar">
                        <h3>sidebar</h3>
                    </div>
                    <div className="Category__products">
                        <h2 className='Category__title'>{query.category}</h2>
                        {category ? (<p className='Category__extract'>{category.description}</p>) : null}
                        <Grid>    
                            {!products && <Loader active>Loading Products</Loader>}
                            {products && size(products) === 0 &&(
                                <h3>No Products Found</h3>
                            )}
                            
                            {size(products) > 0 && (
                                map(products, (product)=>(
                                    <Grid.Column mobile={16} tablet={8} computer={4} key={product._id}>
                                        <ListProduct product={product} />
                                    </Grid.Column>
                                ))
                            )}
                        </Grid>

                        {totalProducts ? ( 
                                    <Pagination 
                                        totalProducts={totalProducts} 
                                        page={query.page ? parseInt(query.page) : 1 }
                                        limitPerPage={limitPerPage}
                                        startItem={getStartItem()}
                                    /> 
                        ) : null}
                    </div>
                </div>
            </div>    
        </BasicLayout>
    );
}

export default Category;