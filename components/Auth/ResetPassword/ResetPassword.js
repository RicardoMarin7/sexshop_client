import { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { resetPasswordAPI } from '../../../api/user'

const ResetPassword = () => {
    const [ loading, setLoading ] = useState(false)

    const formik = useFormik(
        {
            initialValues: initialValues(),
            validationSchema:Yup.object(validationSchema()),
            onSubmit: async (formData) => {
                setLoading(true)
                console.log(formData.identifier)
                const response = await resetPasswordAPI(formData.identifier)      
                setLoading(false)
            } 
        })

    return (
        <div className="Reset">
            <Form className="Reset__form" onSubmit={formik.handleSubmit}>
                {/* <img src="/icono_light.svg" alt="Icono de Ecommerce Nahual" className="Login__logo"/> */}
                
                <h1>Recuperar Contraseña</h1>

                <Form.Input 
                    name="identifier"
                    type="text"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    error={formik.errors.identifier}
                />

                <div className="Reset__button__container">
                    <Button className="Reset__button" type="submit" loading={loading}>
                        Recuperar
                    </Button>
                </div>

                <p>
                    ¿No tienes cuenta?&nbsp;  
                    <Link href="/register">
                        <a>
                            Crear una nueva cuenta
                        </a>
                    </Link>
                </p>
                <p>
                    <Link href="/login">
                        <a>
                            Iniciar Sesión
                        </a>
                    </Link>
                </p>
            </Form>
        </div>
    );
}


const validationSchema = () =>(
    {
        identifier: Yup.string().email("Debe ser un email válido").required('Tu email es necesario'),
    }
)

const initialValues = () =>(
    {
        identifier:"",
    }
)
 
export default ResetPassword;