import Header from '../../components/Header'

const BasicLayout = ({children}) => {
    return (
        <div className="container">
            <Header />
            {children}
        </div>
    );
}

export default BasicLayout;