import React from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import {Breadcrumb, Button} from 'react-bootstrap';
import './style.scss'


class SectionNavbar extends React.Component {
    constructor (props) {
	    super(props)
		this.state = {
			sections: this.props.sections,
			currentSectionID: this.props.currentSectionID
		}
		this.componentDidUpdate = this.componentDidUpdate.bind(this)
	}
	
	
	componentDidUpdate(prevProps, prevState) {
        if (prevState.sections !== this.props.sections) {
            this.setState({sections: this.props.sections})
        }
		if (prevState.currentSectionID !== this.props.currentSectionID) {
            this.setState({currentSectionID: this.props.currentSectionID})
        }
		console.log(this.state.currentSectionID)
    }
	

	render () {
		const sectionItems = this.state.sections.map(content => {  
			
			return (
			    <div class="section-group">
				    <div class="item">
			            <button class="button section-button"
						    key={content.sectionID}
					        style={{backgroundColor: content.sectionID === this.state.currentSectionID ? '#41403E' : "transparent",
							        color: content.sectionID === this.state.currentSectionID ? 'white' : "#41403E"}}
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