import React from 'react'
import Header from 'next/head'

const Seo = (props) => {
    const {title, description, image, url} = props
    const DOMAIN = 'https://varesbros.com'


    return (
        <Header>
            <title>{`${title} - Vares Bros`}</title>
            <meta property="description" content={description} />
            {/* <!-- Open Graph / Facebook --> */}
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={`${DOMAIN}${url}`} />
            <meta property="og:title" content={`${title} - Vares Bros`}/>
            <meta property="og:description" content={description}/>
            <meta property="og:image" content={image}/>

            {/* <!-- Twitter --/> */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={`${DOMAIN}${url}`} />
            <meta property="twitter:title" content={`${title} - Vares Bros`}/>
            <meta property="twitter:description" content="The best sex accesories, toys and natural supplements for improve your sexual performance"/>
            <meta property="twitter:image" content={image} />
        </Header>
    );
}

Seo.defaultProps ={
    title: 'Online Sex Shop',
    description: 'The best sex accesories, toys and natural supplements for improve your sexual performance',
    image: 'https://sexshop.s3.us-east-2.amazonaws.com/Logo_b6577c1879.png',
    url: 'https://www.varebros.com'
}

export default Seo;