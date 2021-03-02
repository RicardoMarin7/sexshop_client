import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { STRIPE_TOKEN } from '../../../utils/constants'
import PaymentForm from './PaymentForm'

const stripePromise = loadStripe(STRIPE_TOKEN,{locale:'en'})

const Payment = ( { products,address } ) => {
    return (
        <div className="Payment">
            <h2 className="Payment__title">Payment</h2>
            <p className="Payment__subtitle">Complete your payment information</p>
            <div className="Payment__data">
                <Elements stripe={stripePromise}>
                    <PaymentForm 
                        products={products}
                        address={address}
                    />
                </Elements>
            </div>
        </div>
    );
}
 
export default Payment;