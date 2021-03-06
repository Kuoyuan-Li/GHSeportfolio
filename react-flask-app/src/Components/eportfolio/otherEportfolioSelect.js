import React from 'react'
import "./style.css"

class OtherEportfolioSelect extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            userID : this.props.content.user_id,
            username : this.props.content.username,
            sectionNumber : this.props.content.num_of_sections,
			eportfolios: this.props.eportfolios
        }
        this.viewHandler = this.viewHandler.bind(this)

    }

    /*
	componentDidMount(){
        this.setState({
            userID : this.props.content.user_id,
            username : this.props.content.username,
            sectionNumber : this.props.content.num_of_sections,
			eportfolios: this.props.eportfolios
        })
    }
	*/
    
    viewHandler () {
       this.props.viewOther(this.state.userID)
    }

	componentDidUpdate(prevProps, prevState) {
        if (prevState.eportfolios !== this.props.eportfolios) {
            this.setState({eportfolios: this.props.eportfolios})
        }
		
    }
	
	
	
    render(){

        return (
            <div>

                {this.state.userID}
                {this.state.username}
                {this.state.sectionNumber}
                

                <button className="button" onClick={this.viewHandler}>
                    View
                </button>
            </div>
        )
    }



}
export default OtherEportfolioSelect