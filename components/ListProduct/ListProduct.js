import Link from 'next/link'
import Image from 'next/image'

const Product = ({product}) => {
        return (
        <div className="product">
            <Link href={`/products/${product.slug}`}>
                <a>
                {/* <Image src={product.poster.url} layout='responsive' height={product.poster.height} width={product.poster.width}/> */}
                <img src={product?.poster.url} alt={product.title} />
                <h2>{product.title}</h2>
                </a>
            </Link>
                <p>${product.price}</p>
        </div>
    );
}
export default Product;