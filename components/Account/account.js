import React from 'react'
import Link from 'next/link'

const Account = () => {
    return (
        <div className="Account">
                <HorizontalSidebar />
            <div className="Account__content">
                <Content 
                    // content={content} 
                />
            </div>
        </div>
    );
}

const HorizontalSidebar = () => (
    <div className="Account__sidebar">
        <Link href="/">
            <a 
                className='Account__sidebar__link'>
            Home</a>
        </Link>
        
        <Link href="!#">
            <a className="Account__sidebar__link">
                    Lingerie
            </a>
        </Link>
        
        <Link href="!#">
            <a className="Account__sidebar__link">Accesories</a>
        </Link>

        <Link href="!#">
            <a className="Account__sidebar__link">Massage</a>
        </Link>

        <Link href="!#">
            <a className="Account__sidebar__link">A Propos</a>
        </Link>
    </div>
)

const Content = () => (
    <h1>Content</h1>
)



export default Account;