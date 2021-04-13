import { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { resetPasswordAPI } from '../../../api/user'
import useHomeConfig from '../../../hooks/useHomeConfig'

const ResetPassword = () => {
    const [ loading, setLoading ] = useState(false)
    const { homeConfig } = useHomeConfig()
    const Logo = homeConfig?.logo.formats.large.url

    const formik = useFormik(
        {
            initialValues: initialValues(),
            validationSchema:Yup.object(validationSchema()),
            onSubmit: async (formData) => {
                setLoading(true)
                const response = await resetPasswordAPI(formData.identifier)   
                console.log(response)   
                setLoading(false)
            } 
        })

    return (
        <div className="Reset">
            <Form className="Reset__form" onSubmit={formik.handleSubmit}>
                {Logo ? <img src={Logo} alt="Logo Vares Bros" className="Login__logo"/> : null}
                
                <h1>Recover Password</h1>

                <Form.Input 
                    name="identifier"
                    type="text"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    error={formik.errors.identifier}
                />

                <div className="Reset__button__container">
                    <Button className="Reset__button" type="submit" loading={loading}>
                        Recover
                    </Button>
                </div>

                <p>
                    You do not have an account?&nbsp;  
                    <Link href="/register">
                        <a>
                            Create account
                        </a>
                    </Link>
                </p>
                <p>
                    <Link href="/login">
                        <a>
                            Log in
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