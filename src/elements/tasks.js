import { Row, Container } from "react-materialize"; 
import Collection from "react-materialize/lib/Collection";
import CollectionItem from "react-materialize/lib/CollectionItem";
import Icon from "react-materialize/lib/Icon";

import "../assets/css/tasks.css";

function Tasks(props) {
    
    const { todo, zeroTasks } = props;
    console.log(todo);

    const delTask = (event) => {
        alert("quieres eliminar");
        event.stopPropagation();
    }

    // const removeTodo = id => {
    //     const removeArr = [...todos].filter(todo => todo.id !== id);
    //     setTodos(removeArr);
    // }

    const doneTask = (event) => {
        alert("quieres dar por concluido");
        alert(event.target.key);
    }
    
    if(zeroTasks || todo.lenght !== undefined ) {
        return (
            <Container className="container">
                { todo && todo.map(function(task, i)  {
                    return ( 
                        <Collection className="collection" >
                            <CollectionItem className="collectionItem" onClick={ doneTask } key={ i }>
                                {/* <li  > */}
                                    <span>
                                        { task.title }
                                    </span>
                                    <div className='button' onClick={ delTask } >
                                        <Icon>
                                            delete
                                        </Icon>
                                    </div>                                    
                                {/* </li>  */}
                            </CollectionItem> 
                        </Collection>
                    );
                })}
            </Container>
        );
    } else {
        return (
            <>
                <Container className="nothing">
                    <Row>
                        <h4>
                            Nothing to do.
                        </h4>
                    </Row>
                </Container>                
            </>
        );
    }
    
}

export default Tasks;