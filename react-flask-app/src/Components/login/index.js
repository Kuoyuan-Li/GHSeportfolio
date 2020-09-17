import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Index extends Component {
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

            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <img alt="Bootstrap Image Preview" src="https://www.layoutit.com/img/sports-q-c-140-140-3.jpg" />
                        <h3>
                            Eportfolio System
                        </h3>
                        <div class="row">
                            <div class="col-md-12">
                                <button onClick={this.login} className="btn btn-lg btn-primary btn-block">
                                    Log in
                                </button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                
                                <button onClick={this.register} className="btn btn-lg btn-primary btn-block">
                                    New user? Register Now!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

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



export default Index