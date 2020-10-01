import React from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import {Breadcrumb, Button} from 'react-bootstrap';
import pseudoSections from "./pseudoSection"
import './style.scss'


class SectionNavbar extends React.Component {
    constructor (props) {
	    super(props)
		this.state = {
			sections: this.props.sections,
			currentSectionID: this.props.currentSectionID
		}
	}
	
	componentDidUpdate(prevProps, prevState) {
        if (prevState.sections !== this.props.sections) {
            this.setState({sections: this.props.sections})
        }
		if (prevState.currentSectionID !== this.props.currentSectionID) {
            this.setState({currentSectionID: this.props.currentSectionID})
        }
		
    }

	render () {
		const sectionItems = this.state.sections.map(content => {  
			const sectionColor = (content.sectionID === this.state.currentSectionID ? 'red' : 'white')
			return (
			    <div class="section-group">
				    <div class="item">
			            <button class="button section-button"
						    key={content.sectionID}
					        //style={{color: content.sectionID === this.state.currentSectionID ? 'red' : 'white'}}
						    onClick={(event) => this.props.handleSwitch(content.sectionID)}
						    //className="btn btn-lg btn-primary btn-block"
							>
                        
						    {content.sectionTitle}
                        </button>
				    </div>
		    </div>)})
			
	    
		
		return (
		    <div class="section-list">
				{sectionItems}</div>
		)
		
	}
}


export default withRouter(SectionNavbar)