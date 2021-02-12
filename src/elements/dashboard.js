import React from 'react';
import { Row, Col, Container, Icon, TextInput, Chip, Collection, CollectionItem, Button, Modal, TimePicker, Switch } from "react-materialize";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { Fragment } from "react/cjs/react.production.min";
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';

import '../assets/css/main.css';


// for the animations alerts
import swal from 'sweetalert';

// connect to API
const axios = require('axios').default;
// .env workspace variables
axios.defaults.baseURL = 'https://to-do-back-heroku.herokuapp.com';



// the lists for the user
const lists = () => {
    var listsName = [];
    const email = JSON.parse(localStorage.getItem('user')).email;
    axios.get(`lists?filter[where][emailUser]=${email}`)
        .then((response) => {
            if (response.status !== 200) {
                swal("Ha ocurrido un fallo, contáctate con el proveedor!");
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


const getDateTime = (values) => {
    let date = new Date();
    const month = date.getMonth();
    let realMonth = '';
    if (month < 10) {
        realMonth = `0${month}`
    } else {
        realMonth = month;
    }
    const day = date.getDay();
    let realDay = '';
    if (day < 10) {
        realDay = `0${day}`
    } else {
        realDay = day;
    }
    const minutes = date.getMinutes()
    let realMin = '';
    if (minutes < 10) {
        realMin = `0${minutes}`
    } else {
        realMin = minutes;
    }
    const hours = date.getHours();
    let realHrs = '';
    if (hours < 10) {
        realHrs = `0${hours}`
    } else {
        realHrs = hours;
    }
    const result = `${date.getFullYear()}-${realMonth}-${realDay}T${realHrs}:${realMin}:${date.getSeconds()}.${date.getMilliseconds()}Z`;
    return result;
}


// the list component
const List = (props) => {

    const handleClickList = (element) => {
        axios.get(`/lists?filter={"where":{"and":[{"emailUser":"${JSON.parse(localStorage.getItem('user')).email}"},{"title":"${element}"}]}}`).then((response) => {
            props.setState({
                tasks: response.data[0].tasks,
                element: element
            });
        }).catch(function (error) {
            alert(error)
        });
    }

    // for create new list
    const newList = useFormik({
        initialValues: {
            title: '',
        },
        validationSchema: yup.object({
            title: yup.string().required("Descripción necesaria").min(3, "Mínimo 3 caracteres").max(55, "Máximo 55 caracteres"),
        }),
        onSubmit: values => {
            axios.post('/lists', {
                emailUser: JSON.parse(localStorage.getItem('user')).email,
                title: values.title,
                isComplete: false,
                creationDate: getDateTime()
            })
                .then(function (response) {
                    swal("Ya tienes una nueva lista!");
                })
                .catch(function (error) {
                    swal("Algo ha ocurrido, comuniquese con su distribuidor");
                });
        }
    })

    return (
        <Fragment className="scrolling">
            <div className="scrolling__container_1">
                <div className="scrolling__container__title">
                    <h5>Listas</h5>
                    <Modal
                        actions={[
                            <Button flat modal="close" node="button" waves="green">Cerrar</Button>
                        ]}
                        bottomSheet={false}
                        fixedFooter={false}
                        header="Ingrese una lista de tareas"
                        id="Modal-0"
                        open={false}
                        options={{
                            dismissible: true,
                            endingTop: '10%',
                            inDuration: 250,
                            onCloseEnd: null,
                            onCloseStart: null,
                            onOpenEnd: null,
                            onOpenStart: null,
                            opacity: 0.5,
                            outDuration: 250,
                            preventScrolling: true,
                            startingTop: '4%'
                        }}
                        trigger={
                            <button className="custom-button">+</button>}
                    >
                        <form onSubmit={newList.handleSubmit}>
                            <TextInput
                                id="title"
                                name="title"
                                label="Título de la lista"
                                onChange={newList.handleChange}
                                value={newList.values.title}
                            />
                            {newList.touched.title && newList.errors.title ? (
                                <div className="error-input-message">{newList.errors.title}</div>
                            ) : null}
                            <Button
                                node="button"
                                waves="light"
                                type="submit"
                                className="apply"
                            >
                                Aplicar
                            </Button>
                        </form>
                    </Modal>
                </div>
                <Collection className="collection">
                    {localStorage.getItem("todo") && localStorage.getItem("todo").split(',').map(function (element, i) {
                        return (
                            <CollectionItem key={i} onClick={() => handleClickList(element)} className="lists">
                                <p>{element}</p>
                            </CollectionItem>
                        );
                    })}
                </Collection>
            </div>

        </Fragment>
    )
}

// the task component
const Task = (props) => {

    const { tasks } = props;

    // for create new task
    const newTask = useFormik({
        initialValues: {
            description: '',
            remember: false,
        },
        validationSchema: yup.object({
            description: yup.string().required("Descripción necesaria").min(3, "Mínimo 3 caracteres").max(55, "Máximo 55 caracteres"),
            remember: yup.boolean(),
        }),
        onSubmit: values => {
            axios.post('/', {
                id: '',
                description: values.description,
                hourFinish: '',
                remember: false
            })
                .then(function (response) {
                    localStorage.setItem('user', JSON.stringify(response.data[0]));
                })
                .catch(function (error) {
                    swal("Ha ocurrido un fallo, contáctate con el proveedor!");
                });
        }
    })

    const taskModific = (element) => {

    }

    return (
        <Fragment className="scrolling">
            <div className="scrolling__container">
                <div className="scrolling__container__title">
                    <h5>Tareas</h5>
                    <Modal
                        actions={[
                            <Button flat modal="close" node="button" waves="green">Cerrar</Button>
                        ]}
                        bottomSheet={false}
                        fixedFooter={false}
                        header="Agregue algo nuevo por hacer"
                        id="Modal-0"
                        open={false}
                        options={{
                            dismissible: true,
                            endingTop: '10%',
                            inDuration: 250,
                            onCloseEnd: null,
                            onCloseStart: null,
                            onOpenEnd: null,
                            onOpenStart: null,
                            opacity: 0.5,
                            outDuration: 250,
                            preventScrolling: true,
                            startingTop: '4%'
                        }}
                        trigger={
                            <button className="custom-button">+</button>}
                    >
                        <form onSubmit={newTask.handleSubmit}>
                            <TextInput
                                id="description"
                                name="description"
                                label="Breve descripción"
                                onChange={newTask.handleChange}
                                value={newTask.values.description}
                            />
                            {newTask.touched.description && newTask.errors.description ? (
                                <div className="error-input-message">{newTask.errors.description}</div>
                            ) : null}
                            <TimePicker
                                options={{
                                    autoClose: false,
                                    container: null,
                                    defaultTime: 'now',
                                    duration: 350,
                                    fromNow: 0,
                                    i18n: {
                                        cancel: 'Cancel',
                                        clear: 'Clear',
                                        done: 'Ok'
                                    },
                                    onCloseEnd: null,
                                    onCloseStart: null,
                                    onOpenEnd: null,
                                    onOpenStart: null,
                                    onSelect: null,
                                    showClearBtn: false,
                                    twelveHour: true,
                                    vibrate: true
                                }}
                                id="hourFinish"
                                name="hourFinish"
                                label="Hora planeado a realizar"
                            />
                            <Switch
                                id="Switch-11"
                                offLabel="Recordar"
                                // id="remember"
                                name="remember"
                                onChange={newTask.handleChange}
                                value={newTask.values.remember}
                            />
                            {newTask.touched.remember && newTask.errors.remember ? (
                                <div className="error-input-message">{newTask.errors.remember}</div>
                            ) : null}
                            <Button
                                node="button"
                                waves="light"
                                type="submit"
                                className="apply"
                            >
                                Aplicar
                            </Button>
                        </form>
                    </Modal>
                </div>
                <Collection className="collection">
                    {tasks && tasks.map(function (element, i) {
                        return (
                            <CollectionItem key={i} className="task" onClick={taskModific(element)} >
                                <p>{element.description}</p>
                            </CollectionItem>
                        );
                    })}
                </Collection>
            </div>
        </Fragment>
    )
}

// the filter component
const Filter = () => {
    return (
        <Fragment className="scrolling">
            <div className="scrolling__container_3">
                <div className="scrolling__container__title"><h5>Filtrar Por</h5></div>
                <div className="title-filter">
                    <TextInput
                        id="TextInput-4"
                        label="Título"
                    />
                </div>
                <div className="tag-filter">
                    <Chip
                        close={false}
                        options={null}
                        className="chip"
                    >
                        familia
                    </Chip>
                    <Chip
                        close={false}
                        options={null}
                        className="chip"
                    >
                        restaurante
                    </Chip>
                    <Chip
                        close={false}
                        options={null}
                        className="chip"
                    >
                        viaje
                    </Chip>
                    <Chip
                        close={false}
                        options={null}
                        className="chip"
                    >
                        compras
                    </Chip>
                    <Chip
                        close={false}
                        options={null}
                        className="chip"
                    >
                        gym
                    </Chip>
                    <Chip
                        close={false}
                        options={null}
                        className="chip"
                    >
                        aprendizajes
                    </Chip>
                </div>
                <div className="state-filter">
                    <p>Estado</p>
                    <button className="custom-button">Hecho</button>
                    <button className="custom-button">Pendiente</button>
                </div>
            </div>
        </Fragment>
    )
}

const toCapitalLetter = (value) => value.charAt(0).toUpperCase() + value.slice(1);
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
        lists();
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
                            <List setState={this.setState} list={this.state.lists} />
                            <Task tasks={this.state.tasks} />
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