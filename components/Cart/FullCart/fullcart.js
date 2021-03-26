import React, { useState, useEffect } from 'react'
import { Table, Image, Icon, Button, Tab} from 'semantic-ui-react'
import { map, size, find, subtract} from 'lodash'
import { getProductBySlug } from '../../../api/product'
import BasicLayout from '../../../layouts/BasicLayout'
import AddressShiping from '../AddressShiping'
import Payment from '../Payment'
import Shipping from '../Shipping'
import Link from 'next/link'
import { toast } from 'react-toastify'

const FullCart = ({products, removeProductCart, changeCartProductQuantity}) => {
    const [productsData, setProductsData] = useState();
    const [subTotal, setSubTotal] = useState(0)
    const [totalSize, setTotalSize] = useState(0)
    const [totalWeight, setTotalWeight] = useState(0);
    const [address, setAddress] = useState(null);
    const [shippment, setShippment] = useState(null);
    const [disabledFirstClass, setdisabledFirstClass] = useState(false);
    const [total, setTotal] = useState(0);
    const [shippingCost, setShippingCost] = useState(0);

    useEffect(() => {
        (async () =>  {
            let totalTemp = 0
            let sizeTemp = 0
            let weightTemp = 0
            let productSize

            const productsTemp = []
            for await (const product of products){
                const data = await getProductBySlug(product.product)
                data = {
                    ...data,
                    quantity: product.quantity,
                    size: product.size
                }
                productsTemp.push(data)
                totalTemp += product.quantity * data.price
                productSize = find(data.sizes, {size: product.size})
                sizeTemp += (productSize.productWidth * productSize.productLength * productSize.productHeight) * product.quantity
                weightTemp += product.quantity * find(data.sizes, {size: product.size}).weight
            }

            setTotalSize(sizeTemp)
            setTotalWeight(weightTemp)
            setSubTotal(totalTemp)
            setProductsData(productsTemp)

        })()
    }, [])

    useEffect( () =>{
        if(totalWeight > 15){
            setdisabledFirstClass(true)
        }
    },[totalWeight])

    useEffect(() => {
        setTotal(subTotal+shippingCost)
    }, [subTotal, shippingCost]);

    const removeProduct = (slug, productSize) =>{
        removeProductCart(slug, productSize)
        const cartTemp = []

        
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
        setSubTotal(totalTemp)
    }

    const handleQuantityChange = (product, quantity, size) =>{
        const sizeStock = find( product.sizes, { size: size})

        quantity += ''
        quantity = quantity.replace(/[^1-9]/,'')
        if(quantity > sizeStock.stock){
            toast.error('Insufficient Stock')
            return
        }



        const productsTemp = []
        let totalTemp = 0, weightTemp = 0, sizeTemp = 0, productSize
        
        for(let i = 0; i < productsData.length; i++){
            if(productsData[i].slug !== product.slug){
                productsTemp.push(productsData[i])
                if(productsTemp[i].quantity){
                    totalTemp += productsData[i].price * parseInt(productsData[i].quantity)
                    productSize = find(productsData[i].sizes, {size:productsData[i].size}) 
                    sizeTemp += (productSize.productHeight * productSize.productLength * productSize.productWidth) * productsData[i].quantity
                    weightTemp += find(productsData[i].sizes, {size:productsData[i].size}).weight * productsTemp[i].quantity
                }
            }
            else if(productsData[i].size !== size){
                productsTemp.push(productsData[i])
                if(productsTemp[i].quantity){
                    totalTemp += productsData[i].price * parseInt(productsData[i].quantity)
                    productSize = find(productsData[i].sizes, {size:productsData[i].size}) 
                    sizeTemp += (productSize.productHeight * productSize.productLength * productSize.productWidth) * productsData[i].quantity
                    weightTemp += find(productsData[i].sizes, {size: productsData[i].size}).weight * productsTemp[i].quantity
                }
            }
            else{
                if(quantity){
                    productsTemp.push({...product, quantity:parseInt(quantity), size: size})
                    changeCartProductQuantity(product, parseInt(quantity), sizeStock)
                    totalTemp += productsData[i].price * parseInt(quantity)
                    weightTemp += find(productsData[i].sizes, {size: size})?.weight * productsTemp[i].quantity
                    productSize = find(productsData[i].sizes, {size: size}) 
                    sizeTemp += (productSize.productHeight * productSize.productLength * productSize.productWidth) * quantity
                }
                else{
                    productsTemp.push({...product, quantity:quantity, size:size})
                    changeCartProductQuantity(product,quantity, sizeStock)
                }
            }
        }

        setTotalSize(sizeTemp)
        setTotalWeight(weightTemp)
        setSubTotal(totalTemp)
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
                                    <p className="FullCart__row_size">{product.size} <span>{find(product.sizes, {size:product.size})?.stock} in Stock</span></p>
                                    <p className="FullCart__row_description">{product.category.title}</p>
                                </Table.Cell>

                                <Table.Cell width="1">
                                    <h3 className="FullCart__row_price">${product.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h3>
                                </Table.Cell>
                                
                                <Table.Cell width="2">
                                    <div className="FullCart__row_quantity">
                                        <input type="number" value={product.quantity} name="quantity" id="quantity" onChange={ (data) => handleQuantityChange(product, data.target.value, product.size)} />
                                        <div className="FullCart__row_arrows">
                                            <Button icon>
                                                <Icon name='arrow up' onClick={ product?.quantity && product.quantity > 0 ? () => handleQuantityChange(product, parseInt(product.quantity + 1), product.size) : null}/>
                                            </Button>
                                            <Button icon>
                                                <Icon name='arrow down' onClick={ product?.quantity && product.quantity > 1 ? () => handleQuantityChange(product, parseInt(product.quantity - 1), product.size) : null} />
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
                                    <h3 className="FullCart__row_price">${subTotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h3>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                </Table>

                <AddressShiping setAddress={setAddress} />
                {address && <Shipping 
                                setShippment={setShippment} 
                                shippment={shippment} 
                                disableFirstClass={disabledFirstClass}
                                totalSize={totalSize}
                                totalWeight={totalWeight}
                                address={address}
                                shippingCost={shippingCost}
                                setShippingCost={setShippingCost}
                                subTotal={subTotal}
                            />}

                { shippment && shippingCost !== null ? (<Payment 
                                    products={productsData} 
                                    address={address}
                                    subTotal={subTotal}
                                    shippingCost={shippingCost}
                                    shippingType={shippment}
                                    total={total}
                                />) : null }
            </div>
        </BasicLayout>
    );
}

export default FullCart