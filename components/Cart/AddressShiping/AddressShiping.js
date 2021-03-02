import React, { useState, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import { map, size } from 'lodash'
import Link from 'next/link'
import classNames from "classnames"
import { getAddressesApi } from '../../../api/address'
import useAuth from '../../../hooks/useAuth'
import EmptyPage from '../../EmptyPage'
import { useRouter } from 'next/router'
import { validateAddressApi } from '../../../api/shippingUSPS'
import { toast } from 'react-toastify'


const AddressShiping = ({setAddress}) => {
    const [addresess, setAddresess] = useState(null);
    const [addressActive, setAddressActive] = useState(null);
    const {auth, logout} = useAuth()
    const router = useRouter()

    useEffect(() => {
        (async () =>{
            const response = await getAddressesApi(auth.idUser, logout)
            setAddresess(response || [])
            
        })()
    }, []);

    return (
        <div className="AddressShiping">
            <h2 className="AddressShiping__title">Your Addresses</h2>
            <p className="AddressShiping__subtitle">Click on your address to select it</p>
            <div className="AddressShiping__data">
                {size(addresess) === 0 ? (
                    <EmptyPage
                        title={'No addresses found'}
                        subtitle={`Seems like you don't have any addresses`}
                        buttonTitle={'Create Address'}
                        buttonOnClickFunction={() => router.push('/account?menu=addresses')}
                    />
                ):(
                    <Grid>
                        {map(addresess, (address) =>(
                            <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                                <Address 
                                    address={address} 
                                    addressActive={addressActive}
                                    setAddressActive={setAddressActive}
                                    setAddress={setAddress}
                                    />
                            </Grid.Column>
                        ))}
                    </Grid>
                )}
            </div>
        </div>
    )
}

const Address = ({address, addressActive, setAddressActive, setAddress}) => {

    const changeAddress= async () =>{
        setAddressActive(address._id)
        // const result = await validateAddressApi(address)
        // if(result){
            setAddress(address)
        // }else{
            // toast.error('Invalid Address')
        // }

    }

    return (
        <div className={classNames("AddressList__address",{
            active: addressActive === address._id
        })}
            onClick={changeAddress}
        >
            <h3>{address.title}</h3>
            <p>{address.name}</p>
            <p>{address.address}</p>
            <p>{address.city}, {address.zipcode}, {address.state}</p>
            <p>{address.phone}</p>
        </div>
    );
}
export default AddressShiping;