import React, { useState, useEffect } from 'react'; 
import Getter from './elements/getter';
import Tasks from './elements/tasks'; 

function App() {

  const [tasks, setTasks] = useState([]);
  const [zeroTasks, setZeroTasks] = useState(false);
  // object for new tasks
  function task(title, done) {
    this.title = title;
    // true - donde -- false - pending
    this.isDone = done;
  }  

  useEffect(() => { 
    setTasks([]);
  }, []);

  return (
    <> 
      <Getter tasks={ tasks } setTasks={ setTasks } task={ task } setZeroTasks={ setZeroTasks } />
      <Tasks todo={ tasks } zeroTasks={ zeroTasks } />
    </>
  ); 
  
}

export default App;
