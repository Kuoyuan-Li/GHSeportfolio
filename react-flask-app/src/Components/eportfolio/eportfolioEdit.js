import React from 'react';
import Section from './section'
import pseudoSections from './pseudoSection'
import SectionNavbar from './sectionNavbar'

class EportfolioEdit extends React.Component {

    constructor() {
        super()
        this.state = {
            eportfolioOwner : localStorage.getItem('user'),
            sectionIDs : [],
            aSection : null,
            //infoSection: '',
            sectionNumber : 0,//pseudoSections.length,
            sections : [],//pseudoSections,
            currentSectionID : 0,
            message : ''
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.addSectionHandler = this.addSectionHandler.bind(this)
		this.deleteSection = this.deleteSection.bind(this)
		this.handleSwitch = this.handleSwitch.bind(this)
    }

    componentDidMount(){
        fetch ('http://localhost:5000/sectionIDs',{
            mode: 'cors',
            method : 'POST',
            body: JSON.stringify({
                username: this.state.eportfolioOwner
            })
        }).then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then((response) => {
            //response: a list of sectionIDs
            this.setState({sectionIDs : response.sectionIDs})
         })


         for (var i = 0; i < this.state.sectionIDs.length; i++) {
            var thisID = this.state.sectionIDs[i]
        
            fetch ('http://localhost:5000/section',{
                mode: 'cors',
                method : 'POST',
                body: JSON.stringify({
                    username: this.state.eportfolioOwner,
                    sectionID : thisID
                })
            }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then((response) => {
                //response: a list of sectionIDs
                this.setState({           
                    sections: [...this.state.sections , response.section]
                })
            })

        }
        
    }

    addSectionHandler () {
        const blankSection = {       
            sectionID: this.state.sectionNumber + 1,
            sectionTitle:'Please enter a title',
            modules: []
        
        }
        
		this.setState(prevState => {
            return (
			    {sectionNumber: prevState.sectionNumber + 1}
            )
        })
        
		this.setState({           
            sections: [...this.state.sections , blankSection]
        })

        //fetch api and store in DB: userID, section
        fetch ('http://localhost:5000//addSection',{
            mode: 'cors',
            method : 'POST',
            body: JSON.stringify({
                username: this.state.eportfolioOwner,
                sectionID : blankSection.sectionID
            })
        }).then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then((response) => {
            //response: a list of sectionIDs
            this.setState({message : response.message})
         })

    }
	
    deleteSection (id){
		
        this.setState(prevState => {
			const currentID = id === prevState.currentSectionID ? 0 : prevState.currentSectionID
			return ({
                sections: prevState.sections.filter(el => el.sectionID !== id),
			    currentSectionID: currentID}
			
			)
        });

        const loginguser = localStorage.getItem('user')
        //inform backend delete module: sectionID XXX, moduleID: XXx
        fetch ('http://localhost:5000/deleteSection',{
                mode: 'cors',
                method : 'POST',
                headers :{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName : loginguser,
                    sectionID: id
                })
            }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                this.setState({ message : response.message})
                console.log(this.state.message)
            })
        
    }
	
	handleSwitch (id) {
		this.setState({currentSectionID: id})
		console.log(this.state.currentSectionID)
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
            <div className="container">
			    
				<SectionNavbar currentSectionID={this.state.sectionID} sections={this.state.sections} handleSwitch={this.handleSwitch} />
                <button type="button" onClick = {this.addSectionHandler}>Add new section</button>
				
				<div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <div className = "section-list">                                      
                            
							{sectionItems}
                                   
                        </div>
                    </div>
                </div>
            </div>
        )  
    }  
}

export default EportfolioEdit;