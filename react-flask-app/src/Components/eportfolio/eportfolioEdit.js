import React from 'react';
import Section from './section'
import SectionNavbar from './sectionNavbar'

class EportfolioEdit extends React.Component {

    constructor() {
        super()
        this.state = {
            eportfolioOwner : localStorage.getItem('user'),
            sectionIDTitle : [],
            //infoSection: '',
            sectionNumber : 0,
            sections : [],
            currentSectionID : 0,
            message : ''
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.addSectionHandler = this.addSectionHandler.bind(this)
		this.deleteSection = this.deleteSection.bind(this)
		this.handleSwitch = this.handleSwitch.bind(this)
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
			console.log(response.list)
            this.setState({sectionIDTitle: response.list});
				
				
        })
         

        console.log(this.state.sectionIDTitle)


         for (var i = 0; i < this.state.sectionIDTitle.length; i++) {
            var thisID = this.state.sectionIDTitle[i].section_id
            var thisTitle = this.state.sectionIDTitle[i].title
            var thisSection = {
                sectionID : thisID,
                moduleNumber : 0,
                sectionTitle : thisTitle,
                modules : null,
                message : ''
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
                thisSection.moduleNumber = response.list.length
                this.setState({           
                    sections: [...this.state.sections , thisSection]
                })
            })
            
        }
		
		console.log(this.state.sections[32])
       
    }
    

    addSectionHandler () {
        const blankSection = {       
            //sectionID: this.state.sectionNumber + 1,
            sectionTitle:'new section',
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
        const userID = localStorage.getItem('userID')
        console.log(userID)
		
		//fetch api and store in DB: userID, section
        fetch ('http://localhost:5000/addSection',{
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
        .then(response => {
			if(response.success){
                this.setState({ message : "add section success"})
            }
            console.log(this.state.message)
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