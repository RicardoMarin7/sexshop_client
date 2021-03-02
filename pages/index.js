import React, { useState, useEffect } from 'react'
import BasicLayout from '../layouts/BasicLayout'
import { getLastProductsApi } from '../api/product'
import { size, map } from 'lodash'
import MyCarousel from '../components/MyCarousel'
import { validateAddressApi } from '../api/shippingUSPS'

export default function Home() {

  const [products, setProducts] = useState([])



  useEffect(() => {
    (async () => {
      const response = await getLastProductsApi(10);
      if( size(response) > 0 ) setProducts(response)
      else setProducts([])
    })()
  }, []);

  return (
    <BasicLayout>
      <MyCarousel 
        title='Latest Products'
        items={products}
        key={1}
      />
    </BasicLayout>
  )

};
 

