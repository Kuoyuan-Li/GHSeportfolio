import React from 'react';
import Section from './section'
import pseudoSections from './pseudoSection'

class EportfolioEdit extends React.Component {

    constructor() {
        super()
        this.state = {
            eportfolioOwner : '',
            //infoSection: '',
            sectionNumber : pseudoSections.length,
            sections : pseudoSections,
            currentSection : null,
            message : ''
        }
        //this.componentDidMount = this.componentDidMount.bind(this)
    }

    /*componentDidMount(){
        fetch('/eportfolioEdit').
        then(res => res.json()).
        then(data => {
            this.setState({sections:data});
          })
        
    }*/

    addSectionHandler = () => {
        const blankSection = {       
            id: this.state.sectionNumber+1,
            sectionTitle:'Please enter a title',
            modules: []
        
    }
    this.setState(prevState => {
        return {
            sectionNumber: prevState.sectionNumber +1,
        }
    })
    this.setState({           
        sections: [...this.state.sections , blankSection]
     });

    }

    
    deleteSection (id){
        this.setState(prevState => ({
            sections: prevState.sections.filter(el => el.sectionID != id )
        }));
    }
    
    render() {
        const sectionItems = this.state.sections.map
            (content => <Section key={content.sectionID} content={content} deleteHandler = {this.deleteSection.bind(this)}/>)
       
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <div className = "section-list">                                      
                            {sectionItems}
                            <button type="button" onClick = {this.addSectionHandler}>Add new section</button>       
                        </div>
                    </div>
                </div>
            </div>
        )  
    }  
}

export default EportfolioEdit;