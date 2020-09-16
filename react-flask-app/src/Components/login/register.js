import React from 'react';

export class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            password: '',
            password2 :'',
            message :''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit (e) {
        e.preventDefault()
        
        if (this.state.username !== '' && this.state.email !== '' && this.state.password !== '' && this.state.password2 !== '')  {
            
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
                }
                else {
                    this.props.history.push(`/login`)
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
                                <label htmlFor="email">Email Address</label>

                                <input type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Type your email address"
                                    value={this.state.email}
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

                            <div className="form-group">
                                <label htmlFor="password2">Re-enter Password  </label>

                                <input type="password"
                                    className="form-control"
                                    name="password2"
                                    placeholder="Re-enter password"
                                    value={this.state.password2}
                                    onChange={this.onChange} />

                            </div>

                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Create account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register