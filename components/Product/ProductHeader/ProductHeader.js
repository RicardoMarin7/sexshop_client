import { set } from 'lodash';
import React, { useState } from 'react'
import { Grid, Image, Icon, Button } from 'semantic-ui-react'
import ProductCarousel from '../ProductCarousel'

const ProductHeader = ({product}) => {
    const [quantity, setQuantity] = useState(1);

    const onQuantityChange = e =>{
        if(isNaN(e.target.value) && e.target.value > 0) setQuantity(quantity)
        else if(quantity < 1) setQuantity(1)
        else setQuantity(e.target.value)
    }

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
                        <p>${product.price} <span>Tax Included</span></p>
                        <link itemProp="availability" href="https://schema.org/InStock"></link>
                        <meta itemProp="priceCurrency" content="USD"></meta>
                    </div>
                </Grid.Row>
                <Grid.Row>
                    <div className="ProductHeader__actions">
                        <input type="text" value={quantity} name="quantity" id="quantity" className="quantity" onChange={onQuantityChange}/>
                        <div className="ProductHeader__actions__verticalArrows">
                            <Button icon onClick={() => setQuantity(quantity+1)}>
                                <Icon name='arrow up' />
                            </Button>
                            <Button icon onClick={() => {quantity > 1 ? setQuantity(quantity-1) : null}}>
                                <Icon name='arrow down' />
                            </Button>
                        </div>
                        <Button icon labelPosition='left'>
                            <Icon name='shopping cart' />
                            Add to Cart
                        </Button>
                        <Button icon className="favorite" type="button">
                            <Icon name='heart outline' />
                        </Button>
                    </div>
                </Grid.Row>
            </Grid.Column>
        </Grid>
    );
}
 
export default ProductHeader;