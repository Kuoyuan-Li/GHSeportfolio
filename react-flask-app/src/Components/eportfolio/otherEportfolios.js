import React from 'react'
import OtherEportfolioSelect from './otherEportfolioSelect'
//import pesudoUsers from './pseudoUsers'
import './style.css'

class OtherEportfolio extends React.Component {
    constructor(props){
        super(props)
        this.state = {
			username: '',
            eportfolios : [],
			message: ''
            //lists : []
        }
        this.viewOtherHandler = this.viewOtherHandler.bind(this)
        this.backToProfile = this.backToProfile.bind(this)
		this.componentDidMount = this.componentDidMount.bind(this)
        this.refetchRandom = this.refetchRandom.bind(this)
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
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
	
	
     
    viewOtherHandler (e, id) {
		e.preventDefault()
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
			console.log(response)
            this.setState({eportfolios: response});	          		
        })
        //window.location.reload(false)   
    }
	
	onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }
	
	onSubmit (e) {
		console.log(this.state.username)
		e.preventDefault()
		// url tbd
		fetch ('http://localhost:5000/getUser',{
            mode: 'cors',
            method : 'POST',
			headers :{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username
            })
        }).then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then((response) => {
            if (response.validity !== true) {
                this.setState({ message : response.nonValidMessage })
			} else {
				console.log(response.user)
                this.setState({ eportfolios: response.user})
			}        		
        })
		
	}
	
	
    
    render(){
        let warning;
        if(this.state.message === ''){
             warning = <div></div>;
        } else{
            warning =
            <div class="warning-message">
            <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
            {this.state.message}
            </div>
        }
		
		
		let SelectionList = this.state.eportfolios.map(
            content =>   <div key = {content.userID}>

                             {content.username}
                             {content.num_of_sections}
                

                             <button className="button" onClick={(e) => this.viewOtherHandler(e, content.user_id)}>
                                 View
                             </button>
							 <hr/>
                         </div>
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
				
				
				
				    
                        <input type="username"
                               name="username"
                               placeholder="Enter Username"
                               value={this.state.username}
                               onChange={this.onChange} />
                    
					
					
                        <button onClick={this.onSubmit}>
                            Search
                        </button>
                    
				
				
				{warning}
				
				
                </div>

                <div class="content">
				    <div display={{display:'flex'}}>
					    <p>username</p>
						<p>#sections</p>
						<p>click to view</p>
				    </div>
                    {SelectionList}
                </div>
            </div>
			</div>

        )
    }


}
export default OtherEportfolio

/*
<OtherEportfolioSelect key = {content.userID} eportfolios = {this.state.eportfolios} content = {content} viewOther = {this.viewOtherHandler}/>
*/