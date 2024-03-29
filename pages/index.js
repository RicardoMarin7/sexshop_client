import React, { useState, useEffect } from 'react'
import BasicLayout from '../layouts/BasicLayout'
import { getLastProductsApi } from '../api/product'
import MyCarousel from '../components/MyCarousel'
import { size } from 'lodash'
import MainSlider from '../components/MainSlider'
import SEO from '../components/Seo'

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
      <SEO 
        title='Home'
      />
      <MainSlider />
      <MyCarousel 
        title='Latest Products'
        items={products}
        key={1}
      />
    </BasicLayout>
  )

};
 

