import React from 'react';
import SectionView from './sectionView'
import pseudoSections from './pseudoSection'
import SectionNavbar from './sectionNavbar'

class EportfolioView extends React.Component {

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
        this.handleSwitch = this.handleSwitch.bind(this)
    }

    /*componentDidMount(){
        fetch('/eportfolioEdit').
        then(res => res.json()).
        then(data => {
            this.setState({sections:data});
          })
        
    }*/

    
	
	handleSwitch (id) {
		this.setState({currentSectionID: id})
		console.log(this.state.currentSectionID)
	}
    
    render() {
        const sectionItems = this.state.sections.map
            (content => {
				return (
				    content.sectionID === this.state.currentSectionID ?
					<SectionView key={content.sectionID} content={content} /> :
				    null
				)
			})
       
        return (
            <div className="container">
			    
				<SectionNavbar currentSectionID={this.state.sectionID} sections={this.state.sections} handleSwitch={this.handleSwitch} />
                
				
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

export default EportfolioView;