import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './elements/login';
import DashBoard from './elements/dashboard';
import PageNotFound from './elements/error404';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" name="login" component={Login} />
        <Route exact path="/dashboard" component={DashBoard} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
