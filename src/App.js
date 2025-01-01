import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import MenuPage from './pages/Menu';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Login" component={Login} />
        <Route path="/RegisterPage" component={RegisterPage} />
        <Route path="/Menu" component={MenuPage} />
      </Switch>
    </Router>
  );
}

export default App;
