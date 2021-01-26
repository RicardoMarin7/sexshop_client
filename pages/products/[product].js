import BasicLayout from '../../layouts/BasicLayout'
import { useRouter } from 'next/router'

const Product = () => {
    const {query} = useRouter()
    console.log(query)
    return (
        <BasicLayout>
            <h2>Product {query.product}</h2>
        </BasicLayout>
     );
}
 
export default Product;