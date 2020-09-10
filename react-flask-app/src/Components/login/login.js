import React from 'react';
import { login } from './userfunction'

export class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit (e) {
        e.preventDefault()

        const user = {
            username: this.state.username,
            password: this.state.password
        }

        login(user).then(res => {
            if (!res.error) {
                this.props.history.push(`/profile`)
            }
        })

    }

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">

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