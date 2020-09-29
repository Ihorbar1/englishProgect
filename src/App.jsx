import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import './App.css';
import Program from './pages/program/index'
import Menu from './pages/menu'
import ErrorPage from './pages/404/index'
import Login from './pages/login/index'
import Registration from './pages/registration/index'

const customHistory = createBrowserHistory();

class App extends React.Component {

  render() {
    // localStorage.setItem('words', JSON.stringify(this.state))
    // let curent = JSON.parse(localStorage.getItem('curent'));
    // console.log(JSON.parse(localStorage.getItem('words')));


    return (
      <Router history={customHistory}>
        <Switch>
          <Route exact path="/" render={() => <Login />}></Route>
          <Route path="/menu" render={() => <Menu />}></Route>
          <Route path="/program" render={() => <Program />}></Route>
          <Route path="/registration" render={() => <Registration />}></Route>
          <Route path="/404" render={() => <ErrorPage />}></Route>
        </Switch>
      </Router>

    );
  }
}

export default App;