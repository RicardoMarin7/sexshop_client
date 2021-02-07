import Link from 'next/link'
import { Button, Icon } from 'semantic-ui-react'
import { removeFavoriteApi } from '../../api/favorite'

const Product = ({product, favorite, auth, logout, setReloadWishlist}) => {

    const removeFromFavorites = (productID) =>  {
        removeFavoriteApi(auth.idUser, productID, logout) 
        setReloadWishlist(true)
    }

        return (
        <div className="product">
            <div className="product__TopBar">
                <Link href={`/products/${product.slug}`}>
                    <a>
                    {/* <Image src={product.poster.url} layout='responsive' height={product.poster.height} width={product.poster.width}/> */}
                    <img src={product?.poster.url} alt={product.title} />
                    <h2>{product.title}</h2>
                    </a>
                </Link>
            </div>
            <div className="product__LowBar">
                <p>${product.price}</p>

                <div className="actions">
                    <Button icon className="addCart" type="button" onClick={ () => console.log('add Cart')}>
                        <Icon name='cart plus' />
                    </Button>

                    {favorite ? (
                        <Button icon className="removeFavorite" type="button" onClick={ () => removeFromFavorites(product.id)} >
                            <Icon name='remove circle' />
                        </Button>   
                    ) : null}
            
                </div>
            </div>
        </div>
    );
}
export default Product;