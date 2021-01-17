import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { Form, Button } from 'semantic-ui-react'
import { updatePassword } from '../../../api/user'

const ChangePassword = ({user, logout}) => {
    const [ loading, setLoading ] = useState(false)

    const formik = useFormik(
        {
            initialValues: initialValues(),
            validationSchema:Yup.object(validationSchema()),
            onSubmit:
            async (formData) => {
                setLoading(true)
                const response = await updatePassword(user.id, formData.password, logout)                
                if(response){
                    toast.success('Actualización de contraseña exitosa, vuelva a iniciar sesión')
                    logout()
                    setLoading(false)
                }else{
                    toast.error('Error al actualizar la contraseña')
                }
                setLoading(false)
            } 
        })
    
    return(
        <div className="ChangePassword">
            <Form className="ChangePassword__form" onSubmit={formik.handleSubmit}>
                {/* <img src="/icono_light.svg" alt="Icono de Ecommerce Nahual" className="Register__logo"/> */}
                
                <h1>Change Your Password</h1>

                <Form.Input 
                    name="password"
                    type="password"
                    placeholder="New Password"
                    onChange={formik.handleChange}
                    error={formik.errors.password}
                    />

                <Form.Input 
                    name="confirm"
                    type="password"
                    placeholder="Confirm New Password"
                    onChange={formik.handleChange}
                    error={formik.errors.confirm}
                />

                <div className="ChangePassword__button__container">
                    <Button className="ChangePassword__button" type="submit" loading={loading}>
                        Change Password
                    </Button>
                </div>
            </Form>

        </div>
    )
    
}

const validationSchema = () =>(
    {
        password: Yup.string().required('Tu contraseña es obligatoria'),
        confirm: Yup.string().oneOf([Yup.ref('password'),null] , 'Las contraseñas deben coincidir')
    }
)

const initialValues = () =>(
    {
        password:"",
        confirm:""
    }
)
export default ChangePassword;