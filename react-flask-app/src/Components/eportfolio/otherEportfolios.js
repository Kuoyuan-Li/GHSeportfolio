import React from 'react'
import OtherEportfolioSelect from './otherEportfolioSelect'
import pesudoUsers from './pseudoUsers'

class OtherEportfolio extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            eportfolios : pesudoUsers
        }
        this.viewOtherHandler = this.viewOtherHandler.bind(this)
        this.backToProfile = this.backToProfile.bind(this)
    }

    viewOtherHandler (id) {
        this.props.history.push('/viewOtherEportfolio/'+id)
    }

    backToProfile () {
        this.props.history.push('/profile')
    }

    render(){
        const SelectionList = this.state.eportfolios.map(
            content => <OtherEportfolioSelect key = {content.userID} content = {content} viewOther = {this.viewOtherHandler}/>
        )
        return (
            <div>
                <button onClick = {this.backToProfile}>
                    Back To Profile
                </button>
                {SelectionList}
            </div>

        )
    }



}
export default OtherEportfolio