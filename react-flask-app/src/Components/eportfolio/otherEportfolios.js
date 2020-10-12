import React from 'react'
import OtherEportfolioSelect from './otherEportfolioSelect'
//import pesudoUsers from './pseudoUsers'

class OtherEportfolio extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            eportfolios : []
        }
        this.viewOtherHandler = this.viewOtherHandler.bind(this)
        this.backToProfile = this.backToProfile.bind(this)
		this.componentDidMount = this.componentDidMount.bind(this)
		this.refetchRandom = this.refetchRandom.bind(this)
    }

    async componentDidMount(){
        await fetch ('http://localhost:5000/getRandomUsers',{
            mode: 'cors',
            method : 'POST'
        }).then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then((response) => {
            //response: a list of sectionID + sectionTitle
            this.setState({eportfolios: response});	
            console.log(this.state.eportfolios)			
        })
    }
	
	
     
    viewOtherHandler (id) {
        this.props.history.push('/viewOtherEportfolio/'+ id)
    }

    backToProfile () {
        this.props.history.push('/profile')
    }
	
	async refetchRandom() {
		await fetch ('http://localhost:5000/getRandomUsers',{
            mode: 'cors',
            method : 'POST'
        }).then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then((response) => {
            //response: a list of sectionID + sectionTitle
            this.setState({eportfolios: response});	
            console.log(this.state.eportfolios)			
        })
	}

    render(){
        const SelectionList = this.state.eportfolios.map(
            content =>   <div>
			
			               {content.user_id}
                           {content.username}
                           {content.num_of_sections}
                           <button className="button" onClick={this.viewOtherHandler(content.user_id)}>
                               View
                           </button>
						 </div>
        )
		
		
		
		
		
        return (
            <div>
                <button onClick = {this.backToProfile}>
                    Back To Profile
                </button>
				<button onClick = {this.refetchRandom}>
                    Grab other users!
                </button>
                {SelectionList}
            </div>

        )
    }



}
export default OtherEportfolio

/*
<OtherEportfolioSelect key = {content.userID} content = {content} viewOther = {this.viewOtherHandler}/>
<div>
                           {content.user_id}
                           {content.username}
                           {content.num_of_sections}
                           <button className="button" onClick={this.viewOtherHandler(content.user_id)}>
                               View
                           </button>
                       </div>
*/