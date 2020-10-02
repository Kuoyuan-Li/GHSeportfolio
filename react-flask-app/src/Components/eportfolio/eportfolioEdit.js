import React from 'react';
import Section from './section'
import SectionNavbar from './sectionNavbar'
import AboutMe from './aboutMe'
import './style.scss'
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
            message : ''
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.addSectionHandler = this.addSectionHandler.bind(this)
		this.deleteSection = this.deleteSection.bind(this)
		this.handleSwitch = this.handleSwitch.bind(this)
		this.backProfile = this.backProfile.bind(this)
		this.editAboutMe = this.editAboutMe.bind(this)
    }

    async componentDidMount(){
        const userID = localStorage.getItem('userID')
        await fetch ('http://localhost:5000/sectionIDs',{
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
        console.log(this.state.sectionIDTitle)


         for (var i = 0; i < this.state.sectionIDTitle.length; i++) {
            var thisID = this.state.sectionIDTitle[i].section_id
            var thisTitle = this.state.sectionIDTitle[i].title
            //section structure
            var thisSection = {
                sectionID : thisID,
                sectionTitle : thisTitle,
                modules : null
            }
            await fetch ('http://localhost:5000/getSection',{
                mode: 'cors',
                method : 'POST',
				headers :{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    section_id : thisID
                })
            }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then((response) => {
                //response: a list of sectionIDs
                thisSection.modules = response.list
                this.setState({           
                    sections: [...this.state.sections , thisSection]
                })
            })
            
        }
		
       
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
        fetch ('http://localhost:5000/addSection',{
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
        fetch ('http://localhost:5000/deleteSection',{
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
		console.log(this.state.currentSectionID)
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
            <div id="edit">
            <div className="container">
			    <button onClick={this.backProfile}>
                    Back to Home Page
                </button>
				<button onClick={this.editAboutMe}>
                    Edit your basic info
                </button>
				<SectionNavbar currentSectionID={this.state.sectionID} sections={this.state.sections} handleSwitch={this.handleSwitch} />
                <button class="button add-button" onClick = {this.addSectionHandler}>
                <i class="fa fa-plus" aria-hidden="true"></i>
                    Add new section</button>
				
					{sectionItems}
            </div></div>
        )  
    }  
}

export default EportfolioEdit;