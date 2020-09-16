import React from 'react';
import Section from './section'

class eportfolioEdit extends React.Component {

    constructor() {
        super()
        this.state = {
            eportfolioOwner : '',
            sections : [],
            message : ''
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount(){
        fetch('/eportfolioEdit').
        then(res => res.json()).
        then(data => {
            this.setState({sections:data});
          })
        
    }
    
    render() {
        const sectionItems = this.state.sections.map(item => <Section key={item.id} item={item}/>)
       
        return (
            <div className="container">
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

export default eportfolioEdit;