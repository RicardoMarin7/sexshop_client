import React from 'react'
import useHomeConfig from '../hooks/useHomeConfig'
import BasicLayout from '../layouts/BasicLayout'
import marked from 'marked'
import Seo from '../components/Seo'

const PrivacyPolicy = () => {
    const { homeConfig } = useHomeConfig()

    const getPolicy = () =>{
        const rawMark = marked(homeConfig?.privacyPolicy)
        return rawMark
    }
    
    return (
        <BasicLayout>
            <Seo 
                title='Privacy Policy'
                description='In Vares Bros we care about your privacy, here is our privacy policy'
            />
            <div className="PrivacyPolicy">
                <h1>Privacy Policy</h1>
                { homeConfig ? (
                    <div className="PrivacyPolicy__policy" dangerouslySetInnerHTML={{__html:  getPolicy() }}>

                    </div>
                ) : null}
                
            </div>
        </BasicLayout>
    );
}
 
export default PrivacyPolicy;