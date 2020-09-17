import React from 'react';


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
                else {
                    const loggedInUsername  = this.state.username;
                    localStorage.setItem('user', loggedInUsername);
                    this.props.history.push(`/profile`)
                }

            })


        }else{
            this.setState({message:'Please enter all required information'})

        }
    }

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <div> 
                            <p>
                                {this.state.message}
                            </p>    
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>

                            <div className="form-group">
                                <label htmlFor="username">Username</label>

                                <input type="username"
                                    className="form-control"
                                    name="username"
                                    placeholder="Type your user name"
                                    value={this.state.username}
                                    onChange={this.onChange} />

                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password </label>

                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Type your password"
                                    value={this.state.password}
                                    onChange={this.onChange} />

                            </div>

                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Log in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login