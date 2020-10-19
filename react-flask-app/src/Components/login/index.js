import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

class Index extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        }

    componentDidMount () {
        const loginguser = localStorage.getItem('user')
        if (loginguser){
            this.props.history.push(`/profile`)
        }
    }

    login (e) {
        this.props.history.push(`/login`)
    }

    register (e) {
        this.props.history.push(`/register`)
    }

    render () {
        return (
            <body id="login">
                <div class="container">
                    <div class="col-md-12">
                        <h3>Eportfolio System</h3>

                        <div class="col-md-12">
                            <button class="button button1" onClick={this.login}>
                                Log in
                            </button>
                        </div>

                        <div class="col-md-12">
                            <button class="button button2" onClick={this.register}>
                                New user? Register Now!
                            </button>
                        </div>
                    </div>
                </div>
            </body>
        )
    }

        
    

}



export default Index