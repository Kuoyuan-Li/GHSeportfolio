import React from 'react'

class OtherEportfolioSelect extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            userID : this.props.content.user_id,
            username : this.props.content.username,
            sectionNumber : this.props.content.num_of_sections
        }
        this.viewHandler = this.viewHandler.bind(this)

    }

    viewHandler () {
       this.props.viewOther(this.state.userID)
    }

	 
	
	
    render(){

        return (
            <div>
                <button className="button" onClick={this.viewHandler}>
                    View
                </button>
            </div>
        )
    }



}
export default OtherEportfolioSelect