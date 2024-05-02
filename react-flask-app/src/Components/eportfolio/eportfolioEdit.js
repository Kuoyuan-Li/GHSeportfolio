import React from 'react'
import Section from './section'
import SectionNavbar from './sectionNavbar'
import {Spinner} from 'react-bootstrap'
import './style.css'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'

class EportfolioEdit extends React.Component {

    constructor() {
        super()
        this.state = {
            eportfolioOwner : localStorage.getItem('user'),
            sectionIDTitle :[],
            //infoSection: '',
            sections :[],   
            currentSectionID : 0,
            message : '',
            loading : true
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.addSectionHandler = this.addSectionHandler.bind(this)
		this.deleteSection = this.deleteSection.bind(this)
		this.handleSwitch = this.handleSwitch.bind(this)
		this.backProfile = this.backProfile.bind(this)
		this.editAboutMe = this.editAboutMe.bind(this)
    }

    async componentDidMount(){
        const loginguser = localStorage.getItem('user')  
        if (!loginguser){
          this.props.history.push('/login')
        }

        const userID = localStorage.getItem('userID')
        await fetch ('http://127.0.0.1:5000/getSections',{
            mode: 'cors',
            method : 'POST',
			headers :{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userID
            })
        }).then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then((response) => {
            //response: a list of sectionID + sectionTitle
            this.setState({sectionIDTitle: response.list});							
        })
        if (this.state.sectionIDTitle.length > 0){
            this.setState({
                currentSectionID:this.state.sectionIDTitle[0].section_id
            })
        }
        
        for (var i = 0; i < this.state.sectionIDTitle.length; i++) {
            var thisID = this.state.sectionIDTitle[i].section_id			
            var thisTitle = this.state.sectionIDTitle[i].title
            //section structure
            var thisSection = {
                sectionID : thisID,
                sectionTitle : thisTitle,
                modules : []
            }
            this.setState({           
                sections: [...this.state.sections , thisSection]
            })           
        }
        
        this.setState({
            loading : false
        })
    }
    

    addSectionHandler () {
        var blankSection = {       
            //sectionID: this.state.sectionNumber + 1,
            sectionID : 0,    
            sectionTitle:'new section',
            modules: []       
        }
        
        const userID = localStorage.getItem('userID')		
		//fetch api and store in DB: userID, section
        fetch ('http://127.0.0.1:5000/addSection',{
            mode: 'cors',
            method : 'POST',
			headers :{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userID
            })
        }).then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
			if(response.success){
                this.setState({ message : "add section success"})
                blankSection.sectionID = response.section_id
                this.setState({           
                    sections: [...this.state.sections , blankSection]
                })
            }
        })
    }
	
    deleteSection (id){		
        this.setState(prevState => {
			const currentID = id === prevState.currentSectionID ? 0 : prevState.currentSectionID
			return ({
                sections: prevState.sections.filter(el => el.sectionID !== id),
                currentSectionID: currentID
            })
        });
        //inform backend delete module: sectionID XXX, moduleID: XXx
        fetch ('http://127.0.0.1:5000/deleteSection',{
                mode: 'cors',
                method : 'POST',
                headers :{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    section_id: id
                })
            }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                if(response.success){
                    this.setState({ message : "delete section success"})
                }
                console.log(this.state.message)
            })
        
    }
	
	handleSwitch (id) {
		this.setState({currentSectionID: id})
	}
	
	backProfile(e){
        this.props.history.push(`/profile`)
    }
	
	editAboutMe(e) {
		this.props.history.push(`/aboutMe`)
	}
    
    render() {
        const sectionItems = this.state.sections.map
            (content => {
				return (
				    content.sectionID === this.state.currentSectionID ?
					<Section key={content.sectionID} content={content} deleteHandler = {this.deleteSection.bind(this)}/> :
				    null
				)
			})

        return (
            
            <div id="eportfolio">
                <div className="container">
                <div class="setting">
                GHS
                <button class="linkButton" onClick={this.backProfile}>
                <i class="fa fa-arrow-circle-o-left"></i>
                    Back to Home Page
                </button> </div>
                    { this.state.loading ?  <Spinner animation = "border"/> :
                    <div class="content">
                    <SectionNavbar currentSectionID={this.state.currentSectionID} sections={this.state.sections} handleSwitch={this.handleSwitch} />
                    <button class="button add-button" onClick = {this.addSectionHandler}>
                    <i class="fa fa-plus" aria-hidden="true"></i>
                        Add new section</button>
                    
                        {sectionItems}
                    </div>
                    }
                </div>
            </div>
        )  
    }  
}

export default EportfolioEdit;