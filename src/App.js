import React, { useState, useEffect } from 'react';
// import Getter from './elements/getter';
// import Tasks from './elements/tasks';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './elements/login';


function App() {

  // arrays of task of the todo list
  const [tasks, setTasks] = useState([]);
  // for the text, if there are not taks
  const [zeroTasks, setZeroTasks] = useState(false);
  const [idTask, setIdTask] = useState(1);
  // object for new tasks
  function task(id, title, done) {
    this.id = idTask;
    this.title = title;
    // true - done -- false - pending
    this.isDone = done;
  }

  useEffect(() => {
    setTasks([]);
  }, []);

  {/* <Getter tasks={ tasks } setTasks={ setTasks } task={ task } setZeroTasks={ setZeroTasks } setIdTask={ setIdTask } idTask={ idTask } />
      <Tasks todos={ tasks } setTodos={ setTasks } zeroTasks={ zeroTasks } setZeroTasks={ setZeroTasks } /> */}

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" name="login" component={Login} />
        {/* <Route exact path="/main" component={DashBoard} />
        <Route component={PageNotFound} /> */}
      </Switch>
    </BrowserRouter>

  );
}

export default App;
