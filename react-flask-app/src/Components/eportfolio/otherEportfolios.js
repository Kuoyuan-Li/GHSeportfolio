import React from 'react'
import OtherEportfolioSelect from './otherEportfolioSelect'
//import pesudoUsers from './pseudoUsers'
import './style.css'

class OtherEportfolio extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            eportfolios : [],
            lists : []
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
        })
        //window.location.reload(false)   
        	
    }
    
    render(){
        const SelectionList = this.state.eportfolios.map(
            content =>   <OtherEportfolioSelect key = {content.userID} content = {content} viewOther = {this.viewOtherHandler}/>
        )
		      					
        return (
            <div id="view">
                <div class="container">
                    <div class="setting">
                GHS
                <button class="linkButton" onClick = {this.backToProfile}>
                <i class="fa fa-arrow-circle-o-left"></i>
                    Back To Profile
                </button>
				<button class="linkButton" onClick = {this.refetchRandom}>
                    Grab other users!
                </button>
                </div>

                <div class="content">
                {SelectionList}
                </div>
            </div></div>

        )
    }


}
export default OtherEportfolio