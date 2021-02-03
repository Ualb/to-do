import React from 'react';
import { Button, TextInput, Row, Col, Icon, Container} from 'react-materialize'; 

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
            inputText: event.target.value,
        });
    } 

    addTask = () => {
        
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
                                   label="new task" 
                                   s={ 11 } 
                                   onChange={this.inputChange} /> 
                        <Button node="button" waves="light" s={ 1 } onClick={this.addTask}>
                            Add
                        </Button>
                    </Col>   
                </Row>
            </Container>    
        );
    }
}; 

export default Getter;