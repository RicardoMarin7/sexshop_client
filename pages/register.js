import RegisterComponent from '../components/Auth/Register'
import Seo from '../components/Seo';
import BasicLayout from '../layouts/BasicLayout'

const Register = () => {
    return (  
        <BasicLayout>
            <Seo 
                title='Reset Password'
            />
            <RegisterComponent />
        </BasicLayout>
    );
}

 
export default Register;