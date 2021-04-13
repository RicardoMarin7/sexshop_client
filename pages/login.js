import LoginComponent from '../components/Auth/Login'
import Seo from '../components/Seo';
import BasicLayout from '../layouts/BasicLayout'

const Login = () => {
    return ( 
        <BasicLayout>
            <Seo 
                title='Login'
            />
            <LoginComponent />
        </BasicLayout>
    );
}
export default Login;