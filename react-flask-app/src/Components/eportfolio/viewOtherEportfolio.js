import React from 'react';
import SectionView from './sectionView'
import SectionNavbar from './sectionNavbar'
import { Spinner } from 'react-bootstrap';
import "./style.css"

class ViewOtherEportfolio extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            eportfolioOwnerID : this.props.match.params.id,
            sectionIDTitle : [],
            sections : [],
            currentSectionID : 0,
            message : '',
            loading : true
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.handleSwitch = this.handleSwitch.bind(this)
		this.backViewList = this.backViewList.bind(this)
    }

    async componentDidMount(){
        const userID =  this.state.eportfolioOwnerID
        await fetch ('http://47.115.90.152:5000/getSections',{
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
                modules : null
            }
            await fetch ('http://47.115.90.152:5000/getModules',{
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
        this.setState({
            loading : false
        })
		
       
    }
    
	
	handleSwitch (id) {
		this.setState({currentSectionID: id})		
	}
	
	backViewList(e){
        this.props.history.push(`/OtherEportfolio`)
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
            <body id="eportfolio">
                <div class="setting">
                GHS
                <button class="linkButton" onClick={this.backViewList}>
                <i class="fa fa-arrow-circle-o-left"></i>
                    View Others Eportfolio
                </button> </div>

            <div class="content">
                {this.state.loading ? <Spinner animation = "border"/> :
                    <div>
                    <SectionNavbar currentSectionID={this.state.currentSectionID} sections={this.state.sections} handleSwitch={this.handleSwitch} />		
                    
                            <div className = "section-list">                                      
                                
                                {sectionItems}
                                    
                            </div>
                    </div>
                }
            </div></body>
        )  
    }  
}

export default ViewOtherEportfolio;