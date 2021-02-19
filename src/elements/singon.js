import { TextInput, Button } from 'react-materialize';

import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';

// for the animations alerts
import alertsByType from '../commons/alerts';

// style
import '../assets/css/login.css';

const SingOn = (props) => {

    // connect to API
    const axios = require('axios').default;

    // URL API variables
    axios.defaults.baseURL = 'https://to-do-back-heroku.herokuapp.com';

    const { isSingOn, setIsSingOn } = props;

    // for singon form
    const singOn = useFormik({
        initialValues: {
            firstName: '',
            surname: '',
            email: '',
            password: '',
            repeatPassword: '',
        },
        validationSchema: yup.object({
            firstName: yup.string().required("Nombre Requerido").min(2, "Mínimo 5 Caracteres").max(25, "Máximo 25 Caracteres"),
            surname: yup.string().required("Apellido Requerido").min(2, "Mínimo 5 Caracteres").max(25, "Máximo 25 Caracteres"),
            email: yup.string().email("Correo Inválido").required("Correo Requerido").max(55, "Máximo 255 Caracteres"),
            password: yup.string().required("Contraseña necesaria").min(5, "Mínimo 5 Caracteres"),
            repeatPassword: yup.string().required("Repetición necesaria").min(5, "Mínimo 5 Caracteres"),
        }),
        onSubmit: values => {
            if (isSingOn && values.password === values.repeatPassword) {
                axios.post('/users', {
                    firstName: values.firstName,
                    surname: values.surname,
                    email: values.email,
                    isConfirmEmail: false,
                    password: values.password
                })
                    .then(function (response) {
                        localStorage.setItem('user', JSON.stringify(response.data[0]));
                        props.history.push("/dashboard");
                    })
                    .catch(function (error) {
                        alertsByType('FAILURE');
                    });
            } else {
                alertsByType('PASSWORDDONOTMATCH');
            }
        }
    })

    return (
        <div className='login__input' >
            <h4>TO-DO</h4>
            <form onSubmit={singOn.handleSubmit}>
                <TextInput
                    id="firstName"
                    name="firstName"
                    label="Primer Nombre"
                    className="login__input__first_Name"
                    onChange={singOn.handleChange}
                    value={singOn.values.firstName}
                />
                {singOn.touched.firstName && singOn.errors.firstName ? (
                    <div className="error-input-message">{singOn.errors.firstName}</div>
                ) : null}
                <TextInput
                    id="surname"
                    name="surname"
                    label=" Primer Apellido"
                    className="login__input__surname"
                    onChange={singOn.handleChange}
                    value={singOn.values.surname}
                />
                {singOn.touched.surname && singOn.errors.surname ? (
                    <div className="error-input-message">{singOn.errors.surname}</div>
                ) : null}
                <TextInput
                    email
                    id="email"
                    name="email"
                    label="Correo"
                    className="login__input__email"
                    validate={true}
                    onChange={singOn.handleChange}
                    value={singOn.values.email}
                />
                {singOn.touched.email && singOn.errors.email ? (
                    <div className="error-input-message">{singOn.errors.email}</div>
                ) : null}
                <TextInput
                    id="password"
                    name="password"
                    className="login__input__password"
                    label="Contraseña"
                    password={true}
                    onChange={singOn.handleChange}
                    value={singOn.values.password}
                />
                {singOn.touched.password && singOn.errors.password ? (
                    <div className="error-input-message">{singOn.errors.password}</div>
                ) : null}
                <TextInput
                    id="repeatPassword"
                    name="repeatPassword"
                    className="login__input__password"
                    label="Repetir Contraseña"
                    password={true}
                    onChange={singOn.handleChange}
                    value={singOn.values.repeatPassword}
                />
                {singOn.touched.repeatPassword && singOn.errors.repeatPassword ? (
                    <div className="error-input-message">{singOn.errors.repeatPassword}</div>
                ) : null}
                <Button
                    node="button"
                    waves="light"
                    type="submit"
                    className="buttom"
                >
                    Solicitar
                            </Button>
            </form>
            <p onClick={() => setIsSingOn(!isSingOn)}>Ya tengo cuenta</p>
        </div>
    );
}

export default SingOn;