import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import Home from './Components/login/index'
import Login from './Components/login/login'
import Register from './Components/login/register'
import Profile from  './Components/profile/profile'
import NavBar from './Components/profile/navbar'
import ResetPassword from './Components/profile/resetPassword'
import 'bootstrap/dist/css/bootstrap.min.css';
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
                        <Route exact path="/navbar" component={NavBar} />
						<Route exact path="/reset_your_password" component={ResetPassword} />
                </div>            
            </div>

            </Router>
        );
    }
  
}

export default App;
