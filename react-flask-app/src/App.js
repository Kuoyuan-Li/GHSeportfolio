
import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import Login from './Components/login/login'
import Register from './Components/login/register'
import ForgetPassword from './Components/login/forgetPassword'
import Profile from  './Components/profile/profile'
import NavBar from './Components/profile/navbar'
import ResetPassword from './Components/profile/resetPassword'
import 'bootstrap/dist/css/bootstrap.min.css'
import Index from './Components/login/index'
import Logout from './Components/profile/logout'
import EportfolioEdit from './Components/eportfolio/eportfolioEdit'
import EportfolioView from './Components/eportfolio/eportfolioView'
import ViewOtherEportfolio from './Components/eportfolio/viewOtherEportfolio'
import OtherEportfolio from './Components/eportfolio/otherEportfolios'
import 'font-awesome/css/font-awesome.min.css'


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
                        <Route exact path="/" component={Index} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
						<Route exact path="/forgetPassword" component={ForgetPassword} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/logout" component={Logout} />
                        <Route exact path="/eportfolioEdit" component={EportfolioEdit} />
						<Route exact path="/eportfolioView" component={EportfolioView} />
						<Route exact path="/resetPassword" component={ResetPassword} />
                        <Route exact path="/otherEportfolio" component={OtherEportfolio} />
                        <Route exact path="/viewOtherEportfolio/:id" component={ViewOtherEportfolio} />                       
                </div>            
            </div>

            </Router>
        );
    }
  
}

export default App;

