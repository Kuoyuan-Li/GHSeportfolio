import React from 'react';
import SectionView from './sectionView'
import SectionNavbar from './sectionNavbar'

class EportfolioView extends React.Component {

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
        this.handleSwitch = this.handleSwitch.bind(this)
		this.backProfile = this.backProfile.bind(this)
    }

    componentDidMount(){
        const userID = localStorage.getItem('UserID')
        fetch ('http://localhost:5000/sectionIDs',{
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
            console.log(response.data)
            //response: a list of sectionID + sectionTitle 
            //this.setState({
                //sectionIDTitle : response.list
            //})
         })

         //console.log(this.state.sectionIDTitle)


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
            fetch ('http://localhost:5000/getSection',{
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
                thisSection.modules = response
                thisSection.moduleNumber = response.length
                this.setState({           
                    sections: [...this.state.sections , thisSection]
                })
            })

        }
       
    }
    
	
	handleSwitch (id) {
		this.setState({currentSectionID: id})
		console.log(this.state.currentSectionID)
	}
	
	backProfile(e){
        this.props.history.push(`/profile`)
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
			    <button onClick={this.backProfile}>
                    Back to Home Page
                </button>
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