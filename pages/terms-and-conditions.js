import React from 'react'
import useHomeConfig from '../hooks/useHomeConfig'
import BasicLayout from '../layouts/BasicLayout'
import marked from 'marked'
import Seo from '../components/Seo'

const TermsAndConditions = () => {
    const { homeConfig } = useHomeConfig()

    const getTerms = () =>{
        const rawMark = marked(homeConfig?.termsAndConditions)
        return rawMark
    }
    
    return (
        <BasicLayout>
            <Seo 
                title='Terms and Conditions'
                description='In Vares Bros we care about you, here is our Terms and Conditions'
            />
            <div className="PrivacyPolicy">
                <h1>Return Policy</h1>
                { homeConfig?.returnPolicy ? (
                    <div className="PrivacyPolicy_policy" dangerouslySetInnerHTML={{__html:  getTerms() }}>

                    </div>
                ) : null}
                
            </div>
        </BasicLayout>
    );
}
 
export default TermsAndConditions;