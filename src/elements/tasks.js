import { Row, Container, Collection, CollectionItem, Icon } from "react-materialize";  

// for the animations alerts
import swal from 'sweetalert';

import "../assets/css/tasks.css";

function Tasks(props) {
    
    const { todos, zeroTasks, setTodos, setZeroTasks } = props; 

    // the function delete the task for the component with parameter id 
    const delTask = (id) => {
        // function of alert's 
        swal({
            title: "Are you sure?",
            text: "Once deleted, cannot be recovered!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                // filtering the todos with diferents id's 
                const rmTodo = [...todos].filter(todo => todo.id !== id);
                // update todos
                setTodos(rmTodo);  
                
                // none todos, so, Nothing to do text is show
                if(rmTodo.length === 0) {
                    setZeroTasks(false); 
                }
                // deleted
                swal("Poof! Your task is deleted!", {
                    icon: "success",
                });

            } else {
              swal("Your task is safe!");
            }
          });
    } 

    // the task is done
    const doneTask = (id) => { 
        // updating the todo with the id match
        const newTodos = todos.map(task => { 
            if(task.id === id) {
                task.isDone = !task.isDone;
            }
            return task;
        });
        // updating the react hook 
        setTodos(newTodos); 
    } 
    
    // there are todos or none 
    if(zeroTasks || todos.lenght !== undefined) {
        return (
            <Container className="container">
                { todos && todos.map(function(task, i)  {
                    return ( 
                        <Collection key={ i } >
                            { !task.isDone ?
                                <CollectionItem className="todo" > 
                                    <span className="default-span" onClick={ () => doneTask(task.id) }>
                                        { task.title }
                                    </span>
                                    <div className='button' onClick={ () => delTask(task.id) } >
                                        <Icon>
                                            delete
                                        </Icon>
                                    </div>        
                                </CollectionItem> 
                            :
                                <CollectionItem className="done" > 
                                    <span onClick={ () => doneTask(task.id) }>
                                        { task.title }
                                    </span>
                                    <div className='button-done' onClick={ () => delTask(task.id) } >
                                        <Icon>
                                            delete
                                        </Icon>
                                    </div>        
                                </CollectionItem>                         
                            }
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