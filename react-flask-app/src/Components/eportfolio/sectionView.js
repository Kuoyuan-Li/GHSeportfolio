import React from 'react';
import ModuleView from './moduleView'


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
    }


    
    
    

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