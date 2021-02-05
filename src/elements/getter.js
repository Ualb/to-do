import React from 'react';
import { Button, TextInput, Row, Col, Icon, Container } from 'react-materialize'; 

import '../assets/css/getter.css';

class Getter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputText: '',
        }; 
        this.addTask = this.addTask.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }

    // value change of the input form
    inputChange = (event) => {  
        this.setState({
            inputText: event.target.value
        });
    } 

    // add new task on list of tasks
    addTask = () => { 
        // new object of task
        const task =  new this.props.task();
        task.title = this.state.inputText.charAt(0).toUpperCase() + this.state.inputText.slice(1);
        task.isDone = false;
        task.id = this.props.idTask;
        
        // increment the id or key
        this.props.setIdTask(task.id + 1);

        // add the new task to all with the others
        this.props.setTasks([...this.props.tasks, task]);
        this.props.setZeroTasks(true);

        // clean the input form text
        this.setState({
            inputText: ''
        });
    }

    // enter input keyboard event
    introInput = (event) => {
        if (event.keyCode === 13) {
            this.addTask();
        }
    }

    render() {
       return (
            <Container className="input-form">
                <Row>
                    <Col s={ 12 }>
                        <h3 >To-Do</h3>
                    </Col>
                    <Col s={ 12 } className="elements">
                        <TextInput icon={<Icon>assignment</Icon>} 
                                   id="TextInput-4"
                                   className="write-input" 
                                   label="new task" 
                                   s={ 11 } 
                                   onChange={this.inputChange} 
                                   onKeyDown={this.introInput} 
                                   value={this.state.inputText} /> 
                        <Button className="button-form"
                                node="button" 
                                waves="light"  
                                s={ 1 } 
                                onClick={this.addTask} 
                                tooltip={ "Add to Todo list" } >
                            Add
                        </Button>
                    </Col>   
                </Row>
            </Container>    
        );
    }
}; 

export default Getter;