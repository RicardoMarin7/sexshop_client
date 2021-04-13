import { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { loginAPI } from '../../../api/user'
import useAuth from '../../../hooks/useAuth'
import { toast } from 'react-toastify'
import useHomeConfig from '../../../hooks/useHomeConfig'


const Login = () => {
    const router = useRouter()
    const { login, auth } = useAuth()
    const { homeConfig } = useHomeConfig()
    const Logo = homeConfig?.logo.formats.large.url
    const formik = useFormik(
        {
            initialValues: initialValues(),
            validationSchema:Yup.object(validationSchema()),
            onSubmit: async (formData) => {
                setLoading(true)
                const response = await loginAPI(formData)      
                if(response?.jwt){
                    login(response.jwt)
                    toast.success('Successful Login')
                    router.push('/')
                }else{
                    toast.error('Email or password are incorrect')
                }
                setLoading(false)
            } 
        })
    const [ loading, setLoading ] = useState(false)


    return ( 
        <div className="Login">
            <Form className="Login__form" onSubmit={formik.handleSubmit}>
                {Logo ? <img src={Logo} alt="Logo Vares Bros" className="Login__logo"/> : null}
                
                <h1>Log In</h1>

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
                        Log in
                    </Button>
                </div>

                <p>
                    You do not have an account?&nbsp;  
                    <Link href="/register">
                        <a>
                            Create a new account
                        </a>
                    </Link>
                </p>
                <p>
                    <Link href="/forgotpassword">
                        <a>
                            I forgot my password
                        </a>
                    </Link>
                </p>
            </Form>
        </div>
    )
}

const validationSchema = () =>(
    {
        identifier: Yup.string().email("it must be a valid email").required('Your email is required'),
        password: Yup.string().required('Your password is required')
    }
)

const initialValues = () =>(
    {
        identifier:"",
        password:""
    }
)

export default Login;