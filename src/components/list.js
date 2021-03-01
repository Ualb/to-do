import { TextInput, Collection, CollectionItem, Button, Modal } from "react-materialize";
import { Fragment } from "react/cjs/react.production.min";
import { useFormik } from 'formik';
import * as yup from 'yup';

import getDateTime from '../commons/mongoDateTime';
import alertsByType from '../commons/alerts';

// connect to API
const axios = require('axios').default;
// .env workspace variables
axios.defaults.baseURL = 'https://to-do-back-heroku.herokuapp.com';

function List(props) {

    const { lists } = props;

    // drawing the component
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
                .then(function () {
                    alertsByType("NEWLIST");
                })
                .catch(function () {
                    alertsByType("FAILURE");
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

export default List;