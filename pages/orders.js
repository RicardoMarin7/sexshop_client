import React, { useState, useEffect } from 'react'
import BasicLayout from '../layouts/BasicLayout'
import useAuth from '../hooks/useAuth'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { getOrdersApi } from '../api/order'
import { map, size, find} from 'lodash'
import EmptyPage from '../components/EmptyPage'
import { Grid, Image, Icon, Label, Item } from 'semantic-ui-react'
import Link from 'next/link'


const Orders = () => {
    const { auth, logout } = useAuth()
    const [orders, setOrders] = useState(null);
    const router = useRouter()

    if(!auth){
        toast.error('You need to log in to see your orders')
        router.push('/')
    }
    
    useEffect(() => {
        (async () =>{
            const response = await getOrdersApi(auth.idUser, logout)
            setOrders(response)
        })()
    }, []);

    const productDetails = (products, productDetails) =>{
        const productsTemp = []
        for(const productDetail of productDetails){
            const temp = find(products, product => product.slug === productDetail.slug)
            temp = {
                ...temp,
                quantity: productDetail.quantity,
                size: productDetail.size
            }
            productsTemp.push(temp)
        }
        console.log(productsTemp)
        return productsTemp
    }

    return (
        <BasicLayout>
            <div className="Orders">
                <h1 className="Orders__title">My Orders</h1>
                <div className="Orders__data">
                    {size(orders) === 0 ? (
                        <EmptyPage 
                            title={`You don't have any orders yet`}
                            subtitle='Go complete one order to see it here'
                            buttonTitle='Go shop'
                        />
                    ) : (
                        <OrderList orders={orders} productDetails={productDetails}/>
                    )}
                </div>
            </div>
        </BasicLayout>
    );
}

const OrderList = ({orders,productDetails}) =>{
    console.log(orders)
    return(
        <Grid>
            {map(orders, order =>(
                <Grid.Row className='Orders__order' key={order.id}>
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                        <p className="Orders__id">Order ID: {order.id}</p>
                        {map(productDetails(order.products, order.productDetails), product =>(     
                            <div className="Orders__product" key={`${product.id}_${product.size}`}>
                                <Link href={`/products/${product.slug}`}>
                                    <a>
                                        <Image src={product?.poster?.formats?.thumbnail.url} className='Orders__product__image' size='tiny'/>
                                    </a>
                                </Link>
                                
                                <div className="Orders__product_details">
                                    <h2>{product.title}</h2>
                                    <p>{product.size}</p>
                                    <p>${product.quantity * product.price} x {product.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </Grid.Column>

                    {/* <Grid.Column mobile={16} tablet={8} computer={8}>
                        <Label name='address'>
                            <Icon name='User' />
                            {order?.addressShiping && (
                                    `${order?.addressShiping.name}`
                            )}
                            <Icon name='point' />
                            {order?.addressShiping && (
                                    `${order?.addressShiping.address}, ${order?.addressShiping.city} Zip(${order?.addressShiping.zipcode}), ${order?.addressShiping?.state},`
                            )}
                        </Label>
                    </Grid.Column> */}
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                        <Item.Group>
                            <Item>
                                <Item.Content>
                                    <Item.Header> 
                                        <Icon name='user' />
                                        {order?.addressShiping && (
                                            `${order?.addressShiping.name}`
                                        )}
                                    </Item.Header>
                                    <Item.Meta>Address</Item.Meta>
                                    <Item.Description>
                                        <Icon name='point' />
                                        {order?.addressShiping && (
                                                `${order?.addressShiping.address}, ${order?.addressShiping.city} (${order?.addressShiping.zipcode}), ${order?.addressShiping?.state}`
                                        )}
                                    </Item.Description>
                                    <Item.Extra>
                                        <Icon name='phone' />
                                        {order?.addressShiping && (
                                            `${order?.addressShiping.phone}`
                                        )}
                                    </Item.Extra>
                                </Item.Content>
                            </Item>

                            <Item>
                                <Item.Content>
                                    <Item.Header> 
                                        <Icon name='mail' />
                                         Shipping
                                    </Item.Header>
                                    <Item.Meta>Status</Item.Meta>
                                    <Item.Description>
                                        <Icon name='point' />
                                        {!order.fulfilled ? ('To be shipped') : ('Shipped')}
                                    </Item.Description>
                                    {!order.fulfilled ? null :(
                                        <Item.Extra>
                                        <Icon name='truck' />
                                        Tracking Code: {order?.trackingCode}
                                        </Item.Extra>
                                    )
                                    }
                                    

                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Grid.Column>
                </Grid.Row>
            ))}
        </Grid>
    )
}

export default Orders;
