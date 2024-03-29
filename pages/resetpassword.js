import ResetComponent from '../components/Auth/ResetPassword'
import BasicLayout from '../layouts/BasicLayout'
import Seo from '../components/Seo';

const ResetPassword = () => {
    return (  
        <BasicLayout>
            <Seo 
                title='Reset Password'
            />
            <ResetComponent />
        </BasicLayout>
    );
}

 
export default ResetPassword;