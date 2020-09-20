import React from 'react';
import Module from './module'
import pseudoModules from './pesudoModulos';
import pesudoModules from "./pesudoModulos"
class Section extends React.Component {

    constructor() {
        super()
        this.state = {
            moduleNumber : pseudoModules.length,
            sectionTitle : '',
            modules : pesudoModules,
            message : ''
        }
        this.sectionTitleChangeHandler = this.sectionTitleChangeHandler.bind(this)
    
        //this.componentDidMount = this.componentDidMount.bind(this)
    }

    /*componentDidMount(){
        fetch('/eportfolioEdit').
        then(res => res.json()).
        then(data => {
            this.setState({sections:data});
          })
        
    }*/
    
    addModuleHandler = () => {
        const blankModule = {       
                id: this.state.moduleNumber+1,
                title:'',
                year :null,
                text : '',
                image:null,
                file: null
            
        }
        this.setState(prevState => {
            return {
                moduleNumber: prevState.moduleNumber +1,
            }
        })
        this.setState({           
            modules: [...this.state.modules , blankModule]
         });
    }

    sectionTitleChangeHandler =(e) =>{
        this.setState({ sectionTitle : e.target.value })
    }
    render() {
        const moduleItems = this.state.modules.map(content => <Module key={content.id} content={content}/>)
       
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <div className = "section-list">
                        <input type = "text"
                            name = 'Sectiontitle'
                            value={this.state.sectionTitle}
                            onChange = {this.sectionTitleChangeHandler}/>
                            {moduleItems}
                            <button type="button" onClick = {this.addModuleHandler}>Add another module</button>
                        </div>
                    </div>
                </div>
            </div>
        )  
    }  
}

export default Section;