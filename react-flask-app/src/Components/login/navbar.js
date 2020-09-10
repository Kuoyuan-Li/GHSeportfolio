import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'



class Navbar extends Component {
/*
    logOut (e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push(`/`)
    }
    
    <li className="nav-item">
        <a href="#" onClick={this.logOut.bind(this)} className="nav-link">Logout</a>
    </li>
*/

    render () {
        const loginRegLink = (
            <ul className="navbar-nav">

                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        Register
                    </Link>
                </li>

            </ul>
        )

        const userLink = (
            <ul className="navbar-nav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/profile" className="nav-link">User</Link>
                    </li>

                    
                </ul>
            </ul>
        )


        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">

                <div className="collapse navbar-collapse justify-content-md-center"
                    id="navbar1">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                    </ul>

                    {localStorage.usertoken ? userLink : loginRegLink}
                </div>

            </nav>
        )
    }
}

export default withRouter(Navbar)