import React from 'react';
import Module from './module'
import { Route , withRouter} from 'react-router-dom';
import {Spinner} from 'react-bootstrap'
import './style.css'

class Section extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            sectionID : props.content.sectionID,
            sectionTitle : props.content.sectionTitle,
            modules : props.content.modules,
            message : '',
            loading : true
        }
        this.sectionTitleChangeHandler = this.sectionTitleChangeHandler.bind(this)
        this.sectionTitleSaveHandler = this. sectionTitleSaveHandler.bind(this)      
    }


    async componentDidMount () {
        await fetch ('http://localhost:5000/getModules',{
            mode: 'cors',
            method : 'POST',
            headers :{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                section_id : this.state.sectionID
            })
        }).then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then((response) => {				
            //response: a list of sectionIDs
            this.setState({           
                modules : response.list
            })
        })
        this.setState({
            loading : false
        })  
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
          
            <div id="edit">
                <div class = "section">
                    { this.state.loading ? <Spinner animation="border"/> :
                    <div>
				    
                        <div class="section-title">
                            <input class="input" type = "text"
                                name = 'Sectiontitle'
                                value={this.state.sectionTitle}
                                onChange = {this.sectionTitleChangeHandler}
                                placeholder="Enter section title"/>

                            <button class="button" onClick = {this.sectionTitleSaveHandler}>
                            Save title<i class="fa fa-check" aria-hidden="true"></i>
                            </button>
                            <button class="button" onClick = {this.deleteThisSectionHandler.bind(this, this.state.sectionID)}>
                               Delete section <i class="fa fa-trash-o" aria-hidden="true"></i>
                            </button>
                        </div>                      
                            <div>
                            {moduleItems}   
                            <button class="button add-button" onClick = {this.addModuleHandler}>
                                <i class="fa fa-plus" aria-hidden="true"></i>
                                Add a module
                            </button>                        
                            </div>
                    </div> 
                        }
                </div>
            </div>

        )  
    }  
}

export default Section;