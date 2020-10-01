import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'

export class Logout extends React.Component {
    constructor() {
        super()
    }

    
	// when users click logout button on navbar, they are directed to this page when then immediately send them to login page
	componentDidMount(){
		localStorage.clear()
        this.props.history.push(`/login`)
	}
    

    render () {
        return (
            <div className="container">
                <h1>You are logging out...</h1>
            </div>
        )
    }
}

export default Logout