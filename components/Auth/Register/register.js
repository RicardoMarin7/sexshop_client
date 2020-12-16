import { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { registerAPI } from '../../../api/user'

const Register = () => {
    const router = useRouter()
    const formik = useFormik(
        {
            initialValues: initialValues(),
            validationSchema:Yup.object(validationSchema()),
            onSubmit: async (formData) => {
                setLoading(true)
                const response = await registerAPI(formData)                
                if(response?.jwt){
                    toast.success('Registro éxitoso')
                    router.push('/login')
                }else{
                    toast.error('Error al registrar al usuario')
                }
                setLoading(false)
            } 
        })

    const [ loading, setLoading ] = useState(false)
    return (
        <div className="Register">
            
            <Form className="Register__form" onSubmit={formik.handleSubmit}>
                {/* <img src="/icono_light.svg" alt="Icono de Ecommerce Nahual" className="Register__logo"/> */}
                
                <h1>CREA TU NUEVA CUENTA</h1>
                
                <Form.Input 
                    name="name"
                    type="text"
                    placeholder="Nombre"
                    onChange={formik.handleChange}
                    error={formik.errors.name}
                />


                <Form.Input 
                    name="lastname"
                    type="text"
                    placeholder="Apellidos"
                    onChange={formik.handleChange}
                    error={formik.errors.lastname}
                />

                <Form.Input 
                    name="email"
                    type="text"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    error={formik.errors.email}
                />

                <Form.Input 
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    onChange={formik.handleChange}
                    error={formik.errors.password}
                    />

                <Form.Input 
                    name="confirm"
                    type="password"
                    placeholder="Confirmar contraseña"
                    onChange={formik.handleChange}
                    error={formik.errors.confirm}
                />

                <div className="Register__button__container">
                    <Button className="Register__button" type="submit" loading={loading}>
                        Crear Cuenta
                    </Button>
                </div>

                <p>
                    ¿Ya tienes cuenta?&nbsp;  
                    <Link href="/login">
                        <a>
                            Inicia sesión
                        </a>
                    </Link>
                </p>
            </Form>
        </div>
    )
}

const validationSchema = () =>(
    {
        name: Yup.string().required('El nombre es necesario'),
        lastname: Yup.string().required('Tu apellido es necesario '),
        email: Yup.string().email('Debe ser un email válido').required('Tu email es necesario'),
        password: Yup.string().required('Tu contraseña es obligatoria'),
        confirm: Yup.string().oneOf([Yup.ref('password'),null] , 'Las contraseñas deben coincidir')
    }
)

const initialValues = () =>(
    {
        name:"",
        lastname:"",
        email:"",
        password:"",
        confirm:""
    }
)

export default Register;