import React from 'react';

export class Logout extends React.Component {
    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick (e) {
        const logoutReq = 'Logout'
        fetch ('http://localhost:5000/logout',{
                mode: 'cors',
                method : 'POST',
                headers :{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    request: logoutReq
                })
            }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => {               
                    this.props.history.push(`/login`)
                }
            )          
    }


    

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <button type = "button" onClick={this.handleClick} className="btn btn-lg btn-primary btn-block">
                                Logout
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Logout