import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as yup from 'yup';

import { TextInput, Button } from 'react-materialize';

// for the animations alerts
import alertsByType from '../commons/alerts';

// for the path traslate
import { useHistory } from 'react-router-dom';

// style
import '../assets/css/login.css';
import notification from '../commons/notification';

const LogOn = (props) => {
    let history = useHistory();

    // connect to API
    const axios = require('axios').default;

    // URL API variables
    axios.defaults.baseURL = 'https://to-do-back-heroku.herokuapp.com';

    const { isSingOn, setIsSingOn } = props;

    const [isRunCounter, setIsRunCounter] = useState(0);

    // notify of toats
    const notifyWeWorking = () => {
        if (isRunCounter <= 1) {
            notification('WORKING');
            setIsRunCounter(0);
        }
    }

    // get user
    const getUserWithEmailAndPassword = (values) => {
        return `/users?filter={"where":{"and":[{"email":"${values.email}"},{"password":"${values.password}"}]}}`;
    }

    // for logon form
    const logOn = useFormik({
        initialValues: {
            password: '',
            email: '',
        },
        validationSchema: yup.object({
            email: yup.string().email("Correo Electrónico Inválido").required("Correo Requerido").max(55, "Máximo 255 Caracteres"),
            password: yup.string().required("Contraseña Necesaria").min(5, "Mínimo 5 Caracteres"),
        }),
        onSubmit: values => {
            notifyWeWorking();
            if (!isSingOn) {
                axios.get(getUserWithEmailAndPassword(values))
                    .then((response) => {
                        if (response.status !== 200) {
                            alertsByType('FAILURE');
                        } else {
                            const user = response.data;
                            if (user[0] === undefined) {
                                alertsByType('WENOTFOUNDYOU');
                            } else {
                                localStorage.setItem('user', JSON.stringify(response.data[0]));
                                history.push('/dashboard');
                            }
                        }
                    })
            }
        }
    });


    return (
        <div className='login__input' >
            <h4>TO-DO</h4>
            <form onSubmit={logOn.handleSubmit}>
                <TextInput
                    email
                    id="email"
                    name="email"
                    label="Correo"
                    className="login__input__email"
                    onChange={logOn.handleChange}
                    value={logOn.values.email}
                />
                {logOn.touched.email && logOn.errors.email ? (
                    <div className="error-input-message">{logOn.errors.email}</div>
                ) : null}
                <TextInput
                    id="password"
                    name="password"
                    className="login__input__password"
                    label="Contraseña"
                    password={true}
                    onChange={logOn.handleChange}
                    value={logOn.values.password}
                />
                {logOn.touched.password && logOn.errors.password ? (
                    <div className="error-input-message">{logOn.errors.password}</div>
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
    )
}

export default LogOn;