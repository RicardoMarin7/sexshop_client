import React, { useState, useEffect } from 'react'
import { Table, Image, Icon, Button, Tab} from 'semantic-ui-react'
import { map, size} from 'lodash'
import { getProductBySlug } from '../../../api/product'
import BasicLayout from '../../../layouts/BasicLayout'
import AddressShiping from '../AddressShiping'
import Payment from '../Payment'
import Link from 'next/link'

const FullCart = ({products, removeProductCart, changeCartProductQuantity}) => {
    const [productsData, setProductsData] = useState();
    const [total, setTotal] = useState(0)
    const [address, setAddress] = useState(null);
    
    const removeProduct = (slug, productSize) =>{
        removeProductCart(slug, productSize)
        const cartTemp = []
        let totalTemp = 0
        
        for(let i = 0; i < productsData.length; i++){
            if(productsData[i].slug !== slug){
                cartTemp.push(productsData[i])
                totalTemp = totalTemp + productsData[i].price * productsData[i].quantity
            }else if(productsData[i].size !== productSize){
                cartTemp.push(productsData[i])
                totalTemp = totalTemp + productsData[i].price * productsData[i].quantity
            }
        }
        setProductsData(cartTemp)
        setTotal(totalTemp)
    }

    useEffect(() => {
        (async () =>  {
            let totalTemp = 0
            const productsTemp = []
            for await (const product of products){
                const data = await getProductBySlug(product.product)
                data = {
                    ...data,
                    quantity: product.quantity,
                    size: product.size
                }
                productsTemp.push(data)
                totalTemp = totalTemp + product.quantity * data.price
            }
            setTotal(totalTemp)
            setProductsData(productsTemp)
        })()
    }, [])

    const handleQuantityChange = (product, quantity) =>{
        const productsTemp = []
        let totalTemp = 0
        
        for(let i = 0; i < productsData.length; i++){
            
            if(productsData[i].slug !== product.slug){
                productsTemp.push(productsData[i])
                if(productsTemp[i].quantity){
                    totalTemp += productsData[i].price * parseInt(productsData[i].quantity)
                }else{
                    totalTemp += 0
                }
            }else{
                if(quantity){
                    productsTemp.push({...product, quantity:parseInt(quantity)})
                    changeCartProductQuantity(product, parseInt(quantity))
                    totalTemp += productsData[i].price * parseInt(quantity)
                }
                else{
                    productsTemp.push({...product, quantity:quantity})
                    changeCartProductQuantity(product,quantity)
                    totalTemp += 0
                }
            }
        }
        setTotal(totalTemp)
        setProductsData(productsTemp)
    }

    return (
        <BasicLayout>
            <div className="FullCart">
                <Table striped className="FullCart__table">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='3'>
                                <h1 className="FullCart__title">Shopping Cart</h1>
                            </Table.HeaderCell>
                            <Table.HeaderCell colSpan='1'>
                                <p className="FullCart__counter">{size(productsData)} items</p>
                            </Table.HeaderCell>

                            <Table.HeaderCell colSpan='2'>
                                <p className="FullCart__counter">Subtotal</p>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body className="FullCart__body">
                        {map(productsData, product =>(
                            <Table.Row key={`${product.id}_${product.size}`}>
                                <Table.Cell className="FullCart__row_img" width='2'>
                                    <Image src={product.poster.formats.thumbnail.url}/>
                                </Table.Cell>
                                <Table.Cell width="9">
                                    <Link href={`/products/${product.slug}`}>
                                        <a>
                                            <h3 className="FullCart__row_title">{product.title}</h3>
                                        </a>
                                    </Link>
                                    <p className="FullCart__row_size">{product.size}</p>
                                    <p className="FullCart__row_description">{product.category.title}</p>
                                </Table.Cell>

                                <Table.Cell width="1">
                                    <h3 className="FullCart__row_price">${product.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h3>
                                </Table.Cell>
                                
                                <Table.Cell width="2">
                                    <div className="FullCart__row_quantity">
                                        <input type="number" value={product.quantity} name="quantity" id="quantity" onChange={ (data) => handleQuantityChange(product, data.target.value)} />
                                        <div className="FullCart__row_arrows">
                                            <Button icon>
                                                <Icon name='arrow up' />
                                            </Button>
                                            <Button icon>
                                                <Icon name='arrow down' />
                                            </Button>
                                        </div>
                                    </div>
                                </Table.Cell>
                                
                                <Table.Cell width="1">
                                    <h3 className="FullCart__row_price">${product.quantity ? (product.price * product.quantity).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : 0}</h3>
                                </Table.Cell>
                                
                                <Table.Cell width="1">
                                    <Button icon className="FullCart__row_delete" onClick={ () => removeProduct(product.slug, product.size)}>
                                        <Icon name='close' />
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                    <Table.Footer fullWidth>
                            <Table.Row>
                                <Table.HeaderCell />
                                <Table.HeaderCell />
                                <Table.HeaderCell />
                                <Table.HeaderCell>
                                    <h3 className="FullCart__row_price">Total:</h3>
                                </Table.HeaderCell>
                                <Table.HeaderCell colSpan="4">
                                    <h3 className="FullCart__row_price">${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h3>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                </Table>

                <AddressShiping setAddress={setAddress} />

                {address && <Payment products={productsData} address={address}/> }
            </div>
        </BasicLayout>
    );
}

export default FullCart