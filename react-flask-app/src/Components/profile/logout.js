import React from 'react';

export class Logout extends React.Component {
    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick (e) {
        localStorage.clear();    
        this.props.history.push(`/`)     
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