import React from 'react';
import { register } from './userfunction';

export class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
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

        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        register(newUser).then(res => {
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