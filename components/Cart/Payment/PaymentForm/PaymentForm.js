import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { toast } from 'react-toastify'
import { size } from 'lodash'
import { paymentCartApi } from '../../../../api/cart'
import useAuth from '../../../../hooks/useAuth'
import useCart from '../../../../hooks/useCart'


const PaymentForm = ({ products, address }) => {

  const { removerAllProductsCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const stripe = useStripe()
  const elements = useElements()
  const { auth , logout } = useAuth()

    const elementStyles = {
        iconStyle: 'solid',
        hidePostalCode: true,
        style: {
          base: {
            iconColor: '#2e3454',
            color: '#2e3454',
            fontWeight: 500,
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
    
            ':-webkit-autofill': {
              color: '#fce883',
            },
            '::placeholder': {
              color: '#2e3454ab',
            },
          },
          invalid: {
            iconColor: '#9998b2',
            color: '#9998b2',
          },
        },
      }

    const handleSubmit = async e =>{
        e.preventDefault()
        setLoading(true)
        
        if(!stripe || !elements) return

        const cardElement = elements.getElement(CardElement)
        const result = await stripe.createToken(cardElement)
        if(result.error){
          toast.error(result.error.message)
        }else{
          const response = await paymentCartApi(
            result.token,
            products,
            auth.idUser,
            address,
            logout
          )

          if(size(response) > 0){
            toast.success("Order completed")
            removerAllProductsCart()
            router.push('/orders')
          }else{
            toast.error("Error when ordering")
          }
        }

        setLoading(false)
        
    }

    return (
        <form className="PaymentForm" onSubmit={handleSubmit}>
          <fieldset>
            <legend className="PaymentForm__card-only">Pay with card</legend>
            <legend className="payment-request-available">Or enter card details</legend>
            <div className="PaymentForm__container">
              <CardElement
                options={elementStyles}
              />
              <Button type="submit" loading={loading} disabled={!stripe}>
                  Pay
              </Button>
            </div>
          </fieldset>
        </form>
    );
}

export default PaymentForm;