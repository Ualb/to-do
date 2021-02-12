import React from 'react';
import Error from '../assets/images/error-404.png';
import { Link } from 'react-router-dom';

import '../assets/css/error.css';

const PageNotFound = () => (
    <div className='error-container'>
        <h1>Oops, you came to an unknown world.</h1>
        <h1>Better go back to the start.</h1>
        <img src={Error} alt='404' />
        <Link to='/' className='goto'>
            <p>Go To Home</p>
        </Link>
    </div>
);

export default PageNotFound;