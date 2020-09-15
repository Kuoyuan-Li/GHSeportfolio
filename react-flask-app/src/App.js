import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom'
//import { Login, Register } from './Components/login/index'
import Login from './Components/login/login'
import Register from './Components/login/register'
import Navbar from './Components/login/navbar'
import Profile from  './Components/login/profile'

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
        this.state = {
            isLoginActive: true
        }
    }

    changeState= () => {
        this.setState((prevState) => ({isLoginActive: !prevState.isLoginActive}));  
    }
    
    render() {
        return (
            <Router>            

            <div className="App">
                <Navbar />
                <div className="container">
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/profile" component={Profile} />

                </div>            
            </div>

            </Router>
        );
    }
  
}

export default App;
