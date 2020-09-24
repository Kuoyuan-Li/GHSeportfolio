import React from 'react';
import Module from './module'
import pseudoModules from "./pseudoModules"
class Section extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            sectionID : props.content.sectionID,
            moduleNumber : props.content.modules.length,
            sectionTitle : props.content.sectionTitle,
            modules : props.content.modules,
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
    
    //initialize a blank module and add to the present modules list
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

    //delete this section using the deleteHandler passed from parent component
    deleteThisSectionHandler(){
        this.props.deleteHandler(this.state.sectionID);
    }
   
    //delete a specific module based on its id
    deleteModule (id){
        this.setState(prevState => ({
            modules: prevState.modules.filter(el => el.id !== id )
        }));
    }

    render() {
        const moduleItems = this.state.modules.map
            (content => <Module key={content.id} content={content} parentSectionID = {this.state.sectionID} deleteHandler = {this.deleteModule.bind(this)}/>)
       
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <div className = "section-list">
                        <button type="button" onClick = {this.deleteThisSectionHandler.bind(this, this.state.sectionID)}>Delete this section</button>
                        <input type = "text"
                            name = 'Sectiontitle'
                            value={this.state.sectionTitle}
                            onChange = {this.sectionTitleChangeHandler}/>
                            {moduleItems}
                            <button type="button" onClick = {this.addModuleHandler}>Add a module</button>
                        </div>
                    </div>
                </div>
            </div>
        )  
    }  
}

export default Section;