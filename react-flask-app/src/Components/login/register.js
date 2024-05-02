import React from 'react';
import './style.css'

export class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
			password: '',
            password2 :'',
			captcha:'',
			userCaptcha:'',
            message :'',
            notifyMessage : ''
        }
        this.onSendCaptcha = this.onSendCaptcha.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.backIndex = this.backIndex.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount () {
        const loginguser = localStorage.getItem('user')
        if (loginguser){
            this.props.history.push(`/profile`)
        }
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }
	
	onSendCaptcha(e) {
		
		e.preventDefault()
		fetch ('http://127.0.0.1:5000/emailCaptcha',{
                mode: 'cors',
                method : 'POST',
                headers :{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.email
                })
        }).then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            if (response.validity !== true) {
                this.setState({ 
                    message : response.nonValidMessage,
                    notifyMessage : ''})
				
            } else {
                this.setState({
                    captcha: response.captcha,
                    message: '',
                    notifyMessage : response.nonValidMessage 
                })
            }

	    })
	}

    onSubmit (e) {
        e.preventDefault()
        
        if (this.state.username !== '' && 
		    this.state.email !== '' && 
			this.state.password !== '' && 
			this.state.password2 !== '' &&
		    this.state.captcha === this.state.userCaptcha)  {
            
            const newUser = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                password2 : this.state.password2
            }
            this.setState({message:''})
            fetch ('http://127.0.0.1:5000/register',{
                mode: 'cors',
                method : 'POST',
                headers :{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: newUser.username,
                    email: newUser.email,
                    password: newUser.password,
                    password2: newUser.password2
                })
            }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                if (response.validity !== true) {
                    this.setState({ message : response.nonValidMessage })
                } else {
                    this.props.history.push(`/login`)
                }

            })

        }else{

			if (this.state.captcha !== this.state.userCaptcha) {
				this.setState({message:'Please enter the right code'})

			} else {
				this.setState({message:'Please enter all required information'})
			}
		}     
    }

    backIndex(e){
        this.props.history.push(`/`)
    }

    render () {
        let warning;
        if(this.state.message === '' && this.state.notifyMessage === ''){
             warning = <div></div>;
        } else if (this.state.message != ''){
            warning =
            <div class="warning-message">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            {this.state.message}
            </div>
        }else if (this.state.notifyMessage != ''){
            warning =
            <div class="notification-message">
                <i class="fa fa-heart" aria-hidden="true"></i>
                {this.state.notifyMessage}
            </div>
        }

        return (
            <body id="login">
            <div className="container">
                <div class="row">
                <form noValidate className = 'registerForm' onSubmit={this.onSubmit}>                           
                    {warning}
                    <div className="form">

                        <div className="form-group">
                            <input type="username"
                                name="username"
                                placeholder="Type your user name"
                                value={this.state.username}
                                onChange={this.onChange} />
                        </div>
						
						<div className="form-group" style={{alignItems:'center'}}>
                            <input type="email"
                                name="email"
                                placeholder="Type your email address"
                                value={this.state.email}
                                onChange={this.onChange} />
						    <button class="Button" onClick={this.onSendCaptcha}>Send verification code</button>
                        </div>

                        
						<div className="form-group">
                            <input type="captcha"
                                name="userCaptcha"
                                placeholder="Type the verification code sent to your email"
                                value={this.state.userCaptcha}
                                onChange={this.onChange} />
                        </div>

                        <div className="form-group">
                            <input type="password"
                                name="password"
                                placeholder="Type your password"
                                value={this.state.password}
                                onChange={this.onChange} />
                        </div>

                        <div className="form-group">
                            <input type="password"
                                name="password2"
                                placeholder="Re-enter password"
                                value={this.state.password2}
                                onChange={this.onChange} />
                        </div>
                        
                        <div className="form-group">
                            <button class="button button2" type="submit">
                                Create account
                            </button>
                        </div>

                    </div>
                </form>
				
                </div>
                
                <button class="linkButton" onClick={this.backIndex}>
                    Back to Index Page
                </button>
            </div>
            </body>
        )
    }
}

export default Register