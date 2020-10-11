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
    }

    viewOtherHandler (id) {
        this.props.history.push('/viewOtherEportfolio/'+id)
    }

    render(){
        const SelectionList = this.state.eportfolios.map(
            content => <OtherEportfolioSelect key = {content.userID} content = {content} viewOther = {this.viewOtherHandler}/>
        )
        return (
            <div>
                {SelectionList}
            </div>

        )
    }



}
export default OtherEportfolio