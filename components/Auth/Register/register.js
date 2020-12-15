import { Form, Button } from 'semantic-ui-react'
import Link from 'next/link'

const Register = () => {
    return (
        <div className="Register">
            
            <Form className="Register__form">
                {/* <img src="/icono_light.svg" alt="Icono de Ecommerce Nahual" className="Register__logo"/> */}
                
                <h1>CREA TU NUEVA CUENTA</h1>
                
                <Form.Input 
                    name="name"
                    type="text"
                    placeholder="Nombre"
                />


                <Form.Input 
                    name="lastename"
                    type="text"
                    placeholder="Apellidos"
                />

                <Form.Input 
                    name="email"
                    type="text"
                    placeholder="Email"
                />

                <Form.Input 
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    />

                <Form.Input 
                    name="confirm"
                    type="password"
                    placeholder="Confirmar contraseña"
                />

                <div className="Register__button__container">
                    <Button className="Register__button">
                        Crear Cuenta
                    </Button>
                </div>

                <p>
                    ¿Ya tienes cuenta?&nbsp;  
                    <Link href="/login">
                        <a>
                            Inicia sesión
                        </a>
                    </Link>
                </p>
            </Form>
        </div>
    )
}

export default Register;