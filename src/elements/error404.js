import React from 'react';
import Error from '../assets/img/error-404.png';
import { Link } from 'react-router-dom';

import '../assets/css/error.css';

const PageNotFound = () => (
    <div className='error-container'>
        <h1>Oops, por aquí no hay tareas.</h1>
        <h1>Mejor regresa a la app.</h1>
        <img src={Error} alt='404' />
        <Link to='/' className='goto'>
            <p>Volver</p>
        </Link>
    </div>
);

export default PageNotFound;