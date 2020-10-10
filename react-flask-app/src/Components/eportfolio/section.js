import React from 'react';
import Module from './module'
import { Route , withRouter} from 'react-router-dom';
import './style.scss'

class Section extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            sectionID : props.content.sectionID,
            sectionTitle : props.content.sectionTitle,
            modules : props.content.modules,
            message : ''
        }
        this.sectionTitleChangeHandler = this.sectionTitleChangeHandler.bind(this)
        this.sectionTitleSaveHandler = this. sectionTitleSaveHandler.bind(this)
    }

    //initialize a blank module and add to the present modules list
    addModuleHandler = () => {   
        const section_id = this.state.sectionID    
		fetch ('http://localhost:5000/addModule',{
            mode: 'cors',
            method : 'POST',
            headers :{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                section_id : section_id
            })
        }).then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => { // response: success, module
            
            this.setState({ message : "add module success"})
            this.setState({           
                modules: [...this.state.modules , response.module]
            })
            console.log(this.state.message)      
        })

    }
    
    sectionTitleSaveHandler = () =>{
            fetch ('http://localhost:5000/saveSection',{
            mode: 'cors',
            method : 'POST',            
            headers :{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                section_id: this.state.sectionID,
                title: this.state.sectionTitle
            })
        }).then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            this.setState({ message : response.message})
            console.log(this.state.message)
            window.location.reload(false);
        })       
    }

    sectionTitleChangeHandler = (e) =>{
        this.setState({ sectionTitle : e.target.value })
    }

    //delete this section using the deleteHandler passed from parent component
    deleteThisSectionHandler(){
        this.props.deleteHandler(this.state.sectionID);
    }
   
    //delete a specific module based on its id
    deleteModule (id){
        console.log(id) // return undefined 
        
        this.setState(prevState => ({
            modules: prevState.modules.filter(module => module.module_id !== id )
        }));
        //inform backend delete module: sectionID XXX, moduleID: XXx
        
        fetch ('http://localhost:5000/deleteModule',{
                mode: 'cors',
                method : 'POST',
                headers :{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    module_id : id
                })
            }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                if(response.success){
                    this.setState({ message : "delete module success"})
                }
                console.log(this.state.message)
            })
            
        
    }

    render() {
        const moduleItems = this.state.modules.map
            (content => <Module key={content.module_id} content={content} parentSectionID = {this.state.sectionID} deleteHandler = {this.deleteModule.bind(this)}/>)
       
        return (
                        <div className = "section">
						<button type="button" onClick = {this.sectionTitleSaveHandler}>Save section title</button>
                            <div class="section-title">
                            <input class="input" type = "text"
                                name = 'Sectiontitle'
                                value={this.state.sectionTitle}
                                onChange = {this.sectionTitleChangeHandler}
                                placeholder="Enter section title"/>
                        
                            <button class="button delete-button" onClick = {this.deleteThisSectionHandler.bind(this, this.state.sectionID)}>
                                <i class="fa fa-trash-o" aria-hidden="true"></i>
                            </button>
                            </div>
                            {moduleItems}
                            
                            <button class="button add-button" onClick = {this.addModuleHandler}>
                            <i class="fa fa-plus" aria-hidden="true"></i>
                            Add a module</button>
                        </div>
        )  
    }  
}

export default Section;