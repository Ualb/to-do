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

    inputChange = (event) => {  
        this.setState({
            inputText: event.target.value
        });
    } 

    addTask = () => { 
        // new object of task
        const task =  new this.props.task();
        task.title = this.state.inputText;
        task.isDone = false;  

        this.props.setTasks([...this.props.tasks, task]);
        this.props.setZeroTasks(true);

        this.setState({
            inputText: ''
        });
    }

    introInput = (event) => {
        if (event.keyCode === 13) {
            this.addTask();
        }
    }

    render() {
       return (
            <Container className="task">
                <Row>
                    <Col s={ 12 }>
                        <h3 >To-Do</h3>
                    </Col>
                    <Col s={ 12 }>
                        <TextInput icon={<Icon>assignment</Icon>} 
                                   id="TextInput-4"
                                   className="white-header" 
                                   label="new task" 
                                   s={ 11 } 
                                   onChange={this.inputChange} 
                                   onKeyDown={this.introInput} 
                                   value={this.state.inputText} /> 
                        <Button node="button" 
                                waves="light" 
                                className="white-header"
                                s={ 1 } 
                                onClick={this.addTask}>
                            Add
                        </Button>
                    </Col>   
                </Row>
            </Container>    
        );
    }

}; 

export default Getter;