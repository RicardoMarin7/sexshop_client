import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { STRIPE_TOKEN } from '../../../utils/constants'
import PaymentForm from './PaymentForm'
import { Table } from 'semantic-ui-react'

const stripePromise = loadStripe(STRIPE_TOKEN,{locale:'en'})

const Payment = ( { products,address, subTotal, total, shippingCost, shippingType } ) => {
    return (
        <div className="Payment">
            <h2 className="Payment__title">Payment</h2>
            <p className="Payment__subtitle">Complete your payment information</p>

            <div className="Payment__details">
                <div className="Payment__form">
                    <Elements stripe={stripePromise}>
                        <PaymentForm 
                            products={products}
                            address={address}
                            shippingCost={shippingCost}
                            shippingType={shippingType}
                        />
                    </Elements>
                </div>

                <div className="Payment__summary">
                    <Table basic='very'>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Cart Summary</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>Subtotal</Table.Cell>
                                <Table.Cell>${subTotal}</Table.Cell>
                            </Table.Row>
                            
                            <Table.Row>
                                <Table.Cell>Shipping</Table.Cell>
                                <Table.Cell>${shippingCost}</Table.Cell>
                            </Table.Row>
                            
                            <Table.Row>
                                <Table.Cell>Total</Table.Cell>
                                <Table.Cell>${total}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>

            </div>
        </div>
    );
}
 
export default Payment;