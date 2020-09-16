import React, { Component } from 'react'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            loading : true,
            username: '',
            
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.jump = this.jump.bind(this)
        this.jumpToEdit= this.jumpToEdit.bind(this)
        this.jumpToView = this.jumpToView.bind(this)
    }

    componentDidMount () {
        fetch ('http://localhost:5000/profile')
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            this.setState({
                loading : false,
                username : response.uname
            })
            if (this.state.username === ''){
                this.props.history.push(`/`)
            }
            
        })
    }


    jumpToView (e){

    }

    jumpToEdit (e){
            

    }

    jump(e){
        
    }

    


    render () {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    
                    <table className="table col-md-6 mx-auto">
                        {this.state.isLoading ?
                            <h1>Loading...</h1> :
                            <tbody>
                                <tr>
                                <td>Hi, {this.state.username}, welcome to your profile page!</td>
                                
                                </tr>
                            </tbody>}
                    </table>


                </div>

                <div className="col-md-6 mt-5 mx-auto">
                    <button onClick={this.jumpToView} className="btn btn-lg btn-primary btn-block">
                        View your eportfolio
                    </button>
                </div>
                
                <div className="col-md-6 mt-5 mx-auto">
                    <button onClick={this.jumpToEdit} className="btn btn-lg btn-primary btn-block">
                        Create/Edit your eportfolio
                    </button>
                </div>

                <div className="col-md-6 mt-5 mx-auto">
                    <button onClick={this.jump} className="btn btn-lg btn-primary btn-block">
                        View others eportfolio
                    </button>
                </div>
            </div>
        )
    }
}



export default Profile