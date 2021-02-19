import React, { useState } from 'react';

// toats for the actions
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// assets in local
import '../assets/css/login.css';
import Img from '../assets/img/planner.jpg';

import LogOn from './logon';
import SingOn from './singon';

const Login = () => {

    // is logon or singon?
    const [isSingOn, setIsSingOn] = useState(false);


    return (
        <div className='login'>
            <div className='login__img_container'>
                <img src={Img} alt={"Imágen de chica ordenando"} className="login__img_container__img_login" />
            </div>
            {!isSingOn ?
                <LogOn isSingOn={isSingOn} setIsSingOn={setIsSingOn} />
                :
                <SingOn isSingOn={isSingOn} setIsSingOn={setIsSingOn} />
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
    );
}

export default Login;