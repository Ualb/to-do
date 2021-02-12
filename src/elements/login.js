import { useFormik } from 'formik';
import React, { useState } from 'react';
import { TextInput, Button, ProgressBar } from 'react-materialize';
import * as yup from 'yup';

import '../assets/css/main.css';
import Img from '../assets/img/planner.jpg';

// for the animations alerts
import swal from 'sweetalert';

// toats for the actions
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// librery for the .env
const dotenv = require('dotenv');
dotenv.config();

const Login = (props) => {

    // is logon or singon?
    const [isSingOn, setIsSingOn] = useState(false);
    const [isRunCounter, setIsRunCounter] = useState(0);

    // notify of toats
    const notify = () => {
        if (isRunCounter <= 1) {
            toast.info("Estamos consultando la acción");
            setIsRunCounter(0);
        }
    }

    // connect to API
    const axios = require('axios').default;
    // .env workspace variables
    axios.defaults.baseURL = 'https://to-do-back-heroku.herokuapp.com';

    // for logon form
    const login = useFormik({
        initialValues: {
            password: '',
            email: '',
        },
        validationSchema: yup.object({
            email: yup.string().email("Correo Electrónico Inválido").required("Correo Requerido").max(55, "Máximo 255 caracteres"),
            password: yup.string().required("Contraseña necesaria").min(5, "Mínimo 5 caracteres"),
        }),
        onSubmit: values => {
            notify();
            if (!isSingOn) {
                axios.get(`/users?filter={"where":{"and":[{"email":"${values.email}"},{"password":"${values.password}"}]}}`)
                    .then((response) => {
                        if (response.status != 200) {
                            swal("Ha ocurrido un fallo, contáctate con el proveedor!");
                        } else {
                            const user = response.data;
                            if (user[0] === undefined) {
                                swal("No te hemos encontrado.");
                            } else {
                                localStorage.setItem('user', JSON.stringify(response.data[0]));
                                props.history.push("/dasboard");
                            }
                        }
                    })
            }
        }
    });

    // for singon form
    const newUser = useFormik({
        initialValues: {
            firstName: '',
            surname: '',
            email: '',
            password: '',
            repeatPassword: '',
        },
        validationSchema: yup.object({
            firstName: yup.string().required("Nombre Requerido").min(2, "Mínimo 5 caracteres").max(25, "Máximo 25 caracteres"),
            surname: yup.string().required("Apellido Requerido").min(2, "Mínimo 5 caracteres").max(25, "Máximo 25 caracteres"),
            email: yup.string().email("Correo Inválido").required("Correo Requerido").max(55, "Máximo 255 caracteres"),
            password: yup.string().required("Contraseña necesaria").min(5, "Mínimo 5 caracteres"),
            repeatPassword: yup.string().required("Repetición necesaria").min(5, "Mínimo 5 caracteres"),
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
                        props.history.push("/dasboard");
                    })
                    .catch(function (error) {
                        swal("Ha ocurrido un fallo, contáctate con el proveedor!");
                    });
            } else {
                swal("Has que coincidan las contraseñas.");
            }
        }
    })

    return (
        <>
            <div className='login'>
                <div className='login__img_container'>
                    <img src={Img} alt={"Imágen de chica ordenando"} className="login__img_container__img_login" />
                </div>
                {!isSingOn ?
                    <div className='login__input' >
                        <h4>TO-DO</h4>
                        <form onSubmit={login.handleSubmit}>
                            <TextInput
                                email
                                id="email"
                                name="email"
                                label="Correo"
                                className="login__input__email"
                                onChange={login.handleChange}
                                value={login.values.email}
                            />
                            {login.touched.email && login.errors.email ? (
                                <div className="error-input-message">{login.errors.email}</div>
                            ) : null}
                            <TextInput
                                id="password"
                                name="password"
                                className="login__input__password"
                                label="Contraseña"
                                password={true}
                                onChange={login.handleChange}
                                value={login.values.password}
                            />
                            {login.touched.password && login.errors.password ? (
                                <div className="error-input-message">{login.errors.password}</div>
                            ) : null}
                            <Button
                                node="button"
                                waves="light"
                                type="submit"
                                className="buttom"
                            >
                                Comenzar
                            </Button>
                        </form>
                        <p onClick={() => setIsSingOn(!isSingOn)}>Aún no tengo cuenta</p>
                    </div>
                    :
                    <div className='login__input' >
                        <h4>TO-DO</h4>
                        <form onSubmit={newUser.handleSubmit}>
                            <TextInput
                                id="firstName"
                                name="firstName"
                                label="Primer Nombre"
                                className="login__input__first_Name"
                                onChange={newUser.handleChange}
                                value={newUser.values.firstName}
                            />
                            {newUser.touched.firstName && newUser.errors.firstName ? (
                                <div className="error-input-message">{newUser.errors.firstName}</div>
                            ) : null}
                            <TextInput
                                id="surname"
                                name="surname"
                                label=" Primer Apellido"
                                className="login__input__surname"
                                onChange={newUser.handleChange}
                                value={newUser.values.surname}
                            />
                            {newUser.touched.surname && newUser.errors.surname ? (
                                <div className="error-input-message">{newUser.errors.surname}</div>
                            ) : null}
                            <TextInput
                                email
                                id="email"
                                name="email"
                                label="Correo"
                                className="login__input__email"
                                validate={true}
                                onChange={newUser.handleChange}
                                value={newUser.values.email}
                            />
                            {newUser.touched.email && newUser.errors.email ? (
                                <div className="error-input-message">{newUser.errors.email}</div>
                            ) : null}
                            <TextInput
                                id="password"
                                name="password"
                                className="login__input__password"
                                label="Contraseña"
                                password={true}
                                onChange={newUser.handleChange}
                                value={newUser.values.password}
                            />
                            {newUser.touched.password && newUser.errors.password ? (
                                <div className="error-input-message">{newUser.errors.password}</div>
                            ) : null}
                            <TextInput
                                id="repeatPassword"
                                name="repeatPassword"
                                className="login__input__password"
                                label="Repetir Contraseña"
                                password={true}
                                onChange={newUser.handleChange}
                                value={newUser.values.repeatPassword}
                            />
                            {newUser.touched.repeatPassword && newUser.errors.repeatPassword ? (
                                <div className="error-input-message">{newUser.errors.repeatPassword}</div>
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
                        <p onClick={() => setIsSingOn(!isSingOn)}>Aún no tengo cuenta</p>
                    </div>
                }
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        </>
    );
}

export default Login;