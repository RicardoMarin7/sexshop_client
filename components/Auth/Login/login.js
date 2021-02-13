import { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { loginAPI } from '../../../api/user'
import useAuth from '../../../hooks/useAuth'
import { toast } from 'react-toastify'


const Login = () => {
    const router = useRouter()
    const { login, auth } = useAuth()

    const formik = useFormik(
        {
            initialValues: initialValues(),
            validationSchema:Yup.object(validationSchema()),
            onSubmit: async (formData) => {
                setLoading(true)
                const response = await loginAPI(formData)      
                if(response?.jwt){
                    login(response.jwt)
                    toast.success('Inicio de sesión éxitoso')
                    router.push('/')
                }else{
                    toast.error('El email o la contraseña es incorrecto')
                }
                setLoading(false)
            } 
        })
    const [ loading, setLoading ] = useState(false)


    return ( 
        <div className="Login">
            
            <Form className="Login__form" onSubmit={formik.handleSubmit}>
                {/* <img src="/icono_light.svg" alt="Icono de Ecommerce Nahual" className="Login__logo"/> */}
                
                <h1>Iniciar Sesión</h1>

                <Form.Input 
                    name="identifier"
                    type="text"
                    placeholder="Email"
                    autoComplete="email"
                    onChange={formik.handleChange}
                    error={formik.errors.identifier}
                />

                <Form.Input 
                    name="password"
                    autoComplete="current-password"
                    type="password"
                    placeholder="Contraseña"
                    onChange={formik.handleChange}
                    error={formik.errors.password}
                    />


                <div className="Login__button__container">
                    <Button className="Login__button" type="submit" loading={loading}>
                        Iniciar Sesión
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
                    <Link href="/resetpassword">
                        <a>
                            He olvidado mi contraseña
                        </a>
                    </Link>
                </p>
            </Form>
        </div>
    )
}

const validationSchema = () =>(
    {
        identifier: Yup.string().email("Debe ser un email válido").required('Tu email es necesario'),
        password: Yup.string().required('Tu contraseña es obligatoria')
    }
)

const initialValues = () =>(
    {
        identifier:"",
        password:""
    }
)

export default Login;