import React from 'react';
import './style.scss'

export class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            message : ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.backIndex = this.backIndex.bind(this)
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

    onSubmit (e) {
        e.preventDefault()

        if (this.state.username !== '' && this.state.password !== ''){
            const user = {
                username: this.state.username,
                password: this.state.password
            }
            this.setState({message:''})

            fetch ('http://localhost:5000/login',{
                mode: 'cors',
                method : 'POST',
                headers :{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: user.username,
                    password: user.password
                })
            }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                if (response.validity !== true) {
                    this.setState({ message : response.nonValidMessage })
                }
                /* else {
                    const loggedInUsername  = this.state.username;
                    localStorage.setItem('user', loggedInUsername);
                    this.props.history.push(`/profile`)
                }*/
                this.props.history.push(`/profile`)
            })


        }else{
            this.setState({message:'Please enter all required information'})

        }
    }

    backIndex(e){
        this.props.history.push(`/`)
    }

    render () {
        return (
            <div className="container">
                <div class="row">
                        <form noValidate onSubmit={this.onSubmit}>
                            <div class="warning-message">
                                <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                                {this.state.message}
                            </div>
                        <div className="form form1">    
                            <div className="form-group">
                                <input type="username"
                                    name="username"
                                    placeholder="Type your user name"
                                    value={this.state.username}
                                    onChange={this.onChange}/>
                            </div>

                            <div className="form-group">
                                
                                <input type="password"
                                    name="password"
                                    placeholder="Type your password"
                                    value={this.state.password}
                                    onChange={this.onChange} />

                            </div>

                            <button class="button button1" type="submit">
                                Log in
                            </button>
                            </div>
                        </form>
                </div>
                
                <button class="linkButton" onClick={this.backIndex}>
                    Back to Index Page
                </button>
            </div>
        )
    }
}

export default Login