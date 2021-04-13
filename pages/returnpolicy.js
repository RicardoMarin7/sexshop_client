import React from 'react'
import useHomeConfig from '../hooks/useHomeConfig'
import BasicLayout from '../layouts/BasicLayout'
import marked from 'marked'
import Seo from '../components/Seo'

const ReturnPolicy = () => {
    const { homeConfig } = useHomeConfig()

    const getTerms = () =>{
        const rawMark = marked(homeConfig?.returnPolicy)
        return rawMark
    }
    
    return (
        <BasicLayout>
            <Seo 
                title='Return Policy'
                description='In Vares Bros we care about your satisfaction, here is our Return Policy'
            />
            <div className="PrivacyPolicy">
                <h1>Return Policy</h1>
                { homeConfig ? (
                    <div className="PrivacyPolicy_policy" dangerouslySetInnerHTML={{__html:  getTerms() }}>

                    </div>
                ) : null}
                
            </div>
        </BasicLayout>
    );
}
 
export default ReturnPolicy;