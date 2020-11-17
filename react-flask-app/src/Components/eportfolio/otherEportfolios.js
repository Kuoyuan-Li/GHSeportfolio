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
        await fetch ('http://47.115.90.152:5000/getRandomUsers',{
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
        this.setState({ 
            message : ''
        })
		await fetch ('http://47.115.90.152:5000/getRandomUsers',{
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
		fetch ('http://47.115.90.152:5000/getUser',{
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
                this.setState({ 
                    eportfolios: response.user,
                    message : ''
                })
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
            content =>   <div class="list" key = {content.userID}>

                             <div style={{float:"left", width:"33%"}}>{content.username}</div>
                             <div style={{float:"left", width:"33%"}}>{content.num_of_sections}</div>
                

                             <button class="button" onClick={(e) => this.viewOtherHandler(e, content.user_id)}>
                                 View
                             </button>
							 <hr/>
                         </div>
        )
		      					
        return (
            <div id="eportfolio">
                <div class="container">
                    <div class="setting">
                GHS
                <button class="linkButton" onClick = {this.backToProfile}>
                <i class="fa fa-arrow-circle-o-left"></i>
                    Back To Profile
                </button>
				
				
				
				    
                    <input type="username"
                        name="username"
                        placeholder="Search by username"
                        value={this.state.username}
                        onChange={this.onChange} />
                    
                    <button class="searchButton" onClick={this.onSubmit}>
                        <i class="fa fa-search"></i>
                    </button>
                    
				
				<button class="linkButton" onClick = {this.refetchRandom}>
                <i class="fa fa-refresh"></i>
                    Grab other users!
                </button>
				</div>

				{warning}

                <div class="content">
				    <div class="title">
					    <p>Username</p>
                        <p class="center">#sections</p>
						<p>Click to view</p>
				    </div>
                        <hr style={{height:2}} />
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