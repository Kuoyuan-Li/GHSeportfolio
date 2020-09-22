import React from 'react';
import Section from './section'
import pseudoSections from './pseudoSection'
import SectionNavbar from './sectionNavbar'

class EportfolioEdit extends React.Component {

    constructor() {
        super()
        this.state = {
            eportfolioOwner : '',
            //infoSection: '',
            sectionNumber : pseudoSections.length,
            sections : pseudoSections,
            currentSectionID : 0,
            message : ''
        }
        this.addSectionHandler = this.addSectionHandler.bind(this)
		this.deleteSection = this.deleteSection.bind(this)
		this.handleSwitch = this.handleSwitch.bind(this)
    }

    /*componentDidMount(){
        fetch('/eportfolioEdit').
        then(res => res.json()).
        then(data => {
            this.setState({sections:data});
          })
        
    }*/

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
        });
    }
	
    deleteSection (id){
		
        this.setState(prevState => {
			const currentID = id === prevState.currentSectionID ? 0 : prevState.currentSectionID
			return ({
                sections: prevState.sections.filter(el => el.sectionID !== id),
			    currentSectionID: currentID}
			
			)
		});
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