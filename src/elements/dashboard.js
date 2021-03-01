import React from 'react';
import { Row, Col, Container, Icon } from "react-materialize";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { ToastContainer, toast } from 'react-toastify';
import List from '../components/list';
import Task from '../components/task';
import Filter from './filter';


import alertsByType from '../commons/alerts';

import '../assets/css/main.css';

// connect to API
const axios = require('axios').default;
// .env workspace variables
axios.defaults.baseURL = 'https://to-do-back-heroku.herokuapp.com';


// the lists for the user
const getLists = () => {
    var listsName = [];
    const email = JSON.parse(localStorage.getItem('user')).email;
    axios.get(`lists?filter[where][emailUser]=${email}`)
        .then((response) => {
            if (response.status !== 200) {
                alertsByType('FAILURE');
            } else {
                toast.info("Todo bien!");
                localStorage.setItem('lists', JSON.stringify(response.data));
                let i = 0;
                while (true) {
                    try {
                        listsName.push(JSON.parse(localStorage.getItem("lists"))[i]['title']);
                        localStorage.setItem('todo', listsName);
                        ++i;
                    } catch (e) {
                        return;
                    }
                }
            }
        })
}

// first letter in capital letter
const toCapitalLetter = (value) => value.charAt(0).toUpperCase() + value.slice(1);

// obtain the user data
const getUserBasicInfo = () => {
    return toCapitalLetter(JSON.parse(localStorage.getItem('user')).firstName) + ' ' +
        toCapitalLetter(JSON.parse(localStorage.getItem('user')).surname);
}


class DashBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = { lists: [], tasks: [], element: '' }
        this.closeSession = this.closeSession.bind(this);
        this.setState = this.setState.bind(this);
    }

    closeSession = () => {
        localStorage.clear();
        this.props.history.push("/");
    }

    componentWillMount() {
        this.state.lists = getLists();
    }

    render() {
        return (
            <>
                {!localStorage.getItem('user') ?
                    <Redirect to="/" />
                    :
                    <Container>
                        <Row>
                            <Col className="header" s={12}>
                                <Icon onClick={this.closeSession}>
                                    expand_more
                            </Icon>
                                <Icon>
                                    person
                            </Icon>
                                <p>{getUserBasicInfo()}</p>
                            </Col>
                        </Row>
                        <Row className="dashboard-content">
                            <List lists={this.state.lists} />
                            <Task />
                            <Filter />
                        </Row>
                    </Container>
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
                    pauseOnHover />
            </>
        );
    }
}

export default DashBoard;