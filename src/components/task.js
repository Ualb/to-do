import { TextInput, Collection, CollectionItem, Button, Modal, TimePicker, Switch } from "react-materialize";
import { Fragment } from "react/cjs/react.production.min";
import { useFormik } from 'formik';
import * as yup from 'yup';

import alertsByType from '../commons/alerts';

// connect to API
const axios = require('axios').default;
// .env workspace variables
axios.defaults.baseURL = 'https://to-do-back-heroku.herokuapp.com';

function Tasks(props) {

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
                .catch(function () {
                    alertsByType("FAILURE");
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

export default Tasks;