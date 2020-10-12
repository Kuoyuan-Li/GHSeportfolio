import React from 'react';
import './style.scss'

export class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
			email_confirmed: '',
            password: '',
            password2 :'',
			captcha:'',
			userCaptcha:'',
            message :''
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
		fetch ('http://localhost:5000/emailCaptcha',{
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
                this.setState({ message : response.nonValidMessage })
				
            } else {
                this.setState({captcha: response.captcha})
				this.setState({email_confirmed: this.state.email})
				this.setState({message: response.nonValidMessage })
            }

	    })
	}

    onSubmit (e) {
        e.preventDefault()
        
        if (this.state.username !== '' && 
		    this.state.email !== '' && 
			this.state.password !== '' && 
			this.state.password2 !== '' &&
		    this.state.captcha === this.state.userCaptcha &&
			this.state.email === this.state.email_confirmed)  {
            
            const newUser = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                password2 : this.state.password2
            }
            this.setState({message:''})
            fetch ('http://localhost:5000/register',{
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
			if (this.state.email !== this.state.email_confirmed) {
				this.setState({message:'Please keep your email unchanged'})
			} else if (this.state.captcha !== this.state.userCaptcha) {
				this.setState({message:'Please enter the right captcha'})
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
        if(this.state.message === ''){
             warning = <div></div>;
        } else{
            warning =
            <div class="warning-message">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            {this.state.message}
            </div>
        }
        return (
            <body id="login">
            <div className="container">
                <div class="row">
                <form noValidate className = 'registerForm' onSubmit={this.onSubmit}>                           
                    {warning}
                    <div className="form form2">

                        <div className="form-group">
                            <input type="username"
                                className="form-control"
                                name="username"
                                placeholder="Type your user name"
                                value={this.state.username}
                                onChange={this.onChange} />
                        </div>
						
						<div className="form-group">
                            <input type="email"
                                className="form-control"
                                name="email"
                                placeholder="Type your email address"
                                value={this.state.email}
                                onChange={this.onChange} />
						    
                        </div>

                        
						<div className="form-group">
                            <input type="captcha"
                                className="form-control"
                                name="userCaptcha"
                                placeholder="Type the captcha we sent to your email"
                                value={this.state.userCaptcha}
                                onChange={this.onChange} />
						    <button onClick={this.onSendCaptcha}>send captcha</button>
                        </div>

                        <div className="form-group">
                            <input type="password"
                                className="form-control"
                                name="password"
                                placeholder="Type your password"
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