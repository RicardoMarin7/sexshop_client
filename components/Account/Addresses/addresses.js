import React, { useEffect, useState } from 'react'
import { useFormik, yupToFormErrors } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { Form, Button } from 'semantic-ui-react'
import useAuth from '../../../hooks/useAuth'
import { createAddressApi, updateAddressApi } from '../../../api/address'
import AddressList from '../AddressList'

const Addresses = () => {
    const [ loading, setLoading ] = useState(false)
    const { auth, logout } = useAuth()
    const [reloadAddresses, setReloadAddresses] = useState(false)
    const [ editAddress, setEditAddress ] = useState(null)

    useEffect(() => {
        if(editAddress){
            const addressTemp = {
                title: editAddress.title,
                name: editAddress.name,
                address: editAddress.address,
                city: editAddress.city,
                state: editAddress.state,
                zipcode: editAddress.zipcode,
                phone: editAddress.phone
            }
            formik.setValues(addressTemp)
        }
    }, [editAddress]);

    const createAddress = async (formData) =>{
        setLoading(true)
        const formDataTemp = {
            ...formData,
            user: auth.idUser,
        }
        const response = await createAddressApi(formDataTemp, logout)
        console.log(response)

        if(!response.user){
            toast.error('Error al crear la dirección')
            setLoading(false)
        }
        else{
            toast.success('Address created successfully')
            formik.resetForm()
            setReloadAddresses(true)
            setLoading(false)
        }
    }
    
    const updateAddress = async (formData) =>{
        setLoading(true)
        const formDataTemp = {
            ...formData,
            user: auth.idUser,
        }

        const response = await updateAddressApi(editAddress._id,formDataTemp, logout)         
        if(!response.user){
            toast.error('Internal Server Error')
            setLoading(false)
        }
        else{
            toast.success('Address updated successfully')
            formik.resetForm()
            setReloadAddresses(true)
            setLoading(false)
            setEditAddress(null)
        }
    }

    const formik = useFormik(
        {
            initialValues: initialValues(),
            validationSchema:Yup.object(validationSchema()),
            onSubmit: (formData,actions) => {
                if(editAddress){
                    updateAddress(formData)
                }
                else{
                    createAddress(formData)
                }
            }
        })

    return (
        <div className="Addresses">
            <Form className="Addresses_newForm"
                onSubmit={formik.handleSubmit}
            >
                <h2 className="Addresses__title">{editAddress ? `Edit Address: ${editAddress.title}` : 'Create New Address'}</h2>
                <Form.Input
                    label="Name of the address"
                    name="title"
                    type="text"
                    placeholder="Address Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.errors.title}
                    />
                
                <Form.Group
                    widths="equal"
                >
                    <Form.Input 
                        label="Name and Last Name"
                        name="name"
                        type="name"
                        placeholder="Name and Last Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.errors.name}
                    />

                    <Form.Input 
                        label="Address"
                        name="address"
                        type="text"
                        placeholder="Address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.errors.address}
                    />
                </Form.Group>

                <Form.Group
                    widths="equal"
                >
                    <Form.Input 
                        label="City"
                        name="city"
                        type="text"
                        placeholder="City"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        error={formik.errors.city}
                    />

                    <Form.Input 
                        label="State"
                        name="state"
                        type="text"
                        placeholder="State"
                        value={formik.values.state}
                        onChange={formik.handleChange}
                        error={formik.errors.state}
                    />
                </Form.Group>

                <Form.Group
                    widths="equal"
                >
                    <Form.Input
                        label="Zip Code"
                        name="zipcode"
                        type="text"
                        placeholder="Zip Code"
                        value={formik.values.zipcode}
                        onChange={formik.handleChange}
                        error={formik.errors.zipcode}
                    />

                    <Form.Input 
                        label="Phone"
                        name="phone"
                        type="text"
                        placeholder="Phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        error={formik.errors.phone}
                    />
                </Form.Group>

                <Button
                    type="submit"
                    loading={loading}
                    className="Addresses__button"
                >
                    { editAddress ? 'Update Address' : 'Create New Address'}
                </Button>

            </Form>

            <div className="Addresses__list">
                <h2>Your Addresses</h2>
                <AddressList setReloadAddresses={setReloadAddresses} reloadAddresses={reloadAddresses} setEditAddress={setEditAddress}/>
            </div>
        </div>
     );
}

const validationSchema = () =>(
    {
        title:Yup.string().required('The address needs a name'),
        name: Yup.string().required('Your name and last name are required'),
        address: Yup.string().required('The address is required'),
        city: Yup.string().required('The city is required'),
        state: Yup.string().required('The State is required'),
        zipcode: Yup.number('The zipcode needs to be a number').required('The Zip Code is required'),
        phone: Yup.number('The phone needs to be a number').required('The phone is required')
    }
)

const initialValues = () =>{    
    return {
        title:'',
        name:'',
        address:'',
        city:'',
        state:'',
        zipcode:'',
        phone:'',
    }
}
 
export default Addresses;

