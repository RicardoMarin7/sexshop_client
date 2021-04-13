import React from 'react'
import { Icon } from 'semantic-ui-react'
import useHomeConfig from '../../hooks/useHomeConfig'
import { map } from 'lodash'
import Link from 'next/link'

const Footer = () => {
    const { homeConfig } = useHomeConfig()

    return (
        <div className="Footer">
            <div className="container">
                <div className="Footer__container">
                    { homeConfig.socials ? (
                        <div className="Footer__socials">
                            { map( homeConfig.socials, social =>(
                                <div className={social.network} key={social._id}>
                                    <a href={`https://${social.networkLink}`} target="_blank">
                                        <Icon name={social.network.toLowerCase()} />
                                    </a>
                                </div>
                            )) }
                        </div>
                    ) : null }
                    
                    <div className="Footer__links">
                        <Link href='/privacypolicy'>
                            <a>Privacy Policy</a>
                        </Link>

                        <Link href='/terms-and-conditions'>
                            <a>Terms and Conditions</a>
                        </Link>

                        <Link href='/returnpolicy'>
                            <a>Return Policy</a>
                        </Link>

                            <p className="Copyright">All rights reserved Vares Bros &copy; {new Date().getFullYear()} </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Footer;