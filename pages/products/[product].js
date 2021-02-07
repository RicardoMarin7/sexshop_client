import React, { useState, useEffect } from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import { useRouter } from 'next/router'
import { getProductBySlug, getRelatedProducts } from '../../api/product'
import ProductHeader from '../../components/Product/ProductHeader'
import marked from 'marked'

const Product = () => {
    const {query} = useRouter()
    const [product, setProduct] = useState(null);
  

    const getAdditionalInfo = () =>{
        const rawMark = marked(product.additional_info)
        return rawMark
    }

    useEffect(() => {
        (async () =>{
            const response = await getProductBySlug(query.product)
            setProduct(response)
            // console.log(response)
        })()
    }, [query]);

    useEffect(() => {
        if(product){
            (async () =>{
                const response = await getRelatedProducts(product.category.slug, 5)
                // setProduct(response)
                console.log(response)
            })()
        }
    }, [query]);

    return (
        <BasicLayout>
            {product ? <ProductHeader product={product} /> : null}
            {product?.additional_info ? (
                <div className="Additional_info">
                    <h3 className="Additional_info__title">
                        Additional Info
                    </h3>
                    <div dangerouslySetInnerHTML={{__html:  getAdditionalInfo() }}>

                    </div>
                </div>
            ) : null}
        </BasicLayout>
    );
}

export default Product;