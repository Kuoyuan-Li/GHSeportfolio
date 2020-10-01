import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import {NavBar, Nav, NavDropdown, Breadcrumb, Button} from 'react-bootstrap';
import ResetPassword from './resetPassword'

class Navbar extends Component {
	constructor () {
		super()
		this.state = {
			message:''
		}
		this.handleResetPassword = this.handleResetPassword.bind(this)
		this.handleLogout = this.handleLogout.bind(this)
	}
	
	handleLogout (event) {
		this.setState({message: 'logout'})
        fetch ('http://localhost:5000/profile',{
                mode: 'cors',
                method : 'POST',
                headers :{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    request: this.state.message
                })
        })
		.then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
			this.props.history.push(`/login`)
        })
	}
	
	handleResetPassword (event) {
		this.setState({message: 'resetPassword'})
        fetch ('http://localhost:5000/profile',{
                mode: 'cors',
                method : 'POST',
                headers :{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    request: this.state.message
                })
        })
		.then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
			this.props.history.push(`/resetPassword`)
        })
	}

    render () {
        return (
		    <div>
			    
				
				<Nav variant="pills" defaultActiveKey="#first">
				    <Nav.Item>
                        <Nav.Link href="#disabled">Settings</Nav.Link>
                    </Nav.Item>
                    
                    <Nav.Item>
                        <Nav.Link href="/reset_your_password">Reset password</Nav.Link>
                    </Nav.Item>
					
					<Nav.Item>
                        <Nav.Link href="/login">Log out</Nav.Link>
                    </Nav.Item>
                    
                </Nav>
				
			</div>
        )
	}
    
}

export default withRouter(Navbar)

/*
                <Breadcrumb>
				    <Breadcrumb.Item>
					    <div>
			                <button name="logOut" type = "button" onClick={this.handleLogout} className="btn btn-lg btn-primary btn-block">
                                Logout
                            </button>
				        </div>
					</Breadcrumb.Item>
				    <Breadcrumb.Item>
					    <div>
						    <button name="resetPassword" type = "button" onClick={this.handleResetPassword} className="btn btn-lg btn-primary btn-block">
                                Reset Password
                            </button>
						</div>
					</Breadcrumb.Item>
					<Breadcrumb.Item>
					    <div>
						    <button name="settings" type = "button" className="btn btn-lg btn-primary btn-block">
                                Settings
                            </button>
						</div>
					</Breadcrumb.Item>
				</Breadcrumb>
				
				*/

