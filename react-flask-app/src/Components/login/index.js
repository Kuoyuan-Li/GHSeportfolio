import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
    constructor() {
        super();
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
    }

    login (e) {
        this.props.history.push(`/login`)
    }

    register (e) {
        this.props.history.push(`/register`)
    }

    render () {

        return (        
            <div className="container">
                <div className="col-md-6 mt-5 mx-auto">
                    <button onClick={this.login} className="btn btn-lg btn-primary btn-block">
                        Log in
                    </button>
                </div>
                
                <div className="col-md-6 mt-5 mx-auto">
                    <button onClick={this.register} className="btn btn-lg btn-primary btn-block">
                        Create an account
                    </button>
                </div>
                
            </div>
        )
    }

}



export default Home