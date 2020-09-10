import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
        }
    }

    componentDidMount () {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)

        this.setState({
            username: decoded.identity.username,
        })
    }

    render () {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <table className="table col-md-6 mx-auto">

                        <tbody>
                            <tr>
                                <td>username</td>
                                <td>{this.state.username}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}



export default Profile