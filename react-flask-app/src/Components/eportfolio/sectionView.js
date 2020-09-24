import React from 'react';
import ModuleView from './moduleView'
import pseudoModules from "./pseudoModules"

class SectionView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            sectionID : props.content.sectionID,
            moduleNumber : props.content.modules.length,
            sectionTitle : props.content.sectionTitle,
            modules : props.content.modules,
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
    
    
    

    render() {
        const moduleItems = this.state.modules.map
            (content => <ModuleView key={content.id} content={content} parentSectionID = {this.state.sectionID} />)
       
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <div className = "section-list">
                            {moduleItems}
                            
                        </div>
                    </div>
                </div>
            </div>
        )  
    }  
}

export default SectionView;