import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'

class ResetPassword extends Component {
    

    


    render () {
        return (
            <div className="container">
                <h1>You can reset your password here!</h1>
            </div>
        )
    }
}



export default withRouter(ResetPassword)