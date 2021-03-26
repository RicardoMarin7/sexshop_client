import React, { useEffect, useState } from 'react';
import { Radio } from 'semantic-ui-react'
import { animateScroll as Scroll } from 'react-scroll'
import { Grid } from 'semantic-ui-react'
import { calculateNationalShippingCost, calculateInternationalShippingCost } from '../../../api/shippingUSPS'

const Shipping = (props) => {
    const {shippment, 
            setShippment,
            disableFirstClass,
            totalSize,
            totalWeight,
            address,
            shippingCost,
            setShippingCost,
            subTotal
        } = props

    
    
    const handleChange = (shippmentType) =>{
        setShippment(shippmentType)
        Scroll.scrollToBottom({
            smooth:'easeInQuad',
            delay:5
        })

    }

    const calculateShippingCost = async (totalSize, totalWeight, shippment, address,subTotal) => {
        if(address.country === 'United States'){
            const result = await calculateNationalShippingCost(address, shippment, totalSize, totalWeight)
            return result
        }else{
            const result = await calculateInternationalShippingCost(address, shippment, totalSize, totalWeight, subTotal)
            return result
        }
    }

    useEffect(() => {
        if(shippment){
            ( async () => {
                const ship = await calculateShippingCost(totalSize, totalWeight, shippment, address, subTotal)
                setShippingCost(ship)
            })()
        }
    }, [shippment, address, totalWeight]);

    useEffect(() => {
        if(disableFirstClass){
            setShippment('Priority')
        }
    }, [disableFirstClass]);

    return (
        <div className="Shipping">
            <h2 className="Shipping__title">Select Shipping</h2>
            <p className="Shipping__subtitle">Select a shippment type to see the price</p>
        <Grid>
            <Grid.Column mobile={16} tablet={8} computer={8} key={'options'} >
                <div className="Shipping__options">
                    <div className="Shipping__options_option">
                        <Radio
                            label='USPS First Class Shippment'
                            name='shippmentType'
                            value='First Class'
                            onChange={ () => handleChange('First Class')}
                            disabled={disableFirstClass ? true : false}
                            checked={ shippment === 'First Class'}
                        />
                        <span className={disableFirstClass ? 'disabled' : null}> (4-8 Days)</span>
                        {disableFirstClass ? <span> Not eligible because overweight</span> : null}
                        {!disableFirstClass && shippment === 'First Class' ? <span className="Shipping__price"> ${shippingCost}</span> : null}
                    </div>

                    <div className="Shipping__options_option">
                        <Radio
                            label='USPS Priority Express Shippment'
                            name='shippmentType'
                            value='Priority'
                            onChange={() => handleChange('Priority')}
                            checked={ shippment === 'Priority' || disableFirstClass === true}
                        />
                        <span> (2-3 Days)</span>
                        {shippment === 'Priority' ? <span className="Shipping__price"> ${shippingCost}</span> : null}
                    </div>
                </div>
            </Grid.Column>    
            {/* <Grid.Column mobile={16} tablet={8} computer={4} key={'cost'}>
                <p>Price</p>
                <p>${shippingCost}</p>
            </Grid.Column> */}
        </Grid>
            
        </div>
    );
}
export default Shipping;