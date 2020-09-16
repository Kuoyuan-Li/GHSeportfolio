import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom'
import {Switch} from 'react-router-dom'
import Home from './Components/login/index'
import Login from './Components/login/login'
import Register from './Components/login/register'
import Profile from  './Components/profile/profile'
import NavBar from './Components/profile/navbar'

/*
import Home from './Components/login/home'
import Profile from './Components/login/profile'

let Router = window.ReactRouter;
let RouteHandler = Router.RouteHandler;
let Route = Router.Route;
let DefaultRoute = Router.DefaultRoute;
let hashHistory = Router.hashHistory;
*/

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Router>            

            <div className="App">
            
                <div className="container">
                        <Route exact path="/" component={Home} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/profile" component={Profile} />
                </div>            
            </div>

            </Router>
        );
    }
  
}

export default App;
