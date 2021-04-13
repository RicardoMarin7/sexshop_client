import ResetComponent from '../components/Auth/ResetPassword'
import BasicLayout from '../layouts/BasicLayout'
import Seo from '../components/Seo';

const ForgotPassword = () => {
    return (  
        <BasicLayout>
            <Seo 
                title='Forgot Password'
            />
            <ResetComponent />
        </BasicLayout>
    );
}

 
export default ForgotPassword;