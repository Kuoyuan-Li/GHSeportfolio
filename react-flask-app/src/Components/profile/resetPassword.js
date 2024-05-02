import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import './style.css'

class ResetPassword extends Component {
    
	constructor() {
        super()
        this.state = {
            password: '',
            password2 :'',
            message :''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.backProfile = this.backProfile.bind(this)
    }
	componentDidMount(){
        const loginguser = localStorage.getItem('user')  
            if (!loginguser){
                this.props.history.push('/login')
            }
    }
	backProfile(e){
        this.props.history.push(`/profile`)
    }
	
	onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }
	
	onSubmit (e) {
        e.preventDefault()
        const userID = localStorage.getItem('userID')
        if (this.state.password !== '' && this.state.password2 !== '')  {
            
            const newPass = {
                password: this.state.password,
                password2 : this.state.password2
            }
            this.setState({message:''})
            fetch('http://127.0.0.1:5000/resetPassword',{
                mode: 'cors',
                method : 'POST',
                headers :{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
					user_id: userID,
                    password: newPass.password,
                    password2: newPass.password2
                })
            }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                if (response.validity !== true) {
                    this.setState({ message : response.nonValidMessage })
                }
                else {
                    this.setState({ message : "You've successfully changed your password!" })
                }
				this.setState({password: '',
                               password2 : ''
				})

            })

        }else{
            this.setState({message:'Please enter all required information'})
        }     
    }
	
	render () {
		let warning;
        if(this.state.message === ''){
            warning = <div></div>;
        } else if (this.state.message === "You've successfully changed your password!") {
		    warning =
            <div class="warning-message">
            <i class="fa fa-heart" aria-hidden="true"></i>
            {this.state.message}
            </div>
		
	    } else {
			
            warning =
            <div class="warning-message">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            {this.state.message}
            </div>
        }
		return (
            <div id="profile">
            <div className="container">
			    <div class="row">
                <form noValidate onSubmit={this.onSubmit}>
                    {warning}    
                    <div className="form">

                        <div className="form-group">
                            <input type="password"
                                className="form-control"
                                name="password"
                                placeholder="Type your new password"
                                value={this.state.password}
                                onChange={this.onChange} />
                        </div>

                        <div className="form-group">
                            <input type="password"
                                className="form-control"
                                name="password2"
                                placeholder="Re-enter password"
                                value={this.state.password2}
                                onChange={this.onChange} />
                        </div>
                        
                        <div className="form-group">
                            <button class="button" type="submit">
                                Confirm to Reset
                            </button>
                        </div>

                    </div>
                </form>
                </div>
                
                <button class="linkButton" onClick={this.backProfile}>
                    Back to Home Page
                </button>
            </div></div>
        )
    }
}



export default ResetPassword