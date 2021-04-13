import { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { registerAPI } from '../../../api/user'
import useHomeConfig from '../../../hooks/useHomeConfig'

const Register = () => {
    const router = useRouter()
    const { homeConfig } = useHomeConfig()
    const Logo = homeConfig?.logo.formats.large.url
    const formik = useFormik(
        {
            initialValues: initialValues(),
            validationSchema:Yup.object(validationSchema()),
            onSubmit: async (formData) => {
                setLoading(true)
                const response = await registerAPI(formData)                
                if(response?.jwt){
                    toast.success('Successful Register')
                    router.push('/login')
                }else{
                    toast.error('There was an error registering the user')
                }
                setLoading(false)
            } 
        })

    const [ loading, setLoading ] = useState(false)
    return (
        <div className="Register">
            
            <Form className="Register__form" onSubmit={formik.handleSubmit}>
                {Logo ? <img src={Logo} alt="Logo Vares Bros" className="Login__logo"/> : null}
                
                <h1>Create a new account</h1>
                
                <Form.Input 
                    name="name"
                    type="text"
                    placeholder="Name"
                    onChange={formik.handleChange}
                    error={formik.errors.name}
                />


                <Form.Input 
                    name="lastname"
                    type="text"
                    placeholder="Lastname"
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
                    placeholder="Password"
                    onChange={formik.handleChange}
                    error={formik.errors.password}
                    />

                <Form.Input 
                    name="confirm"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={formik.handleChange}
                    error={formik.errors.confirm}
                />

                <div className="Register__button__container">
                    <Button className="Register__button" type="submit" loading={loading}>
                        Create Account
                    </Button>
                </div>

                <p>
                    You already have an account?&nbsp;  
                    <Link href="/login">
                        <a>
                            Log in
                        </a>
                    </Link>
                </p>
            </Form>
        </div>
    )
}

const validationSchema = () =>(
    {
        name: Yup.string().required('Your name is required'),
        lastname: Yup.string().required('Your lastname is required '),
        email: Yup.string().email('Must be a valid email').required('Your email is required'),
        password: Yup.string().required('Your password is required'),
        confirm: Yup.string().oneOf([Yup.ref('password'),null] , 'passwords must be the same')
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