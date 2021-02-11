import { useFormik } from 'formik';
import React, { useState } from 'react';
import { TextInput, Button } from 'react-materialize';
import { Link } from 'react-router-dom';


import '../assets/css/main.css';
import Img from '../assets/img/planner.jpg';

const Login = () => {

    const [isSingOn, setIsSingOn] = useState(false);

    const formik = useFormik({
        initialValues: {
            password: '',
            email: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <>
            <div className='login'>
                <div className='login__img_container'>
                    <img src={Img} alt={"Imágen de chica ordenando"} className="login__img_container__img_login" />
                </div>
                {!isSingOn ?
                    <div className='login__input' >
                        <h3>TO-DO</h3>
                        <form onSubmit={formik.handleSubmit}>
                            <TextInput
                                email
                                id="email"
                                label="Correo"
                                className="login__input__email"
                                validate
                                error="Correo no válido"
                                onChange={formik.handleChange}
                            />
                            <TextInput
                                id="password"
                                className="login__input__password"
                                label="Contraseña"
                                password={true}
                                onChange={formik.handleChange}
                            />
                            <Link
                                to="/main"
                            >
                                <Button
                                    node="button"
                                    waves="light"
                                    type="submit"
                                >
                                    Comenzar
                                </Button>
                            </Link>
                        </form>
                    </div>
                    :
                    <div className='login__input' >
                        <h3>TO-DO</h3>
                        <form onSubmit={formik.handleSubmit}>
                            <TextInput
                                id="firstName"
                                label="Primer Nombre"
                                className="login__input__first_Name"
                                error="Se amerita el primer nombre"
                                onChange={formik.handleChange}
                            />
                            <TextInput
                                id="surname"
                                label=" Primer Apellido"
                                className="login__input__surname"
                                error="Se amerita el primer apellido"
                                onChange={formik.handleChange}
                            />
                            <TextInput
                                email
                                id="email"
                                label="Correo"
                                className="login__input__email"
                                validate
                                error="Correo no válido"
                                onChange={formik.handleChange}
                            />
                            <TextInput
                                id="password"
                                className="login__input__password"
                                label="Contraseña"
                                password={true}
                                onChange={formik.handleChange}
                            />
                            <TextInput
                                id="password"
                                className="login__input__password"
                                label="Repetir Contraseña"
                                password={true}
                                onChange={formik.handleChange}
                            />
                            <Link
                                to="/main"
                            >
                                <Button
                                    node="button"
                                    waves="light"
                                    type="submit"
                                >
                                    Solicitar
                                </Button>
                            </Link>
                        </form>
                    </div>
                }

                <p onClick={() => setIsSingOn(!isSingOn)}>Aún no tengo cuenta</p>
            </div>
        </>
    );
}

export default Login;