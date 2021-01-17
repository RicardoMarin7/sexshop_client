import React, { useEffect, useState } from 'react'
import { getAddressesApi, deleteAddressessApi } from '../../../api/address'
import useAuth from '../../../hooks/useAuth'
import { Grid, Button } from 'semantic-ui-react'
import { map, size } from 'lodash'
import { toast } from 'react-toastify'

const AddressList = ({setReloadAddresses, reloadAddresses, setEditAddress}) => {
    const [addresses, setAddresses] = useState(null)
    const { auth, logout } = useAuth()
    

    useEffect(() => {
        (async () =>{
            const response = await getAddressesApi(auth.idUser, logout)
            setAddresses(response || [])
            setReloadAddresses(false)
        })()
    }, [reloadAddresses]);

    if(!addresses) return null

    return (
        <div className="AddressList__list">
            {size(addresses) === 0 ? (
                <h2> You don't have any addresses</h2>
            ) : (
                <Grid>
                    {map(addresses, (address) =>(
                        <Grid.Column 
                            key={address.id}
                            mobile={16}
                            tablet={8}
                            computer={4}
                        >
                            <Address address={address} logout={logout} setReloadAddresses={setReloadAddresses} setEditAddress={setEditAddress}/>
                        </Grid.Column>
                    ))}
                </Grid>
            )}
        </div>
    );
}

const Address = ({address, logout, setReloadAddresses, setEditAddress}) =>{
    const [loadingDelete, setLoadingDelete ] = useState(false)
    
    const deleteAddress = async () =>{
        setLoadingDelete(true)
        const response = await deleteAddressessApi(address._id, logout)
        if(response){
            setReloadAddresses(true)
            toast.success('Address deleted successfully')
            setLoadingDelete(false)
        }else{
            toast.error('Internal Server Error')
            setLoadingDelete(false)
        }

    }

    return(
        <div className="AddressList__address">
            <h3>{address.title}</h3>
            <p>{address.name}</p>
            <p>{address.address}</p>
            <p>{address.city}, {address.zipcode}, {address.state}</p>
            <p>{address.phone}</p>

            <div className="AdressList__actions">
                <Button 
                    primary
                    onClick={() => setEditAddress(address)}
                >Edit</Button>
                <Button
                    loading={loadingDelete}
                    onClick={deleteAddress}
                >Delete</Button>
            </div>
        </div>
    )
}

export default AddressList;